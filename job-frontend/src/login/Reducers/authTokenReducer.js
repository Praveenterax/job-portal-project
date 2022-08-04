import jwtDecode from "jwt-decode";

function authTokenReducer(state = {}, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "SETAUTHTOKEN":
      // console.log("in reducer setauthtoken");
      // console.log(action.data);
      localStorage.setItem("token", action.data);

      const decoded = jwtDecode(action.data);

      return { ...decoded };

    case "CLEARAUTHTOKEN":
      localStorage.removeItem("token");
      return {};

    // Do something here based on the different types of actions
    default:
      // console.log("in reducer default");
      return { ...state };
  }
}
export default authTokenReducer;
