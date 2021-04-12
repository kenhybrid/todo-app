import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { auth } from "../plugins/firebase";
// import store from "../store"

const routes = [
  {
    path: "/",
    name: "Todo",
    meta: { requiresAuth: true },
    component: () => import("../views/Todo.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresGuest: true },

    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresGuest: true },

    component: () => import("../views/Register.vue"),
  },
  {
    path: "/notes",
    name: "Notes",
    meta: { requiresAuth: true },
    component: () => import("../views/Notes.vue"),
  },
  {
    path: "/edit/:id",
    props:true,
    name: "Edit",
    meta: { requiresAuth: true },
    component: () => import("../components/todo/dialogs/UpdateTodo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //check for requiresauthguard
    if (!auth.currentUser) {
      //go to login
      next({
        path: "/login",
        query: {
          redirect: to.fullpath,
        },
      });
    } else {
      //proced to route
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    //if logged in
    if (auth.currentUser) {
      //go to login
      next({
        path: "/",
        query: {
          redirect: to.fullpath,
        },
      });
    } else {
      //proced to route
      next();
    }
  } else {
    //proced to route
    next();
  }
});

export default router;
