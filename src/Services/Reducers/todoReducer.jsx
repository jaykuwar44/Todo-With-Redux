import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  REMOVE_SELECTED_TODOS,
} from "../Actions/actionsTypes";

const initialState = {
  todoData: [],
};

export default function todosItems(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todoData: [...state.todoData, action.payload] };

    case REMOVE_TODO:
      return {
        ...state,
        todoData: state.todoData.filter((todo) => todo.id !== action.payload),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todoData: state.todoData.map((item) =>
          item.id === action.payload.id
            ? { ...item, text: action.payload.text }
            : item
        ),
      };

    case REMOVE_SELECTED_TODOS:
      return {
        ...state,
        todoData: action.payload, // Set the remaining todos in the state
      };

    default:
      return state;
  }
}
