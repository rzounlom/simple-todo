import Todo from "../todo/Todo";

// Component to render the list of todos
const TodoList = ({ todos, removeTodo, toggleTodo }) => {
  //destructuring todos, removeTodo, and toggleTodo from props

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {todos.map(
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
      )}
    </ul>
  );
};

export default TodoList;
