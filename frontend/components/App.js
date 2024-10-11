import React from "react";
import axios from "axios";
import Form from "./Form";
import TodoList from "./TodoList";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: "",
      todoName: "",
      completed: true,
    };
  }

  errorResponse = (error) => {
    this.setState({ ...this.state, error: error.response.data.message });
  };

  resetForm = () => {
    this.setState({ ...this.state, todoName: "" });
  };

  todoSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo();
  };

  todoOnChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoName: value });
  };

  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.todoName })
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        });
        this.resetForm();
      })
      .catch(this.errorResponse);
  };

  fetchTodos = () => {
    return axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch(this.errorResponse);
  };

  toggleCompleted = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((todo) => {
            if (todo.id !== id) return todo;
            return res.data.data;
          }),
        });
      })
      .catch(this.errorResponse);
  };

  componentDidMount() {
    this.fetchTodos();
  }

  showCompleted = () => {
    this.setState({ ...this.state, completed: !this.state.completed });
  };

  render() {
    return (
      <div>
        <div id="error">{this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          completed={this.state.completed}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          todoSubmit={this.todoSubmit}
          todoOnChange={this.todoOnChange}
          showCompleted={this.showCompleted}
          todoName={this.state.todoName}
          completed={this.state.completed}
        />
      </div>
    );
  }
}

// - `Your app should display a list of todos, an input field, a submit button, and a button to filter out completed todos
// - `<App />` will hold all of the state machinery:
// - Application state, held in component state
// - State-changing methods, event handlers
