<template>
  <div>
    <v-snackbar v-model="notification.snackbar" bottom timeout="2000">
      <v-icon class="px-5" color="error">{{ notification.icon }}</v-icon>
      {{ notification.message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.getters.getNotification;
    },
  },

};
</script>

<style></style>
