import MarkupConverter from './MarkupConverter';

export default class UnorderedConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "ul";
    }

    get validationExpression() {
        return /^\* (.*)$/gm;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return (!!HTMLElement) ? this._doGetJIRAMarkup(HTMLElement) : null;
    }

    getHTMLElement = (JIRAMarkup) => {
        this.validateJIRAMarkup(JIRAMarkup, "Invalid JIRA markup, expected text lines starting with '* '");
        return (!!JIRAMarkup) ? this._doGetHTMLElement(JIRAMarkup) : null;
    }

    /** FUNCTIONS */

    _doGetJIRAMarkup = (HTMLElement) => {
        var markup = "";
        let items = HTMLElement.getElementsByTagName("li");
        for (let ix = 0; ix < items.length; ix++) {
            markup += `* ${items[ix].innerHTML}\n`;
        }
        return markup;
    }

    _doGetHTMLElement = (JIRAMarkup) => {
        var element = document.createElement(this.tagName);
        JIRAMarkup.match(this.validationExpression).forEach((item, ix) => {
            element.innerHTML += `<li>${item.substring(2)}</li>`;
        });
        return element;
    }
}