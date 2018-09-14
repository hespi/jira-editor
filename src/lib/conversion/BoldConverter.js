import MarkupConverter from './MarkupConverter';

export default class BoldConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "strong";
    }

    get validationExpression() {
        return /^\*(.*)\*$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text between *asterisks*");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return this.trimAndSorroundWith(HTMLElement.innerHTML, "*");
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        element.innerHTML = this.validationExpression.exec(JIRAMarkup)[1];
        return element;
    }
}