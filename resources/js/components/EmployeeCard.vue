<template>
  <div class="d-flex align-center">
    <v-avatar color="grey-lighten-1" size="55">
      <div class="text-primary" style="font-size: 20px; line-height: 20px">
        {{ printInitials(profileTest.display_name) }}
      </div>
    </v-avatar>
    <div class="pl-2">
      <div class="text-capitalize mb-1" style="font-size: 12px; line-height: 14px">
        {{ profileTest.display_name }}
        {{ profileTest.ecode ? " (" + profileTest.ecode + ")" : "" }}
      </div>
      <div style="font-size: 10px; line-height: 12px">
        {{ profileTest.designation }}
      </div>
      <div class="d-flex align-center">
        <v-icon size="16" color="success" :icon="mdiCircleMedium"></v-icon>
        <div style="font-size: 10px; line-height: 12px">
          {{ "open" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { printInitials } from "@/composables/printInitials";
import { mdiCircleMedium } from "@mdi/js";
const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
});

const profileTest = ref({
  display_name: "Steve Ayala",
  designation: "Sr. Full Stack Software Developer",
  ecode: "100194",
  status: "locked",
});
if (props.profile !== null) {
  profileTest.value = props.profile;
}
watch(
  () => props.profile,
  (newVal) => { 
    profileTest.value = newVal;
  }
);
</script>
