import "./Todo.css";

// Component to render a single todo
const Todo = ({
  id,
  name,
  completed,
  confidence,
  deleteTodo,
  updateTodo,
  // setModalOpen,
}) => {
  //destructuring id, name, completed, confidence, removeTodo, and toggleTodo from props
  return (
    <li>
      {/* Checkbox to mark a todo as completed */}
      <input
        type="checkbox"
        checked={completed} //setting the checked attribute to the completed value
        onChange={() => updateTodo(id, completed)}
      />
      {/* Display the todo name and confidence level */}
      <span
        style={{
          //styling the todo name based on whether it is completed or not
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {name} (Confidence: {confidence})
      </span>

      {/* Button to remove a todo */}
      <button className="remove" onClick={() => deleteTodo(id)}>
        Remove
      </button>
    </li>
  );
};

export default Todo;
