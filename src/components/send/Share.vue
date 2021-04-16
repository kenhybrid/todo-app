<template>
  <div>
    <v-app-bar elevation="0" class="dark">
      <v-btn icon dark @click="() => $router.go(-1)">
        <v-icon color="primary">mdi-arrow-left</v-icon>
      </v-btn>
      <v-text-field class="pt-5 mt-2" label="Search" autocomplete="off" dense outlined append-icon="mdi-magnify"></v-text-field>
    </v-app-bar>
    <v-btn fab fixed bottom right color="primary">
      <v-icon>mdi-share-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["id"],
};
</script>

<style></style>
