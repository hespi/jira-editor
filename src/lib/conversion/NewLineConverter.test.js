import NewLineConverter from './NewLineConverter'
import TestUtils from '../common/TestUtils';

describe('NewLineConverter', () => {
  
  let converter = new NewLineConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", ""))
      }).toThrowError("Invalid HTML element 'a', expected 'br'");
    });
  
    test('when converting the proper HTML element, then returns JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("br"))).toEqual("\n");
    });
  });

  describe('getHTMLElement TESTS', () => {
    
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("\n"), 
        TestUtils.createHtmlElement("br")
      );
    });
  });
  
});

