import MarkupConverter from './MarkupConverter';

export default class NewLineConverter extends MarkupConverter {

    /** PROPERTIES */

    get tagName() {
        return "br";
    }

    get validationExpression() {
        return /\n/;
    }

    /** METHODS */

    getJIRAMarkup = (HTMLElement) => {
        this.validateHTMLElement(HTMLElement);
        return "\n";
    }

    getHTMLElement = (JIRAMarkup) => {
        return document.createElement(this.tagName);
    }
}