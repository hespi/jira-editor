export default class TestUtils {
    static createHtmlElement = (tagName, innerHTML, color) => {
        var element = document.createElement(tagName);
        if (!!innerHTML) {
            element.innerHTML = innerHTML;
        }
        if (!!color) {
            element.style.color = color;
        }
        return element;
    }

    static elementsAreEqual = (htmlElementActual, htmlElementExpected) => {
        expect(htmlElementActual.innerText).toEqual(htmlElementExpected.innerText);
        expect(htmlElementActual.innerHTML).toEqual(htmlElementExpected.innerHTML);
        expect(htmlElementActual.tagName).toEqual(htmlElementExpected.tagName);
    }
}