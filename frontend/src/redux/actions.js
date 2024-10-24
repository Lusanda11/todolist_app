// ****************** action.js *********************


// Action Types
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGOUT_USER = "LOGOUT_USER"; // New action type for logout
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const FETCH_TODOS = "FETCH_TODOS";

// Action Creators
export const loginUser = (userData) => ({
  type: LOGIN_USER,
  payload: userData
});

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData
});

// New action creator for logging out
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo
});

export const editTodo = (id, updatedTodo) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

export const fetchTodos = (todos) => ({
  type: FETCH_TODOS,
  payload: todos
});
