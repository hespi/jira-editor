import ColorConverter from './ColorConverter'
import TestUtils from '../common/TestUtils';

describe('ColorConverter', () => {
  
  let converter = new ColorConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'span'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("span", "", "#bfbfbf"))).toEqual("{color:#bfbfbf}{color}");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("span", "Test content", "#bfbfbf"))).toEqual("{color:#bfbfbf}Test content{color}");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("span", "Test *content with markup*", "#bfbfbf"))).toEqual("{color:#bfbfbf}Test *content with markup*{color}");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("span", " Test <b>content with markup</b> ", "#bfbfbf"))).toEqual("{color:#bfbfbf} Test <b>content with markup</b> {color}");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("*this is not valid*") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement("*this is not valid") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement("{color} *this is not valid* {color}") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement(" *this is not valid*") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement("{color:#FFF}*this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement("{color:#FFF}this is not valid{color:#FFF}") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
      expect(() => { converter.getHTMLElement("") }).toThrowError("Invalid JIRA markup, expected text with format: '{color:#FFF}text{color}'");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{color:#bfbfbf}Test content{color}"), 
        TestUtils.createHtmlElement("span", "Test content", "#bfbfbf")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{color:#bfbfbf}Test *content with markup*{color}"), 
        TestUtils.createHtmlElement("span", "Test *content with markup*", "#bfbfbf")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("{color:#bfbfbf} Test <b>content with markup</b> {color}"), 
        TestUtils.createHtmlElement("span", " Test <b>content with markup</b> ", "#bfbfbf")
      );
    });
  });
  
});

