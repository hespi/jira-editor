import ParagraphQuoteConverter from './ParagraphQuoteConverter'
import TestUtils from '../common/TestUtils';

describe('ParagraphQuoteConverter', () => {
  
  let converter = new ParagraphQuoteConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'blockquote'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("blockquote", ""))).toEqual("{quote}{quote}");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("blockquote", "Test content"))).toEqual("{quote}Test content{quote}");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("blockquote", "Test *content with markup*"))).toEqual("{quote}Test *content with markup*{quote}");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("blockquote", " Test <b>content with markup</b> "))).toEqual("{quote} Test <b>content with markup</b> {quote}");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("h2this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("h1 *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("h1.*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
      expect(() => { converter.getHTMLElement("h2. not valid") }).toThrowError("Invalid JIRA markup, expected text between '{quote}' marks");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{quote}Test content{quote}"), 
        TestUtils.createHtmlElement("blockquote", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{quote}Test *content with markup*{quote}"), 
        TestUtils.createHtmlElement("blockquote", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{quote} Test <b>content with markup</b> {quote}"), 
        TestUtils.createHtmlElement("blockquote", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

