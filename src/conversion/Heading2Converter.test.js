import Heading2Converter from './Heading2Converter'
import TestUtils from '../common/TestUtils';

describe('Heading2Converter', () => {
  
  let converter = new Heading2Converter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'h2'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h2", ""))).toEqual("h2. ");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h2", "Test content"))).toEqual("h2. Test content");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h2", "Test *content with markup*"))).toEqual("h2. Test *content with markup*");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("h2", " Test <b>content with markup</b> "))).toEqual("h2.  Test <b>content with markup</b> ");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("h2this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("h2 *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("h2.*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
      expect(() => { converter.getHTMLElement("h1. not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'h2. '");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h2. Test content"), 
        TestUtils.createHtmlElement("h2", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h2. Test *content with markup*"), 
        TestUtils.createHtmlElement("h2", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("h2.  Test <b>content with markup</b> "), 
        TestUtils.createHtmlElement("h2", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

