<template>
  <div>
    <v-app-bar elevation="0" color="dark" app>
      <v-btn icon dark @click="() => $router.go(-1)">
        <v-icon color="primary">mdi-arrow-left</v-icon>
      </v-btn>
      <v-subheader class="center">CREATE A TASK</v-subheader>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-card tile flat class="transparent">
      <v-form class="py-5 pa-4">
        <v-text-field
          label="Add a Task"
          v-model="content"
          outlined
          clearable
          autocomplete="off"
          prepend-inner-icon="mdi-pencil-outline"
          hint="What do you want to do?"
        ></v-text-field>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dueDate"
              label="Duedate"
              prepend-inner-icon="mdi-calendar"
              readonly
              outlined
              clearable
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dueDate" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-select
          :items="items"
          v-model="priority"
          label="Priority"
          prepend-inner-icon="mdi-view-list-outline"
          outlined
        ></v-select>
        <v-btn class="primary" fab bottom right fixed dark @click="addTodo">
          <v-icon>mdi-content-save-outline</v-icon>
        </v-btn>
        <!-- <v-btn block color="primary" dark @click="addTodo">Add Todo</v-btn> -->
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" bottom timeout="3000">
      <v-icon class="px-5" color="error">mdi-alert</v-icon>
      Please fill in all fields!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ["High", "Medium", "Low"],
      modal: false,
      snackbar: false,
      date: "",
      dueDate: "",
      content: "",
      createdAt: new Date().toISOString(),
      done: false,
      priority: "",
    };
  },
  methods: {
    addTodo() {
      if (this.content != "" && this.priority != "" && this.dueDate != "") {
        this.$store
          .dispatch("createTodo", {
            content: this.content,
            dueDate: this.dueDate,
            createdAt: this.createdAt,
            done: this.done,
            priority: this.priority,
          })
          .then(() => {
            this.content = "";
            this.priority = "";
            this.dueDate = "";
          });
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style></style>
