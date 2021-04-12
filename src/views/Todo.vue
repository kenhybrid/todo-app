<template>
  <div>
    <!-- todo listing -->
    <todo-listing></todo-listing>
    <!-- todolisting -->
    <v-btn fab fixed bottom right class="primary" router to="/create">
      <v-icon small>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import TodoListing from "../components/todo/TodoListing.vue";
export default {
  components: { TodoListing },
  created() {
    this.$store.dispatch("getAllTodos");
  },
};
</script>

<style></style>
