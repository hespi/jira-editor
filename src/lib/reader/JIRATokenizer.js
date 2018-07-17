import JIRAToken from './JIRAToken';

export default class JiraTokenizer {

    /** PROPERTIES */
    source = "";
    _matchBuffer = [];
    _stateBuffers = [];
    _currentIndex = 0;
    _currentStates = [];
    _states = [];
    _initialState = null;
    _initialBufferName = null;
        
    get currentBuffer() {
        return this._stateBuffers[this._stateBuffers.length - 1];
    }

    get previousBuffer() {
        return this._stateBuffers[this._stateBuffers.length - 2];
    }

    get lastMatch() {
        return this._matchBuffer[this._matchBuffer.length - 1];
    }

    constructor(stateDefinitions) {
        this._validateStateDefinitions(stateDefinitions);
        this._states = stateDefinitions;
    }

    /** METHODS */

    load = (JIRAMarkup) => {
        this._validateJIRAMarkup(JIRAMarkup);
        this._initialize(JIRAMarkup);
        this._parseSource();
    }

    read = () => {
        //debugger;
        return this._matchBuffer.sort((a, b) => {
            return (b.initialPosition - a.initialPosition);
        }).pop();
    }

    /** FUNCTIONS */

    _validateStateDefinitions = (stateDefinitions) => {
        if (!!!stateDefinitions)
            throw "State definition is required";
        if (!!!this._getInitialState(stateDefinitions))
            throw "No initial state defined. Set 'initial' property to 'true' on the initial state";
    }

    _getInitialState = (stateDefinitions) => {
        let initialStateName = this._getInitialStateName(stateDefinitions);
        return !!initialStateName ? stateDefinitions[initialStateName] : null;
    }

    _getInitialStateName = (stateDefinitions) => {
        for(var stateName in stateDefinitions) {
            if (!!stateDefinitions[stateName].initial) {
                return stateName;
            }
        }
        return null;
    }

    _validateJIRAMarkup = (JIRAMarkup) => {
        if (!!!JIRAMarkup) {
            throw "Trying to load empty JIRA markup";
        }
    }

    _initialize = (JIRAMarkup) => {
        let initialStateName = this._getInitialStateName(this._states);
        this._initialState = this._getStateWithName(initialStateName);
        this._initialBufferName = this._initialState.tokenName;

        this.source = JIRAMarkup;
        this._matchBuffer = [];
        this._currentIndex = 0;
        this._currentStates = [];
        this._stateBuffers = [];

        this._addStateBuffers([initialStateName]);
        this._pushStates([initialStateName]);
    }

    _parseSource = () => {
        do {
            this._readChar(this.source[this._currentIndex++])
        } while (this._currentIndex < this.source.length);

        this._matchLastEndOfLineToken();
    }

    _matchLastEndOfLineToken = () => {
        if (this._matchBuffer.length > 0) {
            this._doMatchToken(this._buildBuffer(this._initialState.tokenName, this._initialState.name, this.lastMatch.endPosition), this.source.length, true);
        } else {
            this._doMatchToken(this._buildBuffer(this._initialState.tokenName, this._initialState.name, 0), this.source.length, true);
        }
    }

    _readChar = (c) => {
        this._removeState(this._initialState.name);
        this._currentStates.splice(0, 0, this._initialState.name);
        let states = this._currentStates.slice(0);
        //debugger;
        states.forEach((stateName) => {
            if (this._states.hasOwnProperty(stateName)) {
                this._applyCharToState(this._getStateWithName(stateName), c);
            } else {
                throw `Undefined state '${stateName}'`;
            }
        });
    }

    _getStateWithName = (name) => {
        var state = this._states[name];
        state.name = name;
        return state
    }

    _getCurrentStateWithName = (name) => {
        let ix = this._currentStates.indexOf(name);
        return (ix >= 0) ? this._currentStates[ix] : undefined;
    }

    _getBufferWithName = (name) => {
        let bufferWithName = null;
        for (let ix = 0; ix < this._stateBuffers.length; ix++) {
            if (this._stateBuffers[ix].name === name) {
                bufferWithName = this._stateBuffers[ix];
                break;
            }
        };
        return bufferWithName;
    }

    _applyCharToState = (state, c) => {
        let action = this._getStateActionForChar(state, c);
        //debugger;
        if (!!action) {
            this._applyActionToState(state, action, c);
        }
    }

    _applyActionToState = (state, action) => {
        if (!!action.tokenEnd) {
            this._match((typeof(action.tokenEnd) === "string") ? this._getBufferWithName(action.tokenEnd) :  this.currentBuffer, this._currentIndex, action.append);
        }

        if (!!action.break) {
            this._cancelToken(action.break, action.return);
        }

        if (!!action.targetStates && action.targetStates.length > 0) {
            this._removeState(state.name);
            this._pushStates(action.targetStates);
            this._addStateBuffers(action.targetStates);
        }
    }

    _removeState = (stateName) => {
        let ix = this._currentStates.indexOf(stateName);
        if (ix !== -1) {
            this._currentStates.splice(ix, 1);
        }
    }

    _getStateActionForChar = (state, c) => {
        let ix = "" + c.charCodeAt(0);
        if (state.hasOwnProperty(ix)) {
            return state[ix];
        } else if (state.hasOwnProperty("default")) {
            return state["default"];
        }
    }

    _pushStates = (stateList) => {
        stateList.forEach((stateName) => {
            if (!!!this._getCurrentStateWithName(stateName)) {
                this._currentStates.push(stateName);
            }
        });
    }

    _addStateBuffers = (stateList) => {
        stateList.forEach((stateName) => {
            //debugger;
            let state = this._getStateWithName(stateName);
            this._addStateBuffer(state, !!state.append ? state.append : 0);
        });
    }

    _addStateBuffer = (state, append) => {
        if (!!state && !!state.tokenName && !!!this._getBufferWithName(state.tokenName)) {
            //debugger;
            let start = this._currentIndex - 1;
            if (!!append) {
                start += isNaN(parseInt(append, 10)) ? 1 : parseInt(append, 10);
            }

            let buffer = this._buildBuffer(state.tokenName, state.name, Math.max(0, start));
            this._stateBuffers.push(buffer);
        }
    }

    _buildBuffer = (name, stateName, start) => {
        return {
            "name": name,
            "state": stateName,
            "text": "",
            "ini": start
        };
    }

    _cancelToken = (tokenNameList, charCount) => {
        //debugger;
        let list = Array.isArray(tokenNameList) ? tokenNameList : [tokenNameList];
        list.forEach(tokenName => {
            let buffer = this._getBufferWithName((tokenName === true ? this.currentBuffer.name : tokenName));
            console.log("CANCELLING Token " + buffer.name);

            this._removeBuffer(buffer);
            this._removeState(buffer.state);

            if (this._stateBuffers.length === 0) {
                this._addStateBuffer(this._initialState, true);
            }

            if (!!charCount) {
                this.currentBuffer.ini -= charCount;
            }
        });
    }

    _match = (buffer, endIndex, append) => {
        //debugger;
        if (!!buffer && (!this._isInitialBuffer(buffer) || this._stateBuffers.length == 1)) { 
            this._doMatchToken(buffer, endIndex, append);
        }
    }

    _doMatchToken = (buffer, endIndex, append) => {
        let end = endIndex - 1;
        if (!!append) {
            end += isNaN(parseInt(append, 10)) ? 1 : parseInt(append, 10);
        }

        if (buffer.ini < end) {
            buffer.text = this.source.substring(buffer.ini, end);
            if (buffer.text !== '\n') {
                //debugger;

                console.log("MATCHED (" + buffer.name + "): " + buffer.text)
                this._matchBuffer.push(this._buildToken(buffer));
                this._removeBuffer(buffer);
            }
        }

        if (this._stateBuffers.length === 0) {
            this._addStateBuffer(this._initialState, true);
        }
    }

    _removeBuffer = (buffer) => {
        var bufferIndex = this._stateBuffers.indexOf(buffer);
        if (bufferIndex !== -1) {
            //debugger;
            this._stateBuffers.splice(bufferIndex, 1);
        }
    }

    _buildToken = (buffer) => {
        return new JIRAToken(buffer.name, buffer.text, buffer.ini);
    }

    _isInitialBuffer = (buffer) => {
        return (buffer.name == this._initialBufferName);
    }
}