<template>
  <div>
    <v-container grid-list-xs class="mb-5 pb-5">
      <div v-if="todos.length > 0" class="mb-5 pb-5">
        <!-- <v-divider></v-divider> -->
        <v-list
          :class="'border-list ' + n.priority"
          subheader
          two-line
          link
          v-for="n in todos"
          :key="n.id"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-checkbox
                @click="updateStatus(n)"
                :input-value="n.done"
              ></v-checkbox>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ n.content }} .</v-list-item-title>
              <small
                ><b>{{ n.createdAt | dateFilter }}</b></small
              >
            </v-list-item-content>
            <v-list-item-action v-if="n.done">
              <v-icon color="primary">mdi-check-all</v-icon>
            </v-list-item-action>
            <!--suplimentary action  -->
            <v-list-item-action>
              <!-- menu -->
              <v-menu bottom close-on-click offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon large dark v-bind="attrs" v-on="on">
                    <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <!-- view todo -->
                <v-list dense>
                  <v-list-item link @click="viewTodo(n)">
                    <v-list-item-icon>
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>View</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- view todo  end-->

                  <!-- update -->
                  <v-list-item link router :to="'/edit/' + n.id">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- update end -->
                  <!-- schedule todo -->
                  <v-list-item link @click="setReminder(n)">
                    <v-list-item-icon>
                      <v-icon>mdi-bell-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Reminder</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <!-- schedule todo -->
                  <v-list-item link :to="'/share/' + n.id">
                    <v-list-item-icon>
                      <v-icon>mdi-share-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>Share</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- delete todo -->

                  <DeleteTodo :id="n.id" />
                  <!-- delete todo end -->
                </v-list>
              </v-menu>
              <!-- menu -->
            </v-list-item-action>
          </v-list-item>
          <!-- <v-divider></v-divider> -->
        </v-list>
        <!-- <div class="mb-5 pb-5"></div> -->
      </div>
      <div v-else class="notodos">
        <center>
          <v-icon x-large>mdi-calendar-blank</v-icon>
          <br />
          <br />
          there are no todos
        </center>
      </div>
    </v-container>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
      <v-card tile  :class="'pa-3 ' + todo.priority" >
        <!-- :class="'pa-3 ' + todo.priority" -->
        <v-card-text>
          {{ todo.content }}
          <br />
          <br />
        </v-card-text>
        <v-card-actions class="">
          <v-icon small class="pr-3">mdi-clock-outline</v-icon>
          <small
            ><b>{{ todo.dueDate | filterDue }} </b></small
          >
          <v-spacer></v-spacer>
          <small v-if="todo.done">status <b>done</b></small>
          <small v-else>status <b>ongoing</b></small>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="reminder"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card tile  :class="'pa-3 ' + todo.priority" >
        <v-card-text>
          <center class="my-5">
            <v-icon x-large>mdi-bell-ring-outline</v-icon>
            <br /><br />
            <span>Coming soon</span>
          </center>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  formatRelative,
  formatDistanceToNowStrict,
  differenceInHours,
} from "date-fns";
import DeleteTodo from "./dialogs/DeleteTodo";
export default {
  components: {
    DeleteTodo,
    // UpdateTodo,
  },
  data() {
    return {
      show: true,
      todo: {},
      closeOnClick: true,
      dialog: false,
      reminder: false,
      componentreload: 0,
    };
  },
  computed: {
    todos() {
      return this.$store.getters.getAllTodos;
    },
  },
  methods: {
    viewTodo(n) {
      this.todo = n;
      this.dialog = true;
    },
    setReminder(n) {
      this.todo = n;
      this.reminder = true;
    },

    updateStatus(status) {
      // console.log(status);
      if (status == true) {
        const done = false;
        this.$store.dispatch("doneTodo", { id: status.id, done: done });
      } else {
        const done = true;
        this.$store.dispatch("doneTodo", { id: status.id, done: done });
      }
    },
  },
  filters: {
    filterDue(value) {
      // const days = differenceInDays(new Date(), new Date(value));
      const hours = differenceInHours(new Date(value), new Date());
      if (hours < 0) {
        return "Overdue";
      } else if (hours > 0 && hours < 23) {
        const val = Math.abs(hours);
        return "Due in " + val + " hours";
      } else {
        const days = hours / 24;
        const val = Math.round(days);
        return "Due in " + val + " days";
      }
    },
    dateFilter(value) {
      const days = new Date().getDay() - new Date(value).getDay();
      if (days > 6) {
        return formatDistanceToNowStrict(new Date(value)) + " ago";
      } else {
        return formatRelative(new Date(value), new Date());
      }
    },
  },
};
</script>

<style scoped>
.Medium {
  border-left: 5px #f39108 solid !important;
}
.Low {
  border-left: 5px #f5e56a solid !important;
}
.High {
  border-left: 5px #ee4e39 solid !important;
}

.notodos {
  margin-top: 130px;
  margin-bottom: 150px;
}
.border-list {
  margin-top: 2px;
  /* margin-bottom: 2px; */
}
</style>
