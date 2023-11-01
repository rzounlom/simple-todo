import "./App.css";

import React, { useState } from "react";

import TodoList from "./components/todo-list/TodoList";
import { initialTodos } from "./data";

function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState(initialTodos);
  // State to manage the input field for new todo names
  const [todoName, setTodoName] = useState("");
  // State to manage the confidence level for new todos
  const [confidence, setConfidence] = useState(5);

  // Function to add a new todo
  const addTodo = () => {
    if (todoName) {
      const newTodo = {
        id: todos.length + 1,
        name: todoName,
        completed: false,
        confidence: parseInt(confidence, 10),
      };
      setTodos([...todos, newTodo]); // Add the new todo to the list
      setTodoName(""); // Reset the input field for new todo names
      setConfidence(5); // Reset the confidence level to default
    }
  };

  // Function to remove a todo by id
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Function to toggle the 'completed' state of a todo
  const toggleTodo = (id) => {
    const newTodos = todos.map(
      (todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo //mapping over current todos and updating the completed property of the todo that matches the id
    );
    setTodos(newTodos); //updating the todos state with the newTodos array
  };

  // Render the Todo app
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <div className="todo-header">
        {/* Input field for new todo names */}
        <input
          className="add-todo"
          type="text"
          placeholder="Add a new todo..."
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        {/* Input field for confidence level */}
        <input
          className="todo-confidence"
          type="number"
          min="1"
          max="5"
          value={confidence}
          onChange={(e) => setConfidence(e.target.value)}
        />
        <button onClick={addTodo}>Submit</button>
      </div>
      {/* Component to render the list of todos */}
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      {/*passing down the todos, removeTodo, and toggleTodo functions as props*/}
    </div>
  );
}

export default App;
