<template>
  <div>
    <!-- todo listing -->
    <todo-listing></todo-listing>
    <!-- todolisting -->
    <create-todo></create-todo>
  </div>
</template>

<script>
import TodoListing from "../components/todo/TodoListing.vue";
import CreateTodo from "../components/todo/dialogs/CreateTodo.vue";
export default {
  components: { TodoListing, CreateTodo },
  created() {
    this.$store.dispatch("getAllTodos");
  },
};
</script>

<style></style>
