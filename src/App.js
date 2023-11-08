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

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    setIsLoading(true); //setting the isLoading state to true
    const todos = await todoService.getTodos(); //calling the getTodos function from the todoService module
    // console.log("todos:", todos);

    setTodos(todos); //updating the todos state with the todos array returned from the API
    setIsLoading(false); //setting the isLoading state to false
  };

  // Function to add a new todo
  const createTodo = async () => {
    setIsLoading(true);
    if (todoName) {
      //if the todo name is not empty
      const newTodo = {
        //creating a new todo object
        id: todos.length + 1,
        name: todoName,
        completed: false,
        confidence: parseInt(confidence, 10),
      };

      const createdTodo = await todoService.createTodo(newTodo); //calling the createTodo function from the todoService module

      //check if the todo was successfully created
      if (createdTodo) {
        await fetchTodos(); //calling the fetchTodos function to update the todos state with the new todo
        toast.success("Todo created successfully");
      } else {
        toast.error("Error creating todo"); // Display an error toast if the todo was not created
      }
      setIsLoading(false); //setting the isLoading state to false

      setTodoName(""); // Reset the input field for new todo names
      setConfidence(5); // Reset the confidence level to default
    } else {
      setIsLoading(false); //setting the isLoading state to false
      toast.error("Please enter a todo name"); // Display an error toast if the todo name is empty
    }
  };

  const handleKeyDown = (e) => {
    //function to handle the keydown event to sumbit the todo when user presses the enter key
    if (e.key === "Enter") {
      //if the key pressed is the enter key
      createTodo(); //call the createTodo function
    }
  };

  // Function to update a todo completed status by id
  const updateTodo = async (id, completed) => {
    setIsLoading(true); //setting the isLoading state to true
    //calling the updateTodoById function from the todoService module
    const updatedTodo = await todoService.updateTodo(id, {
      //passing the id and the updated todo object as arguments
      completed: !completed, //setting the completed property to the opposite of the current value
    }); //calling the deleteTodoById function from the todoService module
    // console.log("updatedTodo:", updatedTodo);
    if (updatedTodo) {
      //if the todo was successfully deleted
      await fetchTodos(); //calling the fetchTodos function to update the todos state with the new todo
      setIsLoading(false); //setting the isLoading state to false
      // toast.success("Todo updated successfully");
    } else {
      setIsLoading(false); //setting the isLoading state to false
      toast.error("Error updating todo");
    }
  };

  // Function to delete a todo by id
  const deleteTodo = async (id) => {
    setIsLoading(true); //setting the isLoading state to true
    const deletedTodo = await todoService.deleteTodo(id); //calling the deleteTodoById function from the todoService module
    if (deletedTodo) {
      //if the todo was successfully deleted
      await fetchTodos(); //calling the fetchTodos function to update the todos state with the new todo
      setIsLoading(false); //setting the isLoading state to false
      toast.success("Todo deleted successfully"); // Display a success toast if the todo was deleted
    } else {
      setIsLoading(false); //setting the isLoading state to false
      toast.error("Error deleting todo"); // Display an error toast if the todo was not deleted
    }
  };

  //add useEffect hook to fetch todos from the API
  useEffect(() => {
    fetchTodos(); //calling the fetchTodos function to fetch todos from the API
  }, []); // passing an empty array as the second argument to useEffect to ensure that the effect is only run once when the page initially loads

  // Render the Todo app
  return (
    <div className="App">
      <ToastContainer position="top-right" />

      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <div className="todo-header">
        {/* Input field for new todo names */}
        <input
          className="add-todo"
          type="text"
          placeholder="Add a new todo..."
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={handleKeyDown}
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
        <button onClick={createTodo}>Submit</button>
      </div>
      {/* Component to render the list of todos */}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        loading={isLoading}
      />
      {/*passing down the todos, removeTodo, and toggleTodo functions as props*/}
    </div>
  );
}

export default App;
