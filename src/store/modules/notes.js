import {auth, firestore } from "../../plugins/firebase";
import router from "../../router";
const state = {
  notes: [],
  author: "",
  notification: {
    snackbar: false,
    message: "",
    icon: "",
  },
};
const getters = {
  getAllNotes(state) {
    return state.notes;
  },
  getOneNote(state) {
    return (id) => {
      return state.notes.find((note) => {
        return note.id === id;
      });
    };
  },
};

const mutations = {
  SET_NOTES(state, payload) {
    state.notes = payload;
  },
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
  SET_NOTE(state, payload) {
    // if (state.todos.some((e) => e == payload.id)) return;
    let array = state.notes;
    array.unshift(payload);

    let ids = array.map((o) => o.id);
    let filtered = array.filter(
      ({ id }, index) => !ids.includes(id, index + 1)
    );
    return (state.notes = filtered);
  },
  DELETE_NOTE(state, payload) {
    const index = state.notes.findIndex((note) => {
      return note.id == payload.id;
    });
    state.notes.splice(index, 1);

  },
  UPDATE_NOTE(state, payload) {
    const note = state.notes.find((note) => {
      return note.id === payload.id;
    });
    if (payload.title) {
      note.title = payload.title;
    }
    if (payload.body) {
      note.body = payload.body;
    }
    
  },
  searchNotes(state, payload) {
    let results = [];
    if (payload == null || payload == "") {
      return state.notes;
    } else {
      results = state.notes.filter((note) => {
        return note.title.toUpperCase().includes(payload.toUpperCase());
      });
      return (state.notes = results);
    }
  },
  updateList(state,payload){
    state.notes =payload
  }
};

const actions = {
  getLogedAuthor({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        commit("SET_AUTHOR", user.uid);
      }
    });
  },
  getAllNotes({ commit, state }) {
    firestore
      .collection("notes")
      .where("author", "==", state.author)
      .get()
      .then((docs) => {
        const notes = [];
        docs.forEach((doc) => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            createdAt: doc.data().createdAt,
            body: doc.data().body,
          };
          notes.push(data);
        });
        commit("SET_NOTES", notes);
        commit("CLEAR_NOTIFICATION");
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed getting notes",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  createNote({ commit, state }, payload) {
    const note = {
      title: payload.title,
      createdAt: payload.createdAt,
      body: payload.body,
      author: state.author,
    };
    router.replace("/notes");
    firestore
      .collection("notes")
      .add(note)
      .then((doc) => {
        const data = {
          id: doc.id,
          title: payload.title,
          createdAt: payload.createdAt,
          body: payload.body,
        };

        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Note has been created",
          icon: "mdi-check",
          doc: doc,
        });
        commit("SET_NOTE", data);

        new Audio(require("@/assets/notification.mp3")).play();
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Note creation failed",
          icon: "mdi-alert-outline",
        });
      });
  },
  deleteNote({ commit }, payload) {
    firestore
      .collection("notes")
      .doc(payload.id)
      .delete()
      .then(() => {
        commit("DELETE_NOTE", payload);
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Note has been deleted",
          icon: "mdi-delete-outline",
        });
        new Audio(require("@/assets/notification.mp3")).play();

        commit("CLEAR_NOTIFICATION");
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed deleting note",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
  updateNote({ commit }, payload) {
    router.push("/notes");
    firestore
      .collection("notes")
      .doc(payload.id)
      .update({
        title: payload.title,
        body: payload.body,
      })
      .then(() => {
        commit("UPDATE_NOTE", payload);
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Note has been updated",
          icon: "mdi-pencil-outline",
        });
        commit("CLEAR_NOTIFICATION");
        new Audio(require("@/assets/notification.mp3")).play();
      })
      .catch(() => {
        commit("SET_NOTIFICATION", {
          snackbar: true,
          message: "Failed updating note",
          icon: "mdi-alert-outline",
        });
        commit("CLEAR_NOTIFICATION");
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
