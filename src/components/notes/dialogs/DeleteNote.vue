<template>
  <div>
    <v-list-item link @click.stop="dialog = true">
      <v-list-item-icon>
        <v-icon>mdi-delete-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content class="pr-5">
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-img src="../../../assets/delete.gif"></v-img>
        <v-card-actions>
          <v-btn color="primary darken-1" text @click="dialog = false">
            <span left>Close</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="deleteNote(id)">
            <span right>Delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteNote(id) {
      this.dialog = false;
      this.$store.dispatch("deleteNote", { id: id });
    },
  },
};
</script>

<style></style>
