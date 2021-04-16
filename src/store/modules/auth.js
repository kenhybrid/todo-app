import { auth, firestore } from "../../plugins/firebase";
import router from "../../router";

const state = {
  // auth state
  user: {},

  currentUser: "",
  authState: false,
  loading: false,
  notification: {
    snackbar: false,
    message: "",
    icon: "",
  },
};

const getters = {
  getNotification(state) {
    return state.notification;
  },
  getLoading(state) {
    return state.loading;
  },
  getUser(state) {
    return state.user;
  },
  getAuthState(state){
    return state.authState
  }
};

const mutations = {
  SET_NOTIFICATION(state, payload) {
    state.notification.snackbar = payload.snackbar;
    state.notification.message = payload.message;
    state.notification.icon = payload.icon;
  },
  SET_AUTH_STATE(state, payload) {
    state.authState = payload;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
};

const actions = {
  //actions
  userSignUp({ commit }, payload) {
    commit("SET_LOADING", true);

    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        const data = {
          email: payload.email,
          username: payload.username,
          author: user.user.uid,
        };
        firestore
          .collection("users")
          .add(data)
          .then(() => {
          })
          .catch(() => {
            // console.log(error);
          });
        commit("SET_LOADING", false);

        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Registration successful",
          icon: "mdi-check",
        });
        // redirect
        router.push("/login");
        // commit("TOOGLE_AUTH",true)
      })
      .catch(() => {
        // look at type of error
        commit("SET_LOADING", false);

        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Registration failed!",
          icon: "mdi-alert-outline",
        });
      });
  },
  userSignIn({ commit }, payload) {
    commit("SET_LOADING", true);

    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        // get user from firestore
        firestore
          .collection("users")
          .where("author", "==", user.user.uid)
          .get()
          .then((docs) => {
            // const users = [];
            docs.forEach((doc) => {
              const data = {
                id: doc.id,
                email: doc.data().email,
                username: doc.data().username,
              };
              commit("SET_USER", data);
            });
          })
          .catch(() => {
            // console.log(error);
          });

        commit("SET_LOADING", false);
        commit("SET_AUTH_STATE", true);
        // redirect
        router.push("/");
      })
      .catch(() => {
        commit("SET_LOADING", false);

        // look at type of error
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Login failed!",
          icon: "mdi-alert-outline",
        });
      });
  },
  logOutUser() {
    auth.signOut().then(() => {
      router.push("/login");
      window.localStorage.removeItem("vuex");
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
