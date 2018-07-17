import BlockQuoteConverter from './BlockQuoteConverter'
import TestUtils from '../common/TestUtils';

describe('BlockQuoteConverter', () => {
  
  let converter = new BlockQuoteConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("b", "test"))
      }).toThrowError("Invalid HTML element 'b', expected 'q'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("q", ""))).toEqual("bq. ");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("q", "Test content"))).toEqual("bq. Test content");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("q", "Test *content with markup*"))).toEqual("bq. Test *content with markup*");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("q", " Test <b>content with markup</b> "))).toEqual("bq.  Test <b>content with markup</b> ");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("bqthis is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("bq *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("bq.*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
      expect(() => { converter.getHTMLElement("h2. not valid") }).toThrowError("Invalid JIRA markup, expected text starting with 'bq. '");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("bq. Test content"), 
        TestUtils.createHtmlElement("q", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("bq. Test *content with markup*"), 
        TestUtils.createHtmlElement("q", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("bq.  Test <b>content with markup</b> "), 
        TestUtils.createHtmlElement("q", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

