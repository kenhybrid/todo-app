<template>
  <div>
    <v-app-bar elevation="0" class="dark" app>
      <v-btn icon dark @click="() => $router.go(-1)">
        <v-icon color="primary">mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field
        class="pt-5 mt-2"
        outlined
        label="Search"
        autocomplete="off"
        dense
        append-icon="mdi-magnify"
      ></v-text-field>
    </v-app-bar>
    <v-container grid-list-xs>
      <v-list class="border-list" v-for="n in users" :key="n.id" subheader link>
        <v-divider></v-divider>
        <v-list-item @click="choseUser(n)">
          <v-list-item-avatar>
            <v-avatar size="42" color="primary" class="">
              <b class="white--text headline text-capitalize">{{
                n.email.slice(0, 1).toUpperCase()
              }}</b>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize">{{
              n.username
            }}</v-list-item-title>
            <small
              ><b>{{ n.email }}</b></small
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-container>
    <v-btn fab fixed bottom right color="primary">
      <v-icon>mdi-share-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: [],
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
  },
  methods: {
    choseUser(n) {
      console.log(n.author);
    },
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
};
</script>
<style>
.border-list {
  margin-top: 2px;
  /* margin-bottom: 2px; */
}
</style>
