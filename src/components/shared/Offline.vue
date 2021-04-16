<template>
  <div>
    <v-system-bar
      dark
      lights-out
      color="primary"
      v-if="showBackOnline"
      app
      absolute
    >
      <small> You are back Online</small>
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
    </v-system-bar>
    <v-system-bar dark lights-out color="error" v-if="showOffline" app absolute>
      <small> You are offline</small>
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-off</v-icon>
    </v-system-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    onLine: navigator.onLine,
    showBackOnline: false,
    showOffline: false,
  }),
  methods: {
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
    updateOfflineStatus(e) {
      const { type } = e;
      this.onLine = type === "offline";
    },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 5000);
      } else {
        this.showOffline = true;
        setTimeout(() => {
          this.showOffline = false;
        }, 5000);
      }
    },
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
};
</script>

<style>
.offline {
  background-color: #fc9842;
  background-image: linear-gradient(315deg, #fc9842 0%, #fe5f75 74%);
}
.online {
  background-color: #00b712;
  background-image: linear-gradient(315deg, #00b712 0%, #5aff15 74%);
}
</style>
