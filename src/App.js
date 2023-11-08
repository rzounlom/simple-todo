import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import TodoList from "./components/todo-list/TodoList";
// import { initialTodos } from "./data";
import todoService from "./services/todoService";

function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);
  // State to manage the input field for new todo names
  const [todoName, setTodoName] = useState("");
  // State to manage the confidence level for new todos
  const [confidence, setConfidence] = useState(5);

  const [isLoading, setIsLoading] = useState(false);

  // Function to add a new todo
  const addTodo = async () => {
    setIsLoading(true);
    if (todoName) {
      const newTodo = {
        id: todos.length + 1,
        name: todoName,
        completed: false,
        confidence: parseInt(confidence, 10),
      };

      const createdTodo = await todoService.createTodo(newTodo); //calling the createTodo function from the todoService module

      if (createdTodo) {
        await fetchTodos(); //calling the fetchTodos function to update the todos state with the new todo
        toast.success("Todo created successfully");
      } else {
        toast.error("Error creating todo");
      }
      setIsLoading(false); //setting the isLoading state to false

      setTodoName(""); // Reset the input field for new todo names
      setConfidence(5); // Reset the confidence level to default
    } else {
      setIsLoading(false); //setting the isLoading state to false
      toast.error("Please enter a todo name"); // Display an error toast if the todo name is empty
    }
  };

  // Function to remove a todo by id
  const removeTodo = async (id) => {
    const deletedTodo = todoService.deleteTodo(id); //calling the deleteTodoById function from the todoService module
    if (deletedTodo) {
      //if the todo was successfully deleted
      setIsLoading(true); //setting the isLoading state to true
      await fetchTodos(); //calling the fetchTodos function to update the todos state with the new todo
      setIsLoading(false); //setting the isLoading state to false
      toast.success("Todo deleted successfully");
    } else {
      setIsLoading(false); //setting the isLoading state to false
      toast.error("Error deleting todo");
    }
  };

  // Function to toggle the 'completed' state of a todo
  const toggleTodo = (id) => {
    const newTodos = todos.map(
      (todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo //mapping over current todos and updating the completed property of the todo that matches the id
    );
    setTodos(newTodos); //updating the todos state with the newTodos array
  };

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    setIsLoading(true); //setting the isLoading state to true
    const todos = await todoService.getTodos(); //calling the getTodos function from the todoService module
    // console.log("todos:", todos);
    setTodos(todos); //updating the todos state with the todos array returned from the API
    setIsLoading(false); //setting the isLoading state to false
  };

  //add useEffect hook to fetch todos from the API
  useEffect(() => {
    fetchTodos(); //calling the fetchTodos function
  }, []); // passing an empty array as the second argument to useEffect to ensure that the effect is only run once when the page initially loads

  // Render the Todo app
  return (
    <div className="App">
      <ToastContainer position="top-center" />
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
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        loading={isLoading}
      />
      {/*passing down the todos, removeTodo, and toggleTodo functions as props*/}
    </div>
  );
}

export default App;
