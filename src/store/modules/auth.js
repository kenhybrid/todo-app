import { auth } from "../../plugins/firebase";
import router from "../../router";

const state = {
	// auth state
	user: "",
	// member:false,
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
};

const mutations = {
	// TOOGLE_AUTH(state,payload){
	// 	state.member = payload
	// },
	//set notification
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
		auth
			.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(() => {
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
				commit("SET_NOTIFICATION", {
					snackbar: true,
					message: "Registration failed!",
					icon: "mdi-alert-outline",
				});
			});
	},
	userSignIn({ commit }, payload) {
		auth
			.signInWithEmailAndPassword(payload.email, payload.password)
			.then((user) => {
				commit("SET_USER", user.user.email);
				// redirect
				router.push("/");
			})
			.catch(() => {
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
			window.localStorage.removeItem('vuex');

		});
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
