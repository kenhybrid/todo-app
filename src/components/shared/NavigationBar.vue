<template>
  <nav>
    <v-app-bar
      v-if="$route.name == 'Todo' || $route.name == 'Notes'"
      app
      elevation-0
      dark
      prominent
      fixed
      elevate-on-scroll
      src="../../assets/navpic.jpg"
      height="180"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.2), rgba(100,115,201,.5)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon
        v-if="!search"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>
        <Time v-if="!search" />
      </v-app-bar-title>
      <v-container grid-list-xs>
        <v-text-field
          v-if="search"
          outlined
          autocomplete="off"
          @click:append="close"
          class="mt-1"
          append-icon="mdi-close"
          v-model="searchTerm"
          @keyup="SearchTodos"
          name="name"
          label="search"
          id="id"
        ></v-text-field>
      </v-container>

      <v-spacer></v-spacer>
      <div>
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="yellow" icon @click="darkMode">
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode On</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" icon @click="darkMode">
              <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode Off</span>
        </v-tooltip>
      </div>
      <v-btn icon v-if="!search" @click="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- search bar -->
    <!-- <v-list class="top">
        <v-img src="../../assets/wallpaper1.jpg"> </v-img>
      </v-list> -->
    <!-- side nav -->
    <v-navigation-drawer app v-model="drawer" color="dark">
      <v-list class="primary" height="180px">
        <div class="bottom ">
          <v-avatar size="56" color="white" class=" ma-1">
            <b>
              <span class="black--text headline">{{
                user.slice(0, 1).toUpperCase()
              }}</span>
            </b>
          </v-avatar>
          <br />
          <small>
            <b class="dark--text">
              {{ user }}
            </b>
          </small>
        </div>
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
          class="primary--text"
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
import Time from "./Time";
export default {
  components: {
    Time,
  },
  data() {
    return {
      drawer: false,
      search: false,
      searchTerm: "",
      //   links
      links: [
        { name: "Todos", link: "/", icon: "mdi-format-list-checks" },
        { name: "Notes", link: "/notes", icon: "mdi-book-outline" },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    SearchTodos() {
      if (this.searchTerm != "") {
        this.$store.commit("searchTodos", this.searchTerm);
      } else {
        this.$store.dispatch("getAllTodos");
      }
    },
    logout() {
      this.$store.dispatch("logOutUser");
    },
    close() {
      this.search = false;
      this.searchTerm = "";
      this.$store.dispatch("getAllTodos");
    },
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
};
</script>
<style scoped>
.top {
  margin-top: -8px !important;
}

.top-2 {
  margin-top: -8px !important;
}
.bottom {
  top: 80px;
  padding: 5px;
  position: absolute;
}
</style>
