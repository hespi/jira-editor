import MarkupConverter from './MarkupConverter';

export default class StrikeThroughConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "del";
    }

    get validationExpression() {
        return /^-(.*)-$/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text between -minus- signs");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        return `-${HTMLElement.innerHTML}-`;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        element.innerHTML = this.validationExpression.exec(JIRAMarkup)[1];
        return element;
    }
}