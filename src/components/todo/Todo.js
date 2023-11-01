// Component to render a single todo
const Todo = ({ id, name, completed, confidence, removeTodo, toggleTodo }) => {
  //destructuring id, name, completed, confidence, removeTodo, and toggleTodo from props
  return (
    <li style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
      {/* Checkbox to mark a todo as completed */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
        style={{ marginRight: "10px" }}
      />
      {/* Display the todo name and confidence level */}
      <span
        style={{
          flexGrow: 1,
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {name} (Confidence: {confidence})
      </span>
      {/* Button to remove a todo */}
      <button onClick={() => removeTodo(id)} style={{ marginLeft: "10px" }}>
        Remove
      </button>
    </li>
  );
};

export default Todo;
