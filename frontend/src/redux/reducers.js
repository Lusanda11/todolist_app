// ****************** reducers.js *********************


import { combineReducers } from "redux";
import {
  LOGIN_USER,
  REGISTER_USER,
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  FETCH_TODOS
} from "./actions";

// Initial state
const initialUserState = {
  isAuthenticated: false,
  user: {}
};

const initialTodoState = {
  todos: []
};

// User Reducer
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// Todo Reducer
const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload.updatedTodo : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer
});

export default rootReducer;
