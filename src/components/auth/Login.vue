<template>
  <div>
    <v-container grid-list-xs class="pa-5">
      <v-layout row wrap>
        <v-flex sm8 offset-sm2>
          <v-form @submit.prevent="" class="form">
            <img src="../../assets/fingerprint.jpg" class="avatar" alt="" />
            <v-subheader class="center">LOGIN</v-subheader>
            <v-text-field
              :rules="[rules.required, rules.min]"
              label="Email"
              prepend-inner-icon="mdi-email-outline"
              color="grey"
              v-model="email"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.min]"
              prepend-inner-icon="mdi-key-outline"
              label="Password"
              v-model="password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
            <v-btn
              class="primary mt-5"
              block
              large
              @click="login"
              :loading="loading"
            >
              <span left class="white--text">LOGIN</span>
              <v-icon small right color="white">mdi-lock-outline</v-icon>
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      show: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        // emailMatch: () => ('The email and password you entered don\'t match'),
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    login() {
      this.$store.dispatch("userSignIn", {
        password: this.password,
        email: this.email,
      });
    },
  },
};
</script>

<style scoped>
.link {
  color: #6c63ff !important;
  text-decoration: none;
}
.center {
  margin: 0;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.my-purple {
  background-color: #6c63ff !important;
}
.my-purple-text {
  color: #6c63ff !important;
}
.avatar {
  width: 80px;
  display: block;
  border-radius: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
.form {
  margin-top: 80px;
  margin-bottom: 100px;
}
</style>
