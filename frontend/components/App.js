import React, { useState } from "react";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: "",
      todoName: "",
    };
  }
  fetchTodos = () => {
    return axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) =>
        this.setState({ ...this.state, error: err.response.data.message })
      );
  };
  componentDidMount() {
    this.fetchTodos();
  }
  todoOnChange = evt => {
    const { value } = evt.target
    this.setState({...this.state, todoName: value})
  }
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoName })
      .then(res => {
        
      })
  }

  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.map((todo) => {
            return <div key={todo.id}>{todo.name}</div>;
          })}
        </div>
        <form>
          <input
            value={this.state.todoName}
            type="text"
            placeholder="Type todo"
            onChange={this.todoOnChange}
          />
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
