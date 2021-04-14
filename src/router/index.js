import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import store from "../store";
import Todo from "../views/Todo.vue"

const routes = [
  {
    path: "/",
    name: "Todo",
    meta: { requiresAuth: true },
    component: Todo
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
    path: "/createnote",
    name: "createNote",
    meta: { requiresAuth: true },
    component: () => import("../components/notes/dialogs/CreateNote.vue"),
  },
  {
    path: "/editnote/:id",
    props:true,
    name: "EditNote",
    meta: { requiresAuth: true },
    component: () => import("../components/notes/dialogs/UpdateNote.vue"),
  },
  {
    path: "/edit/:id",
    props:true,
    name: "Edit",
    meta: { requiresAuth: true },
    component: () => import("../components/todo/dialogs/UpdateTodo.vue"),
  },{
    path: "/create",
    name: "CreateTodo",
    meta: { requiresAuth: true },
    component: () => import("../components/todo/dialogs/CreateTodo.vue"),
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
    if (!store.getters.getUser) {
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
    if (store.state.authState) {
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
