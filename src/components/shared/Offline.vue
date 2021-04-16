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
      <v-spacer></v-spacer>
      <v-icon left small>mdi-wifi-strength-4</v-icon>
      <small>online</small>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-system-bar dark lights-out color="error" v-if="showOffline" app absolute>
      <v-spacer></v-spacer>
      <v-icon left small>mdi-wifi-off</v-icon>

      <small> offline</small>
      <v-spacer></v-spacer>
    </v-system-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    onLine: navigator.onLine,
    showBackOnline: false,
    showOffline: false,
    // online: true,
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
    // async checkOnlinestatus() {
    //   try {
    //     this.online = await fetch("/");
    //     return this.online.status >= 200 && this.online.status < 300;
    //   } catch (error) {
    //     return false;
    //   }
    // },
  },
  watch: {
    onLine(v) {
      if (v) {
        this.showOffline = false;

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
    // online(v) {
    //   console.log(v);
    //   if (v) {
    //     this.showOffline = false;

    //     this.showBackOnline = true;
    //     setTimeout(() => {
    //       this.showBackOnline = false;
    //     }, 5000);
    //   } else {
    //     this.showOffline = true;
    //     setTimeout(() => {
    //       this.showOffline = false;
    //     }, 5000);
    //   }
    // },
  },
  mounted() {
    // setInterval(() => {
    //   this.checkOnlinestatus();
    // }, 30000);
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
