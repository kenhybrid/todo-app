<template>
  <div>
   <note-listing></note-listing>
    <v-btn fab fixed bottom right class="primary" router to="/createnote">
      <v-icon small>
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import NoteListing from "../components/notes/NoteListing"
export default {
  name: "Notes",
  components:{
    NoteListing
  },
  created() {
    this.$store.dispatch("getAllNotes");
  },
};
</script>

<style>

</style>
