import BoldConverter from './BoldConverter'
import TestUtils from '../common/TestUtils';

describe('BoldConverter', () => {
  
  let converter = new BoldConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'b'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("b", ""))).toEqual("**");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("b", "Test content"))).toEqual("*Test content*");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("b", "Test *content with markup*"))).toEqual("*Test *content with markup**");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("b", " Test <b>content with markup</b> "))).toEqual("* Test <b>content with markup</b> *");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement(" *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement(" *this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
      expect(() => { converter.getHTMLElement("") }).toThrowError("Invalid JIRA markup, expected text between *asterisks*");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("*Test content*"), 
        TestUtils.createHtmlElement("b", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("*Test *content with markup**"), 
        TestUtils.createHtmlElement("b", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("* Test <b>content with markup</b> *"), 
        TestUtils.createHtmlElement("b", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

