import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { auth } from "./plugins/firebase"

Vue.config.productionTip = false;

// checking auth state to load app
let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App),
      mounted() {
        //  load todos and notes
        this.$store.dispatch("getAuthor")
        this.$store.commit("CLEAR_NOTIFICATION")
      }
    }).$mount("#app");
  }
});