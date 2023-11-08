import "./TodoList.css";

import { RotatingLines } from "react-loader-spinner";
import Todo from "../todo/Todo";

// Component to render the list of todos
const TodoList = ({ todos, removeTodo, toggleTodo, loading }) => {
  //destructuring todos, removeTodo, and toggleTodo from props

  // If loading is true, render the RotatingLines spinner
  if (loading) {
    return (
      <div className="loader-container">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <ul>
        {todos.length > 0 ? (
          todos.map(
            (
              todo //mapping over todos array and rendering a Todo component for each todo object
            ) => (
              <Todo
                key={todo.id} //setting the key prop to the id of the todo object
                {...todo} //spreading the todo object as props to the Todo component
                removeTodo={removeTodo} //passing down the removeTodo function as a prop
                toggleTodo={toggleTodo} //passing down the toggleTodo function as a prop
              />
            )
          )
        ) : (
          <h2 style={{ textAlign: "center", color: "blue" }}>
            All tasks complete!
          </h2>
        )}
      </ul>
    </>
  );
};

export default TodoList;
