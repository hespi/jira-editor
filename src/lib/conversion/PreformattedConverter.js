import MarkupConverter from './MarkupConverter';

export default class PreformattedConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "pre";
    }

    get validationExpression() {
        return /^\{\{(.*)\}\}$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text between {{double brackets}}");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return `{{${HTMLElement.innerHTML}}}`;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        element.innerHTML = this.validationExpression.exec(JIRAMarkup)[1];
        return element;
    }
}