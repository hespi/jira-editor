import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import HtmlJiraConverter from './conversion/HtmlJiraConverter';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';   

class JiraEditor extends Component {
  
  static propTypes = {
    text: PropTypes.string,
    html: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    html: "",
    text: "",
    required: true,
    onChange: undefined
  }

  /** GETTERS/SETTERS */

  get text() {
    return this._convertEditorStateToPlainText(this.state.editorState);
  }

  set text(value) {
    this.setState({
      editorState: (!!value) ? this._convertTextToEditorState(value) : EditorState.createEmpty()
    });
  }

  get html() {
    return this._convertEditorStateToHtml(this.state.editorState);
  }

  set html(value) {
    this.setState({
      editorState: (!!value) ? this._convertHtmlToEditorState(value) : EditorState.createEmpty()
    });
  }

  get markup() {
    return this._convertHtmlToJiraMarkup(this.html);
  }

  constructor(props) {
    super(props);

    this._markupConverter = this._initializeConverter();
    this.state = {
      editorState: (!!props.html) ? this._convertHtmlToEditorState(props.html) : ((!!props.text) ? this._convertTextToEditorState() : EditorState.createEmpty())
    };
    debugger;
  }


/** METHODS */

/** FUNCTIONS */

_initializeConverter = () => {
  return new HtmlJiraConverter();
}

_convertHtmlToEditorState = (html) => {
  const blocksFromHTML = htmlToDraft(html);
  return EditorState.createWithContent(ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  ));
}

_convertTextToEditorState = (text) => {
  return EditorState.createWithContent(ContentState.createFromText(text));
}

_convertEditorStateToHtml = (editorState) => {
  return draftToHtml(convertToRaw(editorState.getCurrentContent()));
}

_convertHtmlToJiraMarkup = (htmlText) => {
  var element = document.createElement("div");
  element.innerHTML = htmlText;
  return this._markupConverter.getJIRAMarkup(element);
}

_convertEditorStateToPlainText = (editorState) => {
  return editorState.getCurrentContent().getPlainText();
}

_sendChangeEvent = () => {
  if (!!this.props.onChange && typeof(this.props.onChange) === "function") {
    this.props.onChange({
      text: this.text,
      html: this.html,
      markup: this.markup
    });
  }
}

/** EVENTS */
  onEditorState_Change = (editorState) => {
    debugger;
    this.setState({
      editorState
    });

    this._sendChangeEvent();
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="jira-editor-wrapper">
        <Editor 
          editorState={editorState}
          wrapperClassName="jira-editor"
          editorClassName="content"
          toolbarClassName="toolbar"
          onEditorStateChange={this.onEditorState_Change}
          toolbar={{
            options: ['blockType', 'inline', 'list', 'colorPicker', 'emoji'],
            blockType: {
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              className: 'text-style-selector',
              component: undefined,
              dropdownClassName: undefined,
            },
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
              bold: { icon: '', className: 'icon icon-bold' },
              italic: { icon: '', className: 'icon icon-italic' },
              underline: { icon: '', className: 'icon icon-underline' },
              strikethrough: { icon: '', className: 'icon icon-strikethrough' },
              superscript: { icon: '', className: 'icon icon-superscript' },
              subscript: { icon: '', className: 'icon icon-subscript' },
            },
            list: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['unordered', 'ordered'],
              unordered: { icon: '', className: 'icon icon-listul' },
              ordered: { icon: '', className: 'icon icon-listol' },
            },
            colorPicker: {
              icon: '',
              className: 'icon icon-color-picker',
              component: undefined,
              popupClassName: undefined,
              colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
            },
            emoji: {
              icon: '',
              className: 'icon icon-emoji',
              component: undefined,
              popupClassName: undefined,
              emojis: [
                '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓', '😛', '😜', '😠', '😇', '😷', '😈', 
                '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '🐵',
                '💪', '👈', '👉', '👉', '👆', '🖕', '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊',
                '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                '🎉', '🎊', '🎁', '📅',
                '✅', '❎','✔','✖', '⛔', '⚠', '🚫','❗','❓','⁉','‼',
                '🔝','🔜','🔙','🔄','↪','↩',
                '▶','⏩','⏭','⏯','◀','⏪','⏮',
                '©','®','™'
              ],
            }
          }}
        />
      {
        !!this.props.required && <input type="text" required defaultValue={this.text} />
      }
      </div>

    );
  }
}

export default JiraEditor;
