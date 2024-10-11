import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.todoSubmit}>
          <input
            value={this.props.todoName}
            type="text"
            placeholder="Type todo"
            onChange={this.props.todoOnChange}
          />
          <input type="submit" />
          <br />
          <br />
          <button onClick={this.props.showCompleted}>
            {this.props.completed ? "Hide" : "Show"} Completed
          </button>
        </form>
      </>
    );
  }
}

// - `<Form />` will hold your input field and your `Add Todo` and `Clear Completed` buttons<Form />` will hold your input field and your `Add Todo` and `Clear Completed` buttons
//   - Your input field should take in user input, and allow a user to press `Enter` or click on the `Submit Button` to add a todo to your list
//   - Once a todo is submitted, the Todo List should re-render and show the added todo
