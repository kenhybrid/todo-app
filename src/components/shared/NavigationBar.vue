<template>
  <nav>
    <v-app-bar
      v-if="$route.name == 'Todo' || $route.name == 'Notes' "
      app
      elevation-0
      dark
      prominent
      elevate-on-scroll
      src="../../assets/wallpaper2.jpg"
      height="180"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.2), rgba(100,115,201,.5)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <Time/>

      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

    </v-app-bar>
    <!-- search bar -->
  
    <!-- side nav -->
    <v-navigation-drawer app v-model="drawer" color="white">
      <v-list class="top">
        <v-img src="../../assets/wallpaper1.jpg"> </v-img>
      </v-list>
      <!-- links -->
      <v-list class="top-2">
        <v-list-item
          v-for="link in links"
          :key="link.name"
          link
          router
          :to="link.link"
          active-class="primary--text"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link active-class="primary--text" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Time from "./Time"
export default {
  components:{
    Time
  },
  data() {
    return {
      drawer: false,
      search: false,
      //   links
      links: [
        { name: "Todos", link: "/", icon: "mdi-pencil-outline" },
        { name: "Notes", link: "/notes", icon: "mdi-book-outline" },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logOutUser");
    },
  },
};
</script>
<style>
.top {
  margin-top: -8px !important;
}

.top-2 {
  margin-top: -16px !important;
}
</style>
