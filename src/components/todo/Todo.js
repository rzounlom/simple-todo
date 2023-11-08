import "./Todo.css";

// Component to render a single todo
const Todo = ({
  id,
  name,
  completed,
  confidence,
  removeTodo,
  toggleTodo,
  setModalOpen,
}) => {
  //destructuring id, name, completed, confidence, removeTodo, and toggleTodo from props
  return (
    <li>
      {/* Checkbox to mark a todo as completed */}
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      {/* Display the todo name and confidence level */}
      <span
        style={{
          textDecoration: completed ? "line-through" : "none",
        }}
      >
        {name} (Confidence: {confidence})
      </span>

      <button className="edit" onClick={() => setModalOpen(true)}>
        Edit
      </button>
      {/* Button to remove a todo */}
      <button className="remove" onClick={() => removeTodo(id)}>
        Remove
      </button>
    </li>
  );
};

export default Todo;
