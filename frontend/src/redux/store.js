// ****************** store.js *********************


import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Ensure this is a named import
// import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

// Create the Redux store with middleware and dev tools
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Ensure thunk is applied correctly
);

// Export the store as a default export
export default store;
