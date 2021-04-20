<template>
  <v-app>
    <Offline />

    <navigation-bar></navigation-bar>
    <v-main>
        <router-view></router-view>
    </v-main>

    <notification></notification>
  </v-app>
</template>

<script>
import NavigationBar from "./components/shared/NavigationBar";
import Notification from "./components/shared/Notification";
import Offline from "./components/shared/Offline";
export default {
  name: "App",
  components: {
    Offline,
    NavigationBar,
    Notification,
  },
};
</script>

<style scoped>
.bg {
  background-color: rgb(230, 224, 224) !important;
}
</style>
