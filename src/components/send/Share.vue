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
      <v-list
        :class="'border-list ' + n.priority"
        subheader
        link
        v-for="n in 5"
        :key="n.idex"
      >
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar size="42" color="primary" class=" ">
              <b class="white--text headline">T</b>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Username</v-list-item-title>
            <small><b>email</b></small>
          </v-list-item-content>

          <v-list-item-action>
            <v-checkbox
              v-model="checked"
              type="checkbox"
              :value="n.index"
              @change="selectUser"
            ></v-checkbox>
          </v-list-item-action>
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
  methods: {
    selectUser() {
      console.log(this.checked);
    },
  },
};
</script>
