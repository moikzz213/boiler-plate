<template>
  <v-dialog v-model="confirmOptions.dialog" width="100%" max-width="480" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="pa-3 pb-0">{{ confirmOptions.title }}</v-card-title>
      <v-card-text class="px-3">
        <div class="pb-3 text-grey">
          {{ confirmOptions.text }}
        </div>
        <div class="d-flex justify-end mt-5">
          <v-btn
            class="bg-grey-lighten-2 text-primary"
            variant="text"
            @click="confirmOptions.dialog = false"
            >Cancel</v-btn
          >
          <v-btn
            :color="confirmOptions.btnColor"
            class="ml-2"
            :loading="confirmOptions.loading"
            @click="confirm"
            >{{ confirmOptions.btnTitle }}</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  options: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["confirm"]);
const confirmOptions = ref({
  dialog: false,
  title: "Confirm",
  text: "Please confirm <action>",
  btnColor: "secondary",
  btnTitle: "Confirm",
  loading: false,
});
const confirm = () => {
  emit("confirm", true);
};
watch(
  () => props.options,
  (newVal) => {
    confirmOptions.value = Object.assign({}, newVal);
  }
);
</script>
