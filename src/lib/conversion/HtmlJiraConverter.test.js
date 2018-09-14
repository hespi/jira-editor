import HtmlJiraConverter from './HtmlJiraConverter';
import TestUtils from '../common/TestUtils';

describe('HtmlJiraConverter', () => {
  
  let converter = new HtmlJiraConverter();

  describe('getJIRAMarkup TESTS', () => {
    test('when converting an empty element, then throws an error', () => {
      expect(() => {
        converter.getJIRAMarkup(null)
      }).toThrowError("Root element is required");

      expect(() => {
        converter.getJIRAMarkup(undefined)
      }).toThrowError("Root element is required");

    });

    test('when converting an ordered list element, then generates JIRA list', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", `<li>Item uno</li>
        <li> Item *dos*</li>
        <li> #Elemento#</li>`))).toEqual("# Item uno\n" +
        "#  Item *dos*\n" +
        "#  #Elemento#\n");

        expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ol", `<li>Item uno</li>
        <li> Item <strong>dos</strong> _tres_</li>
        <li> #Elemento# <em>italic</em></li>`))).toEqual("# Item uno\n" +
        "#  Item *dos* _tres_\n" +
        "#  #Elemento# _italic_\n");
    });

    test('when converting an unordered list element, then generates JIRA unordered list', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ul", `<li>Item uno</li>
        <li> Item *dos*</li>
        <li> #Elemento#</li>`))).toEqual("* Item uno\n" +
        "*  Item *dos*\n" +
        "*  #Elemento#\n");

        expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("ul", `<li>Item uno</li>
        <li> Item <strong>dos</strong> _tres_</li>
        <li> #Elemento# <em>italic</em></li>`))).toEqual("* Item uno\n" +
        "*  Item *dos* _tres_\n" +
        "*  #Elemento# _italic_\n");
    });

    
    test('when converting sample HTML, then generates correct JIRA markup', () => {
      expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("div", `<h1>Header 1</h1>
<h2>Subheader for <span style="color: #0000FF"><strong>testing</strong></span></h2>
<ul>
<li>Item uno</li>
<li> Item *dos*</li>
<li><del>Elemento</del></li>
</ul>`))).toEqual("h1. Header 1\n" +
        "h2. Subheader for {color:#0000ff}*testing*{color}\n" +
        "* Item uno\n" +
        "*  Item *dos*\n" +
        "* -Elemento-\n");

    });

    test('when converting complex HTML, then generates correct JIRA markup', () => {
    //Fails due to empty spaces. Markup is generated correctly
    
    expect(converter.getJIRAMarkup(TestUtils.createHtmlElement("div", `<p>Editor <strong>content</strong><strong><em> formatted </em></strong><del>strike </del><sup>super </sup>and <sub>sub </sub><ins>underline</ins></p>
    <blockquote><span style="color: rgb(247,218,100);">blockquot </span></blockquote>
    <blockquote><span style="color: rgb(247,218,100);">JHGJHe</span></blockquote>
    <pre><span style="color: rgb(0,0,0);">THIS IS CODE ads</span></pre>
    <ul>
    <li><span style="color: rgb(0,0,0);">Unordered list 1</span></li>
    <li><span style="color: rgb(0,0,0);">Unordered list 2</span></li>
    </ul>
    <ol>
    <li><span style="color: rgb(0,0,0);">Ordered list 1</span></li>
    <li><span style="color: rgb(0,0,0);">Ordered 😀</span>&nbsp;</li>
    </ol>`))).toEqual("Editor *content* *_formatted_* -strike- ^super^ and ~sub~ +underline+ \n" +
    "bq. {color:#f7da64}blockquot {color}\n" +
    "bq. {color:#f7da64}JHGJHe{color}\n" +
    "{{{color:#000000}THIS IS CODE ads{color}}}\n" +
    "* {color:#000000}Unordered list 1{color}\n" +
    "* {color:#000000}Unordered list 2{color}\n" +
    "\n" +
    "# {color:#000000}Ordered list 1{color}\n" +
    "# {color:#000000}Ordered �{color}� ");

    });
  
  });

  describe('addHtmlConverter TESTS', () => {
    test('when adding an empty converter, then throws an error', () => {
      expect(() => {
        converter.addHtmlConverter(null)
      }).toThrowError("Markup converter is required");

      expect(() => {
        converter.addHtmlConverter(undefined)
      }).toThrowError("Markup converter is required");
      
    });

    test('when adding an invalid converter, then throws an error', () => {
      expect(() => {
        converter.addHtmlConverter({})
      }).toThrowError("Markup converter must inherit from MarkupConverter to implement 'getJIRAMarkup'");
    });
  
  });
   
}); 