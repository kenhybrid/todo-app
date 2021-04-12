<template>
  <nav>
    <v-app-bar
      v-if="this.$route.name === 'Home'"
      app
      elevation-0
      dark
      prominent
      elevate-on-scroll
      src="../assets/wallpaper2.jpg"
      height="180"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.3), rgba(25,32,72,.3)"
        ></v-img>
      </template>
      <v-btn @click="drawer = !drawer" small fab class="transparent my-2">
        <v-icon color="black">mdi-menu</v-icon></v-btn
      >
      <v-toolbar-title>{{ date }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn fab class="transparent my-2" small to="/login">
        <v-icon color="black">mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" color="white" app temporary>
      <v-list class="top">
        <v-img src="../assets/wallpaper2.jpg"></v-img>
      </v-list>
      <v-list-item
        v-for="item in mobile"
        :key="item.title"
        link
        router
        :to="item.link"
        active-class="success--text"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    time() {
      const hour = new Date().getHours();
      if (hour == 0 && hour <= 12) {
        return "Morning";
      } else if (hour >= 12 && hour <= 17) {
        return "Afternoon";
      } else {
        return "Evening";
      }
    },
    date() {
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const seconds = new Date().getSeconds();
      const day = new Date().getDay();
      if (hours > 12) {
        
          const current = hours - 12;
          return day + " " + current + ":" + minutes + ":" + seconds + " PM";
      
      } else {
        return day + " " + hours + ":" + minutes + ":" + seconds;
      }
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
      this.drawer = false;
    },
  },
};
</script>

<style>
.top {
  margin-top: -8px !important;
}

.top2 {
  margin-top: -16px !important;
}
</style>
