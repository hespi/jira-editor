import React, { Component } from "react";
import PropTypes from 'prop-types';

class JiraEditor extends Component {
  
  static propTypes = {
    
  }

  static defaultProps = {
    
  }

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="jira-editor">
        {this.props.children}
      </div>
    );
  }
}

export default JiraEditor;
