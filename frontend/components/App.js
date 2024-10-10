import React, { useState } from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }
  fetchTodos = () => {
    return axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => console.log("uh oh... something happened"));
  };
  componentDidMount() {
    this.fetchTodos();
  }

  render() {
    return (
      <div>
        {this.state.todos.map(todo => {
          return <div key={todo.id}>{todo.name}</div>
        }) }
        <form>
          <input type="text" placeholder="Type todo" />
          <input type="submit" />
          <br />
          <br />
          <input type="button" value="Hide Completed" />
        </form>
      </div>
    );
  }
}

// - `Your app should display a list of todos, an input field, a submit button, and a button to filter out completed todos
// - `<App />` will hold all of the state machinery:
// - Application state, held in component state
// - State-changing methods, event handlers
