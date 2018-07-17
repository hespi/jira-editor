import React, { Component } from "react";
import PropTypes from 'prop-types';
import Select from 'react-select';
import { EditorModes } from './enum/EditorModes';
import { TEXT_STYLES } from './data/TextStyles';
import 'react-select/dist/react-select.css';
import './style.css';   

class JiraEditor extends Component {
  
  static propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    mode: PropTypes.string,
    boldActive: PropTypes.bool,
    italicActive: PropTypes.bool,
  }

  static defaultProps = {
    width: "100%",
    height: "100%",
    mode: EditorModes.Visual
  }

  /** GETTERS/SETTERS */

  get markup() {
    return this._generateJIRAMarkup(this.state.htmlText);
  }

  constructor(props) {
    super(props);

    this.state = {
      htmlText: ""
    };
  }


/** METHODS */

/** FUNCTIONS */

  _generateJIRAMarkup = (htmlText) => {

  }

/** EVENTS */

  onTextStyle_Change = (event) => {

  }

  onPlainText_Change = (event) => {

  }

  render() {
    return (
      <div className="jira-editor" style={{width: this.props.width, height: this.props.height}}>
        <div className="toolbox">
          <Select 
            name="jira-editor-text-style"
            className="text-style-selector"
            onChange={this.onTextStyle_Change}
            options={TEXT_STYLES}
          />
          <div className="toolbox-group">
            <a href="javascript:;" className="link-button toolbox-operation toolbox-operation-bold" title="Bold"><i className="icon icon-bold"></i></a>
            <a href="javascript:;" className="link-button toolbox-operation toolbox-operation-italic" title="Italic"><i className="icon icon-italic"></i></a>
            <a href="javascript:;" className="link-button toolbox-operation toolbox-operation-underline" title="Underline"><i className="icon icon-underline"></i></a>
          </div>
          <div className="toolbox-group">
            <a href="javascript:;" className="link-button toolbox-operation toolbox-operation-listul" title="Bullet list"><i className="icon icon-listul"></i></a>
            <a href="javascript:;" className="link-button toolbox-operation toolbox-operation-listol" title="Numbered list"><i className="icon icon-listol"></i></a>
          </div>
        </div>
        <div className="content">
          <div className="content-visual">
          </div>
          <div className="content-plain">
            <textarea value={this.props.children} onChange={this.onPlainText_Change}></textarea>
          </div>
        </div>
        <div className="view-selector">
          <div className="tab">View</div>
          <div className="tab">Text</div>
        </div>
      </div>
    );
  }
}

export default JiraEditor;
