// ****************** TodoList.js *********************


// Import necessary modules and components.
// ----------------------------------------------------------------------------------------------------------------------------
    import React from "react";
    import DeleteTodo from "./DeleteTodo"; // Import DeleteTodo component.
    import UpdateTodo from "./UpdateTodo"; // Import UpdateTodo component.
    import "../styles/TodoList.css"; // Import CSS for styling.
// ----------------------------------------------------------------------------------------------------------------------------


// TodoList component displays the list of todos with update and delete options.
// ----------------------------------------------------------------------------------------------------------------------------
    const TodoList = ({ todos, onUpdate, onDelete }) =>
    {
      return (
        <div>
          <h2>Your Todos</h2> {/* Header for the todo list */}

          {/* Conditionally render message or the list of todos */}
          {todos.length === 0 ? (
            <p>No todos found.</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo._id} className="todo-item"> {/* Assign unique key for each todo */}
                  <span>{todo.task}</span> {/* Display the todo task */}

                  {/* Render the UpdateTodo and DeleteTodo components for each todo */}
                  <UpdateTodo todoId={todo._id} currentTask={todo.task} onUpdate={onUpdate} /> {/* Pass update handler */}
                  <DeleteTodo todoId={todo._id} onDelete={onDelete} /> {/* Pass delete handler */}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };
// ----------------------------------------------------------------------------------------------------------------------------


export default TodoList; // Export the component.
