import OrderedListConverter from './OrderedListConverter'
import TestUtils from '../common/TestUtils';

describe('OrderedListConverter', () => {
  
  let converter = new OrderedListConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting the invalid HTML element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(TestUtils.createHtmlElement("a", "test"))
      }).toThrowError("Invalid HTML element 'a', expected 'ol'");
    });
  
    test('when converting the proper HTML element with empty content, then returns empty JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", ""))).toEqual("");
    });
  
    test('when converting the proper HTML element with plain text, then returns equivalent JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", "<li>Item 1</li><li>Item 2</li>"))).toEqual("# Item 1\n# Item 2\n");
    });
  
    test('when converting the proper HTML element with JIRA markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", "<li>Item 1</li><li>Item *content with markup*</li>"))).toEqual("# Item 1\n# Item *content with markup*\n");
    });
  
    test('when converting the proper HTML element with HTML markup on it, then returns JIRA markup respecting internal markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", "<li> Item 1</li><li>Item <b>content with markup</b></li>"))).toEqual("#  Item 1\n# Item <b>content with markup</b>\n");
    });
  });

  describe('getHTMLElement TESTS', () => {
    test('when converting the invalid JIRA markup, then throws an error', () => {
      expect(() => { converter.getHTMLElement("#this is not valid") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement("#this is not valid\n-Not valid item") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement(" #this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement(" # this is not valid*") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement("#this is not valid* ") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement("this is not valid") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
      expect(() => { converter.getHTMLElement("") }).toThrowError("Invalid JIRA markup, expected text lines starting with '# '");
    });
  
    test('when converting the proper JIRA markup with plain text, then returns equivalent HTML element', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("# Test content"), 
        TestUtils.createHtmlElement("ol", "<li>Test content</li>")
      );

      TestUtils.elementsAreEqual(
        converter.getHTMLElement("# Item 1\n# Item 2"), 
        TestUtils.createHtmlElement("ol", "<li>Item 1</li><li>Item 2</li>")
      );
    });
  
    test('when converting the proper JIRA markup with internal markup, then returns HTML element with internal markup on it', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("# Test *content with markup*"), 
        TestUtils.createHtmlElement("ol", "<li>Test *content with markup*</li>")
      );
    });
  
    test('when converting the proper JIRA markup with HTML markup on it, then returns HTML element with internal HTML', () => {
      TestUtils.elementsAreEqual(
        converter.getHTMLElement("#  Test <b>content with markup</b> "), 
        TestUtils.createHtmlElement("ol", "<li> Test <b>content with markup</b> </li>")
      );
    });
  });
  
});

