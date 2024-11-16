import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  updateTodo,
  removeSelectedTodos,
} from "../Services/Actions/action";
import "../todo-style.css";
import edit from "../Images/edit.png";
import delet from "../Images/delete.png";
import { Checkbox } from "@mui/material";

function Home() {
  const todos = useSelector((state) => state.todosItems.todoData);

  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState();
  const [editVisibility, setEditVisibility] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectCheckboxes, setSelectCheckboxes] = useState([]);

  const inputHandler = (e) => {
    // console.log(e.target.value);
    setTodoText(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (todoText == "") {
      alert("Please fill the input field");
    } else {
      if (editVisibility) {
        const updatedTodo = {
          id: editingId,
          text: todoText,
        };
        dispatch(updateTodo(updatedTodo));
        setEditVisibility(false);
        setEditingId(null);
      } else {
        const newTodo = {
          id: todos.length + 1,
          text: todoText,
        };
        dispatch(addTodo(newTodo));
      }

      setTodoText("");
    }
  };

  const deleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const updateTodoHandler = (item) => {
    setEditVisibility(true);
    setTodoText(item.text);
    setEditingId(item.id);
  };

  const handleCheckbox = (id) => {
    if (selectCheckboxes.includes(id)) {
      // Deselect the checkbox
      setSelectCheckboxes(
        selectCheckboxes.filter((checkboxId) => checkboxId !== id)
      );
    } else {
      // Select the checkbox
      setSelectCheckboxes([...selectCheckboxes, id]);
    }
  };

  const handleRemoveSelected = () => {
    const remainingTodos = todos.filter(
      (todo) => !selectCheckboxes.includes(todo.id)
    );
    dispatch(removeSelectedTodos(remainingTodos));
    setSelectCheckboxes([]);
  };

  return (
    <div
      className="container-fluid pt-5"
      style={{ background: "#fcee85", height: "100vh" }}
    >
      <div
        className="col-5 mx-auto p-3 shadow"
        style={{ backgroundColor: "#faf1c8" }}
      >
        <h2
          style={{ color: "maroon", textAlign: "center", marginBottom: "12px" }}
        >
          TODO-LIST
        </h2>
        <form
          action=""
          onSubmit={submitHandler}
          className="d-flex gap-4 mx-auto"
        >
          <input
            type="text"
            name="todo"
            onChange={inputHandler}
            value={todoText}
            className=""
            style={{ width: "75%" }}
          />
          <button className="btn btn-success" type="submit">
            {editVisibility ? "Update" : "Add Todo"}
          </button>
        </form>

        {/* Display the list of todos */}
        <ul className="list">
          {todos.map((item) => {
            return (
              <div className="list-item">
                <div className="d-flex gap-2 align-items-center">
                  <Checkbox
                    color="secondary"
                    onChange={() => handleCheckbox(item.id)}
                    checked={selectCheckboxes.includes(item.id)}
                  />
                  <li key={item.id}>{item.text}</li>
                </div>
                <div className="d-flex gap-4 me-5">
                  <img src={edit} onClick={() => updateTodoHandler(item)} />
                  <img src={delet} onClick={() => deleteTodo(item.id)} />
                </div>
              </div>
            );
          })}
        </ul>
        {selectCheckboxes.length >= 1 && (
          <div className="text-center">
            <button
              className="btn btn-danger mt-2"
              onClick={handleRemoveSelected}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
