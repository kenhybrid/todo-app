<template>
  <div>
    <v-card tile flat class="pa-3">
      <v-app-bar elevation="0" color="white">
        <v-btn icon dark @click="() => $router.go(-1)">
          <v-icon color="primary">mdi-arrow-left</v-icon>
        </v-btn>
        <v-subheader class="center">UPDATE A TASK</v-subheader>

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
        <v-btn class="primary" fab bottom right fixed dark @click="editTodo">
          <v-icon small>mdi-content-save-outline</v-icon>
        </v-btn>
        <!-- <v-btn block color="primary" dark @click="addTodo">Add Todo</v-btn> -->
      </v-form>
    </v-card>
    <v-snackbar v-model="snackbar" bottom timeout="3000">
      <v-icon class="px-5" color="error">mdi-home</v-icon>
      Please fill in all fields!
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      items: ["High", "Medium", "Low"],
      modal: false,
      snackbar: false,
      date: "",
      dueDate: "",
      content: "",
      priority: "",
    };
  },
  computed: {
    getOneTodo() {
      return this.$store.getters.getOneTodo(this.id);
    },
  },
  methods: {
    editTodo() {
      
      if (this.content != null && this.priority != null && this.dueDate != null) {
        this.$store
        .dispatch("updateTodo", {
          id:this.id,
          content: this.content,
          dueDate: this.dueDate,
          priority: this.priority,
        })
      } else {
        this.snackbar = true;
        
      }
    },
  },
  created() {
    this.content = this.getOneTodo.content;
    this.priority = this.getOneTodo.priority;
    this.dueDate = this.getOneTodo.dueDate;
  },
};
</script>

<style></style>
