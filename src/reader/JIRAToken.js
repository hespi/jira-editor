export default class JIRAToken {
    
    type = "";

    text = "";

    initialPosition = -1;

    get endPosition() {
        return this.initialPosition + this.text.length;
    }

    constructor(type, text, ini) {
        this.type = type;
        this.text = text;
        this.initialPosition = ini;
    }
}