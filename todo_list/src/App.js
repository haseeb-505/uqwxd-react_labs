import React, { useState } from "react";
import "./App.css";
const App = () => {
  
  const [todos, setToDos] = useState([]);

  const[todoEditing, setToDoEditing] = useState(null);

  // Add the handlesubmit code here
  function handleSubmit(e){
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value;
    const newtodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    // store the newtodo
    if (newtodo.text.length > 0) {
      setToDos([...todos].concat(newtodo));
    } else {
      alert("Enter a valid todo task");
    };
    document.getElementById('todoAdd').value = "";
  }

  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo)=> todo.id !== id);
    setToDos(updatedTodos);
  }

  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) =>{
      if (todo.id === id) {
        todo.completed =! todo.completed;
      }
      return todo;
    });
    setToDos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(newtodo) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === newtodo.id) {
        todo.text = document.getElementById(newtodo.id).value;
      }
      return todo;
    })
  
  setToDos(updatedTodos);
  setToDoEditing(null);
  }

  return (
    <div className="App">
      <div className="todo-list">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id="todoAdd" />
          <button type="submit">Add ToDo</button>
        </form>

      {/* display the todo list and add other functionality here */}
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            {/* checkbox to check if the task is completed or not */}
            <input type="checkbox" id="completed" checked={todo.completed} onChange={() =>(toggleComplete(todo.id))} />
            {/* display the tasks list
            <div>{todo.text}</div> */}
            {/* in edit mode, display the input box, otherwise diplay the text */}
            {todo.id === todoEditing ? 
              (
                <input type="text" id={todo.id} defaultValue={todo.text} />
              ):
              (
                <div>{todo.text}</div>
              )
            }
          </div>

          {/* add different action buttons to add the functionality to the web page */}

          <div className="todo-actions">
            {/* delete button for the every todo separately */}
            {todo.id === todoEditing?
              (
                <button onClick={() => submitEdits(todo)}>Submit Edits</button>
              ):
              (
                <button onClick={() => setToDoEditing(todo.id)}>Edit</button>
              )
            }
            <button className="danger" onClick={()=>deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
      )
      )}
      </div> 
    </div>
  );
};
export default App;
