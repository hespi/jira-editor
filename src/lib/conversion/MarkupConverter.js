export default class MarkupConverter {

    get tagName() {
        return "";
    }

    get validationExpression() {
        return null;
    }

    getJIRAMarkup = (HTMLElement) => {
        throw new Error("Not implemented");
    }

    getHTMLElement = (JIRAMarkup) => {
        throw new Error("Not implemented");
    }

    validateHTMLElement = (HTMLElement, errorMessage = "") => {
        if (!!HTMLElement && this.tagName.toLowerCase() !== HTMLElement.tagName.toLowerCase()) {
            throw `Invalid HTML element '${HTMLElement.tagName.toLowerCase()}', expected '${this.tagName.toLowerCase()}'`;
        }
    }

    validateJIRAMarkup = (JIRAMarkup, errorMessage = "") => {
        if (!!this.validationExpression) {
            if (!this.validationExpression.test(JIRAMarkup)) {
                throw errorMessage;
            }
        }
    }
}