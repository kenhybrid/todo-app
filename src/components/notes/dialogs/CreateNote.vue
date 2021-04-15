<template>
  <div>
    <v-card tile flat class="transparent">
      <v-app-bar elevation="0" class="dark">
        <v-btn icon dark @click="() => $router.go(-1)">
          <v-icon color="primary">mdi-arrow-left</v-icon>
        </v-btn>
        <v-subheader class="center">CREATE A NOTE</v-subheader>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-form @submit.prevent class="pa-4">
        <v-text-field label="Title" outlined v-model="title"></v-text-field>
        <vue-editor v-model="body" :editorToolbar="customToolbar"></vue-editor>
        <v-btn
          class="primary"
          fab
          bottom
          right
          fixed
          dark
          @click="addNote"
        >
          <v-icon small>mdi-content-save-outline</v-icon>
        </v-btn>
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" bottom timeout="3000">
      <v-icon class="px-5" color="error">mdi-alert</v-icon>
      Please fill in all fields!
    </v-snackbar>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      body: "Body",
      title: "",
      snackbar: false,
      createdAt: new Date().toISOString(),
      customToolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        // [{ size: ["small", false,] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "bullet" }],
        [{ color: [] }],
        [{ indent: "-1" }, { indent: "+1" }],
      ],
    };
  },
  methods: {
    addNote() {
      if (this.title != "" && this.body != "") {
        this.$store
          .dispatch("createNote", {
            title: this.title,
            body: this.body,
            createdAt: this.createdAt,
          })
          .then(() => {
            (this.title = ""), (this.body = "");
          });
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style></style>
