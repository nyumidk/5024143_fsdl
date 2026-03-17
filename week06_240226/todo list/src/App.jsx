import { useState } from "react";
import "./index.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([
      ...todos,
      { id: Date.now(), text: task, completed: false }
    ]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <div className="container">
      <h1>React Todo List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className="task-section">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
            </div>

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ Counter at Bottom */}
      <div className="bottom-counter">
        Complete: {completedCount} | Incomplete: {incompleteCount}
      </div>
    </div>
  );
}

export default App;