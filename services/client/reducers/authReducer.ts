const authReducer = (state, action) => {
  switch (action.type) {
    case "TOOGLE_AUTH":
      return !state;
    default:
      return state;
  }
};

export default authReducer;
