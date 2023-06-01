<template>
  <div
    v-if="loader.status"
    class="w-100 bg-grey-lighten-4 d-flex align-center justify-center"
    :style="`min-height: ${loader.height}`"
  >
    <v-progress-circular indeterminate :color="loader.color"></v-progress-circular>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  options: {
    type: Object,
    default: null,
  },
});
const loader = ref({
  status: false,
  color: "primary",
  height: "480px",
  text: "",
});
watch(
  () => props.options,
  (newVal) => {
    loader.value = { ...loader.value, ...newVal };
  }
);
</script>
