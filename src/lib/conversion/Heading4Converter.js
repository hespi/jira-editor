import MarkupConverter from './MarkupConverter';

export default class Heading4Converter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "h4";
    }

    get validationExpression() {
        return /^h4\. (.*)$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text starting with 'h4. '");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return `h4. ${HTMLElement.innerHTML}`;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        element.innerHTML = this.validationExpression.exec(JIRAMarkup)[1];
        return element;
    }
}