export default class TestUtils {
    static createHtmlElement = (tagName, innerHTML, color) => {
        var element = document.createElement(tagName);
        element.innerHTML = innerHTML;
        element.style.color = color;
        return element;
    }

    static elementsAreEqual = (htmlElementActual, htmlElementExpected) => {
        expect(htmlElementActual.innerText).toEqual(htmlElementExpected.innerText);
        expect(htmlElementActual.innerHTML).toEqual(htmlElementExpected.innerHTML);
        expect(htmlElementActual.tagName).toEqual(htmlElementExpected.tagName);
        //expect(htmlElementActual.style).toEqual(htmlElementExpected.style);
    }
}