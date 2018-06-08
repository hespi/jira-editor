import React from "react";
import { render } from "react-dom";
import JiraEditor from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
      <JiraEditor>Editor content</JiraEditor>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
