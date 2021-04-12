<template>
  <div>
    <small>{{ currentTime }}</small>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    return {
      message: "Current Time:",
      currentTime: null,
    };
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = format(new Date(), "PPpp");
    },
  },
  created() {
    this.currentTime = new Date();
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },
};
</script>

<style></style>
