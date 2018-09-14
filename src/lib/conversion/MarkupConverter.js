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

    getStartWhiteSpaces = (text) => {
        let aux = /^\s+/.exec(text);
        return !!aux ? aux[0] : "";
    }

    getEndWhiteSpaces = (text) => {
        let aux = /\s+$/.exec(text);
        return !!aux ? aux[0] : "";
    }

    trimAndSorroundWith = (text, sorroundString) => {
        let startWhiteSpaces = this.getStartWhiteSpaces(text);
        let endWhiteSpaces = this.getEndWhiteSpaces(text);
        return startWhiteSpaces + sorroundString + text.trim() + sorroundString + endWhiteSpaces;
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