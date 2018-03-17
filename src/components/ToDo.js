import React, { Component } from 'react';

// A child of the 'App' component. Data for this.props is passed down from it in App.js.
class ToDo extends Component {
  render() {
    return (
      <li>
        <input type="checkbox" checked={this.props.isCompleted} />
        <span> { this.props.description } </span>
      </li>
    );
  }
}

// Once a component is exported, it can be imported anywhere we want to use it.
export default ToDo;
