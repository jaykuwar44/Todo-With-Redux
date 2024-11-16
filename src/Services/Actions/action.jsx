import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  REMOVE_SELECTED_TODOS,
} from "./actionsTypes";

export const addTodo = (newTodo) => {
  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: id,
  };
};

export const updateTodo = (updateTodoData) => {
  return {
    type: UPDATE_TODO,
    payload: updateTodoData,
  };
};

export const removeSelectedTodos = (remainingTodos) => {
  return {
    type: REMOVE_SELECTED_TODOS,
    payload: remainingTodos,
  };
};
