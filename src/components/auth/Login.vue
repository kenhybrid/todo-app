<template>
  <div>
    <v-container grid-list-xs class="pa-5">
      <v-layout row wrap>
        <v-flex sm8 offset-sm2>
          <v-form @submit.prevent="" class="form">
            <img src="../../assets/finger.svg" class="avatar" alt="" />
            <v-subheader class="center">LOGIN</v-subheader>
            <v-text-field
              label="email"
              prepend-inner-icon="mdi-email-outline"
              color="grey"
              v-model="email"
            ></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              color="grey"
              label="password"
              required
              prepend-inner-icon="mdi-eye-outline"
            ></v-text-field>
            <v-btn
              class="my-purple mt-5"
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
