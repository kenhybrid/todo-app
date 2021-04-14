import { auth, firestore } from "../../plugins/firebase";
import router from "../../router";
const state = {
  todos: [],
  author: "",
  notification: {
    snackbar: false,
    message: "",
    icon: "",
  },
};

const getters = {
  //getters
  getAllTodos(state) {
    return state.todos;
  },
  getOneTodo(state) {
    return (id) => {
      return state.todos.find((todo) => {
        return todo.id === id;
      });
    };
  },
  // getNotification(state) {
  //   return state.notification;
  // },
};

const mutations = {
  SET_AUTHOR(state, payload) {
    state.author = payload;
  },
  SET_NOTIFICATION(state, payload) {
    state.notification.snackbar = payload.snackbar;
    state.notification.message = payload.message;
    state.notification.icon = payload.icon;
  },
  CLEAR_NOTIFICATION(state) {
    state.notification.snackbar = false;
    state.notification.message = "";
    state.notification.icon = "";
  },
  SET_TODO(state, payload) {
    // if (state.todos.some((e) => e == payload.id)) return;
    let array = state.todos;
    array.unshift(payload);

    let ids = array.map((o) => o.id);
    let filtered = array.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    return state.todos =filtered
  },
  SET_TODOS(state, payload) {
    state.todos = payload;
  },
  
  UPDATE_TODO(state, payload) {
    const todo = state.todos.find((todo) => {
      return todo.id === payload.id;
    });
    if (payload.content) {
      todo.content = payload.content;
    }
    if (payload.done) {
      todo.done = payload.done;
    }
    if (payload.dueDate) {
      todo.dueDate = payload.dueDate;
    }
  },
  DELETE_TODO(state, payload) {
    const index = state.todos.findIndex((todo) => {
      return todo.id == payload.id;
    });
    state.todos.splice(index, 1);
  },
  searcTodos(state, payload) {
    let results = [];
    if (payload == null || payload == "") {
      return state.todos;
    } else {
      results = state.todos.filter((todo) => {
        return todo.content.toUpperCase().includes(payload.toUpperCase());
      });
      return (state.todos = results);
    }
  },
};
//actions
const actions = {
  getAuthor({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        commit("SET_AUTHOR", user.uid);
      }
    });
  },
  createTodo({ commit, state }, payload) {
    const todo = {
      content: payload.content,
      createdAt: payload.createdAt,
      done: payload.done,
      dueDate: payload.dueDate,
      priority: payload.priority,
      author: state.author,
    };
    router.replace("/");

    firestore
      .collection("todos")
      .add(todo)
      .then((doc) => {
        const data = {
          id: doc.id,
          content: payload.content,
          createdAt: payload.createdAt,
          done: payload.done,
          dueDate: payload.dueDate,
          priority: payload.priority,
        };

        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Todo has been created",
          icon: "mdi-check",
          doc: doc,
        });
        commit("SET_TODO", data);

        new Audio(require("@/assets/notification.mp3")).play();
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Todo creation failed",
          icon: "mdi-alert-outline",
        });
      });
  },
  getAllTodos({ commit, state }) {
    firestore
      .collection("todos")
      .where("author", "==", state.author)
      .get()
      .then((docs) => {
        const todos = [];
        docs.forEach((doc) => {
          const data = {
            id: doc.id,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            done: doc.data().done,
            dueDate: doc.data().dueDate,
            priority: doc.data().priority,
          };
          todos.push(data);
        });
        // console.log(todos)
        commit("SET_TODOS", todos);
        commit("CLEAR_NOTIFICATION");
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed getting todos",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  updateTodo({ commit }, payload) {
    router.push("/");

    firestore
      .collection("todos")
      .doc(payload.id)
      .update({
        content: payload.content,
        dueDate: payload.dueDate,
        priority: payload.priority,
      })
      .then(() => {
        commit("UPDATE_TODO", payload);
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Todo has been updated",
          icon: "mdi-pencil-outline",
        });
        commit("CLEAR_NOTIFICATION");
        new Audio(require("@/assets/notification.mp3")).play();
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed updating todo",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  deleteTodo({ commit }, payload) {
    firestore
      .collection("todos")
      .doc(payload.id)
      .delete()
      .then(() => {
        commit("DELETE_TODO", payload);
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Todo has been deleted",
          icon: "mdi-delete-outline",
        });
        new Audio(require("@/assets/notification.mp3")).play();

        commit("CLEAR_NOTIFICATION");
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed deleting todo",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  scheduleTodo({ commit }, payload) {
    firestore
      .collection("todos")
      .doc(payload.id)
      .update({ dueDate: payload.dueDate })
      .then(() => {
        commit("UPDATE_TODO", payload);
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Todo has been scheduled",
          icon: "mdi-clock",
        });
        commit("CLEAR_NOTIFICATION");
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed scheduling todo",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  doneTodo({ commit }, payload) {
    firestore
      .collection("todos")
      .doc(payload.id)
      .update({ duedoneDate: payload.done })
      .then(() => {
        commit("UPDATE_TODO", payload);
        // commit("SET_NOTIFICATION", {
        //   snackbar: true,
        //   message: "Todo has been completed",
        //   icon: "mdi-check-all",
        // });
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed completing todo",
          icon: "mdi-alert-outline",
        });
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
