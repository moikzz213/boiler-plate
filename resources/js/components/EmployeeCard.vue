<template>
  <div class="d-flex align-center">
    <v-avatar color="grey-lighten-1" size="55">
      <div class="text-primary" style="font-size: 24px; line-height: 24px">
        {{ printInitials(profileTest.full_name) }}
      </div>
    </v-avatar>
    <div class="pl-2">
      <div class="text-capitalize mb-1" style="font-size: 12px; line-height: 14px">
        {{ profileTest.full_name }}
        {{ profileTest.ecode ? " (" + profileTest.ecode + ")" : "" }}
      </div>
      <div style="font-size: 10px; line-height: 12px">
        {{ profileTest.designation }}
      </div>
      <div class="d-flex align-center">
        <v-icon size="16" color="success" :icon="mdiCircleMedium"></v-icon>
        <div style="font-size: 10px; line-height: 12px">
          {{ profileTest.status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { printInitials } from "@/composables/printInitials";
import { mdiCircleMedium } from "@mdi/js";
const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
});
const profileTest = ref({
  full_name: "Romel Indemne",
  designation: "Web Developer",
  ecode: "100264",
  status: "open",
});
</script>
