import PreformattedConverter from './PreformattedConverter'
import TestUtils from '../common/TestUtils';

describe('PreformattedConverter', () => {
  
  let converter = new PreformattedConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'pre'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("pre", ""))).toEqual("{{}}");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("pre", "Test\ncontent"))).toEqual("{{Test\ncontent}}");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("pre", "Test *content with markup*"))).toEqual("{{Test *content with markup*}}");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("pre", " Test <b>content with markup</b> "))).toEqual("{{ Test <b>content with markup</b> }}");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement(" *this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement(" *this is not valid*") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement("*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
      expect(() => { converter.getHTMLElement("") }).toThrowError("Invalid JIRA markup, expected text between {{double brackets}}");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{{Test content}}"), 
        TestUtils.createHtmlElement("pre", "Test content")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{{Test *content with markup*}}"), 
        TestUtils.createHtmlElement("pre", "Test *content with markup*")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{{ Test <b>content with markup</b> }}"), 
        TestUtils.createHtmlElement("pre", " Test <b>content with markup</b> ")
      );
    });
  });
  
});

