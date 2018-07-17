import MarkupConverter from './MarkupConverter';

export default class ParagraphQuoteConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "blockquote";
    }

    get validationExpression() {
        return /^\{quote\}(.*)\{quote\}$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text between '{quote}' marks");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return `{quote}${HTMLElement.innerHTML}{quote}`;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        element.innerHTML = this.validationExpression.exec(JIRAMarkup)[1];
        return element;
    }
}