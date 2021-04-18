<template>
  <div>
    <v-container grid-list-xs class="mb-5 pb-5">
      <div v-if="notes.length > 0" class="mb-5 pb-5">
        <!-- <v-divider></v-divider> -->
        <!-- :disabled="disabledrag"
          :options="{ disabled: disableDraggable }" -->
        <draggable
          v-model="notes"
          :scroll-sensitivity="200"
          :force-fallback="true"
          :disabled="disabledrag"
        >
          <v-list
            class="border-list"
            subheader
            link
            v-for="(n, index) in notes"
            :key="n.id"
          >
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="48">
                  <span class="primary--text">{{ 1 + index }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content @dblclick="viewNote(n)">
                <v-list-item-title>{{ n.title }} .</v-list-item-title>
                <!-- <v-list-tile-sub-title>subTitle</v-list-tile-sub-title> -->
                <small
                  ><b>{{ n.createdAt | dateFilter }}</b></small
                >
              </v-list-item-content>

              <!--suplimentary action  -->
              <v-list-item-action>
                <!-- menu -->
                <v-btn icon @click="disabledrag = true" v-if="disabledrag == false">
                  <v-icon>mdi-drag</v-icon>
                </v-btn>
                <v-menu bottom close-on-click offset-x v-else>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon dark v-bind="attrs" v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <!-- view todo -->

                  <v-list dense>
                    <v-list-item link router :to="'/editNote/' + n.id">
                      <v-list-item-icon>
                        <v-icon>mdi-pencil-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item link @click="disablesort">
                      <v-list-item-icon>
                        <v-icon>mdi-sort</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>sort</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- view todo  end-->

                    <v-list-item link :to="'/share/' + n.id">
                      <v-list-item-icon>
                        <v-icon>mdi-share-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>Share</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <!-- delete todo -->
                    <!-- update -->

                    <DeleteNote :id="n.id" />
                    <!-- delete todo end -->
                  </v-list>
                </v-menu>
                <!-- menu -->
              </v-list-item-action>
            </v-list-item>
            <!-- <v-divider></v-divider> -->
          </v-list>
        </draggable>

        <v-divider></v-divider>
      </div>
      <div v-else class="notodos">
        <center>
          <v-icon x-large>mdi-book-outline</v-icon>
          <br />
          <br />
          No notes yet!
        </center>
      </div>
    </v-container>
    <!-- full screen dialog -->
    <!-- dragable -->

    <!-- dragable -->
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
      :overlay="false"
    >
      <v-card flat tile>
        <v-app-bar dense elevation="0" color="dark">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon color="primary">mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-card-text>
          <v-subheader class="text-capitalize">{{ note.title }}</v-subheader>
          <div v-html="note.body"></div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- full screen dialog -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { formatRelative, formatDistanceToNowStrict, differenceInHours } from "date-fns";
import DeleteNote from "./dialogs/DeleteNote";
export default {
  components: {
    DeleteNote,
    draggable,
  },
  data() {
    return {
      dialog: false,
      note: {},
      disabledrag: true,
    };
  },
  methods: {
    viewNote(n) {
      this.dialog = true;
      this.note = n;
    },
    disablesort() {
      this.disabledrag = false;
    },
  },
  computed: {
    // notes() {
    //   return this.$store.getters.getAllNotes;
    // },
    notes: {
      get() {
        return this.$store.getters.getAllNotes;
      },
      set(value) {
        this.$store.commit("updateList", value);
      },
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
.notodos {
  margin-top: 130px;
  margin-bottom: 150px;
}
.border-list {
  margin-top: 2px;
  /* margin-bottom: 2px; */
}
</style>
