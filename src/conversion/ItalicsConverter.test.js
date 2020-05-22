import ItalicsConverter from './ItalicsConverter'
import TestUtils from '../common/TestUtils';

describe('ItalicsConverter', () => {
  
  let converter = new ItalicsConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'em'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("em", ""))).toEqual("__");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("em", "Test content"))).toEqual("_Test content_");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("em", "Test *content with markup*"))).toEqual("_Test *content with markup*_");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("em", " Test <b>content with markup</b> "))).toEqual(" _Test <b>content with markup</b>_ ");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("this is not valid_") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement("_this is not valid") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement(" _this is not valid_ ") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement(" _this is not valid_") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement("_this is not valid_ ") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
      expect(() => { converter.getHTMLElement("") }).toThrowError("Invalid JIRA markup, expected text between _underlines_");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("_Test content_"), 
        TestUtils.createHtmlElement("em", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("_Test *content with markup*_"), 
        TestUtils.createHtmlElement("em", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("_ Test <b>content with markup</b> _"), 
        TestUtils.createHtmlElement("em", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

