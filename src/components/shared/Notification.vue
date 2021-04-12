<template>
  <div>
    <v-snackbar v-model="notification.snackbar" bottom timeout="3000">
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
  methods: {
    playSound() {
      // const audio = new Audio("../../assets/notification.mp3");
      // audio.play();

      // const sound =  new Audio( require('@/assets/notification.mp3') ).play();
      // sound()
    },
  },
  mounted() {
    // this.playSound()
  },
};
</script>

<style></style>
