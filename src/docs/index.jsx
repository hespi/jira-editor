import React from "react";
import { render } from "react-dom";
import JiraEditor from "../../lib";
import "./styles.css";

var jiraEditor;
var initialContent = `<p>Editor <strong>content</strong><strong><em> formatted </em></strong><del>strike </del><sup>super </sup>and <sub>sub </sub><ins>underline</ins></p>
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
</ol>`;

function onJiraEditor_Loaded(editor) {
  jiraEditor = editor;
}

function onGetHtml_Click(sender) {
  let html = jiraEditor.html
  console.log(html);
  alert(html)
}

function onGetMarkup_Click(sender) {
  let markup = jiraEditor.markup
  console.log(markup);
  alert(markup)

}

function onJIRAEditor_Change(event) {
  console.log(event);
}

function onClearJiraEditor_Click() {
  jiraEditor.html = "";
}

function Demo() {
  return (
    <div>
      <h1>JIRA editor demo</h1>
      <form action="#">
        <JiraEditor html={initialContent} ref={onJiraEditor_Loaded} required={true} onChange={onJIRAEditor_Change} />
        <br/>
        <button type="submit">Validate and submit</button>
        <button onClick={onClearJiraEditor_Click}>Clear</button>
      </form>
      
      <br/>
      <article>
        <h2>Editor initialization</h2>
        <section>
          Use <em>text</em> attribute to set the editor contents in plain text.<br/><br/>
        </section>
        
        <pre>{`
        var initialContent = 'This is the text content';

        <JiraEditor text={initialContent} ref={onJiraEditor_Loaded} />
        `}
        </pre>
        <section>
          Use <em>html</em> attribute to set the editor contents in HTML.<br/><br/>
        </section>
        
        <pre>{`
        var initialContent = '<p>Editor <strong>content</strong><strong><em> formatted </em></strong><del>strike </del><sup>super </sup>and <sub>sub </sub><ins>underline</ins></p>
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
        </ol>';

        <JiraEditor html={initialContent} ref={onJiraEditor_Loaded} />
        `}
        </pre>
        <section>
          Use <em>required</em> to set this input as required and, therefore, validated when submitting.<br/><br/>
        </section>
        
        <pre>{`
        <JiraEditor required="true" />
        `}
        </pre>
      </article>
      <br/>
      <article>
        <h2>Events</h2>
        <section>
          <p>
          Use <em>onChange</em> event to keep the state of the editor contents.
          You will get the editor contents in <em>text, html and markup</em> formats inside the event object.
          </p>
          <p>
          Press F12 on your navigator to see the contents of the editor changing in the console.
          </p>
        </section>
        
        <pre>{`
        var jiraEditor = null;

        function onJiraEditor_Loaded(editor) {
          jiraEditor = editor;
        }

        function onJiraEditor_Change(editorContent) {
          console.log(editorContent);
          console.log(editorContent.text);
          console.log(editorContent.html);
          console.log(editorContent.markup);
        }

        function render() {
          return (
            <JiraEditor ref={onJiraEditor_Loaded} onChange={onJiraEditor_Change} />
          )
        }
        `}
        </pre>
      </article>
      <br/>
      <article>
        <h2>HTML generation</h2>
        <section>
          Use <em>html</em> property to get the HTML representing the editor contents.<br/><br/>
          <button onClick={onGetHtml_Click}>Get HTML</button>
        </section>
        
        <pre>{`
        var jiraEditor = null;

        function onJiraEditor_Loaded(editor) {
          jiraEditor = editor;
        }

        function onGetHtml_Click(sender) {
          console.log(jiraEditor.html);
        }

        function render() {
          return (
            <JiraEditor ref={onJiraEditor_Loaded} />
          )
        }
        `}
        </pre>
      </article>
      <br/>
      <article>
        <h2>JIRA markup generation</h2>
        <section>
          Use <em>markup</em> property to get the HTML markup representing the editor contents.<br/><br/>
          <button onClick={onGetMarkup_Click}>Get Markup</button>
        </section>
        
        <pre>{`
        var jiraEditor = null;

        function onJiraEditor_Loaded(editor) {
          jiraEditor = editor;
        }

        function onGetMarkup_Click(sender) {
          console.log(jiraEditor.markup);
        }

        function render() {
          return (
            <JiraEditor ref={onJiraEditor_Loaded} />
          )
        }
        `}
        </pre>
      </article>

    </div>
  );
}

render(<Demo />, document.getElementById("app"));
