import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import todos from "./modules/todos";
import notes from "./modules/notes";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth,
    todos,
    notes,
  },
});

/*   
auth
  -login
  -register
  -reset password

  -savecurrent user details in local storage
  -global uid constant
todos
  crud
notes
  crud

todo
  -date
  -author
  -content
  -status
  -schedule

note
  -date
  -author
  -content

*/
