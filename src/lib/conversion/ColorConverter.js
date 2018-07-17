import MarkupConverter from './MarkupConverter';

export default class ColorConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "span";
    }

    get validationExpression() {
        return /^\{color:([^\}]+)\}(.*)\{color\}$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return `{color:${this._getElementColor(HTMLElement)}}${HTMLElement.innerHTML}{color}`;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        var matches = this.validationExpression.exec(JIRAMarkup);
        element.style.color = matches[1];
        element.innerHTML = matches[2];
        return element;
    }

    _getElementColor = (HTMLElement) => {
        return (!!HTMLElement.style && !!HTMLElement.style.color) ? "#" + HTMLElement.style.color.match(/\d+/g).map((rgb) => {
            return parseInt(rgb, 16);
        }).join('') : "";
    }
}