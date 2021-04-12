<template>
  <div>
    <v-btn fab fixed bottom right class="primary" @click="dialog = true">
      <v-icon small>
        mdi-plus
      </v-icon>
    </v-btn>
    <v-dialog
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
      v-model="dialog"
      max-width="500px"
    >
      <v-card tile class="pa-3">
        <v-app-bar elevation="0" color="white">
          <v-btn icon dark @click="dialog = false">
            <v-icon color="primary">mdi-arrow-left</v-icon>
          </v-btn>
          <v-subheader class="center">CREATE A TASK</v-subheader>

          <v-spacer></v-spacer>
          <v-btn dark text icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
        </v-app-bar>
        <v-form class="py-5 px-2">
          <v-text-field
            label="Add a Task"
            v-model="content"
            outlined
            clearable
            prepend-inner-icon="mdi-pencil-outline"
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
              <v-btn text color="primary" @click="modal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">
                OK
              </v-btn>
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
            <v-icon small>mdi-content-save-outline</v-icon>
          </v-btn>
          <!-- <v-btn block color="primary" dark @click="addTodo">Add Todo</v-btn> -->
        </v-form>
      </v-card>
    </v-dialog>
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
      dialog: false,
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
      if (
        this.content != null &&
        this.priority != null &&
        this.dueDate != null
      ) {
        this.$store
          .dispatch("createTodo", {
            content: this.content,
            dueDate: this.dueDate,
            createdAt: this.createdAt,
            done: this.done,
            priority: this.priority,
          })
          .then(() => {
            this.dialog = false;
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
