import Heading5Converter from './Heading5Converter'
import TestUtils from '../common/TestUtils';

describe('Heading5Converter', () => {
  
  let converter = new Heading5Converter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'h5'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h5", ""))).toEqual("h5. ");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h5", "Test content"))).toEqual("h5. Test content");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h5", "Test *content with markup*"))).toEqual("h5. Test *content with markup*");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h5", " Test <b>content with markup</b> "))).toEqual("h5.  Test <b>content with markup</b> ");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("h5this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("h5 *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("h5.*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
      expect(() => { converter.getHTMLElement("h1. not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h5. '");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h5. Test content"), 
        TestUtils.createHtmlElement("h5", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h5. Test *content with markup*"), 
        TestUtils.createHtmlElement("h5", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h5.  Test <b>content with markup</b> "), 
        TestUtils.createHtmlElement("h5", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

