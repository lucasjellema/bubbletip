
<template>
  <div>
    <slot v-if="!error" />
    <div v-else class="error">An error occurred: {{ error.message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null
    };
  },
  errorCaptured(err, vm, info) {
    console.error('ErrorCaptured:', err, vm, info);
    this.error = err;
    return false; // Return false to stop the error from propagating further
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
