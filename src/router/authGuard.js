import store from "../store";

export default (to, from, next) => {
  if (store.state.authState) {
    next();
  } else {
    next("/login");
  }
};