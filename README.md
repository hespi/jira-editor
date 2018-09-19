# JIRA Editor

A WYSIWYG editor based on DraftJS Editor that generates JIRA markup.

To test it, open the [demo page.](https://hespi.github.io/jira-editor/)

## Installation

```
npm install --save react-jira-editor
```

## Usage


```
import JiraEditor from "react-jira-editor";

var jiraEditor = null;

function onJiraEditor_Loaded(editor) {
    jiraEditor = editor;
}

function render() {
    return (
    <JiraEditor ref={onJiraEditor_Loaded} />
    )
}


```

### Editor initialization
Use the following attributes for component initialization

* _text_: string_ - The initial contents of the editor in plain text format.

Example:

```
var initialContent = 'Editor contents';

function render() {
    return (
    <JiraEditor text={initialContent} />
    )
}

```

* _html: string_ - The initial contents of the editor in HTML format.

Example:

```
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

function render() {
    return (
    <JiraEditor html={initialContent} />
    )
}

```

### Events

Use _onChange_ event to keep the state of the editor contents. You will get the editor contents in text, html and markup formats inside the event object.

* _onChange:_ - To keep the state of the editor contents. You will get the editor contents in text, html and markup formats inside the event object

Example:

```
function onJIRAEditor_Change(editorContents) {
  console.log(editorContents.text);
  console.log(editorContents.html);
  console.log(editorContents.markup);
}

function render() {
    return (
    <JiraEditor onChange={onJIRAEditor_Change} />
    )
}
```

### Markup generation
Use the following properties to access editor contents in different formats:

* _html: string_ - Retrieves the contents of the editor in HTML format.
* _markup: string_ - Retrieves the contents of the editor in JIRA markup format.

Example:

```
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
    <button onClick={onGetHtml_Click}>Get HTML</button>
    )
}
```
```
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
    <button onClick={onGetMarkup_Click}>Get Markup</button>
    )
}

```