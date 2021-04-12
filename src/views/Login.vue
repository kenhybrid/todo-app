<template>
  <div>
    <Login />

    <v-btn routrt block text  to="/register" class="bottom">
      <span>Register</span>
    </v-btn>
  </div>
</template>

<script>
import Login from "../components/auth/Login";
export default {
  name: "login",
  components: {
    Login,
  },
};
</script>

<style>
.bottom {
  position: absolute !important;
  bottom: 15px !important;
}
</style>