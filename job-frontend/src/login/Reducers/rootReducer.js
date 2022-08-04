import { combineReducers } from "redux";

import authTokenReducer from "./authTokenReducer";

const rootReducer = combineReducers({
  authToken: authTokenReducer
});

export default rootReducer;
