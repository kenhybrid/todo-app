<template>
  <div>
    <v-app-bar elevation="0" color="dark" app>
      <v-btn icon dark @click="() => $router.go(-1)">
        <v-icon color="primary">mdi-arrow-left</v-icon>
      </v-btn>
      <v-subheader class="center">UPDATE A NOTE</v-subheader>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-card tile flat class="transparent" style="margin-bottom: 60px">
      <v-form @submit.prevent class="pa-4">
        <v-text-field
          label="Title"
          autocomplete="off"
          outlined
          clearable
          v-model="title"
        ></v-text-field>
        <vue-editor v-model="body" :editorToolbar="customToolbar"></vue-editor>
        <v-btn class="primary" fab bottom right fixed dark @click="updateNote">
          <v-icon>mdi-content-save-outline</v-icon>
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
  props: ["id"],
  components: {
    VueEditor,
  },
  data() {
    return {
      body: "",
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
  computed: {
    getOneNote() {
      return this.$store.getters.getOneNote(this.id);
    },
  },
  methods: {
    updateNote() {
      if (this.title != null && this.body != "") {
        this.$store
          .dispatch("updateNote", {
            title: this.title,
            body: this.body,
            id: this.id,
          })
          .then(() => {
            (this.title = ""), (this.body = "");
          });
      } else {
        this.snackbar = true;
      }
    },
  },
  created() {
    this.title = this.getOneNote.title;
    this.body = this.getOneNote.body;
  },
};
</script>

<style></style>
