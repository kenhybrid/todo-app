<template>
  <div>
    <Register />
    <v-btn router block text to="/login" class="bottom">
      <span>Login</span>
    </v-btn>
  </div>
</template>

<script>
import Register from "../components/auth/Register";
export default {
  components: {
    Register,
  },
};
</script>

<style>
.bottom {
  position: absolute !important;
  bottom: 15px !important;
}
</style>
