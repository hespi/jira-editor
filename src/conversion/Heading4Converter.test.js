import Heading4Converter from './Heading4Converter'
import TestUtils from '../common/TestUtils';

describe('Heading4Converter', () => {
  
  let converter = new Heading4Converter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'h4'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h4", ""))).toEqual("h4. ");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h4", "Test content"))).toEqual("h4. Test content");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h4", "Test *content with markup*"))).toEqual("h4. Test *content with markup*");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h4", " Test <b>content with markup</b> "))).toEqual("h4.  Test <b>content with markup</b> ");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("h4this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("h4 *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("h4.*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
      expect(() => { converter.getHTMLElement("h1. not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h4. '");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h4. Test content"), 
        TestUtils.createHtmlElement("h4", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h4. Test *content with markup*"), 
        TestUtils.createHtmlElement("h4", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h4.  Test <b>content with markup</b> "), 
        TestUtils.createHtmlElement("h4", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

