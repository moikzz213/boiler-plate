<template>
  <div>
    <Employee v-if="authStore.authIsLoggedIn == true" />
    <Public v-else />
    <v-dialog
      v-model="settingStore.pageLoading.status"
      fullscreen
      :scrim="false"
      transition="fade-transition"
      persistent
    >
      <v-card class="w-100 d-flex align-center justify-center">
        <v-progress-circular
          class="mb-3"
          indeterminate
          color="secondary"
        ></v-progress-circular>
        <div class="text-body-1">{{ settingStore.pageLoading.msg }}</div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useSettingStore } from "@/stores/settings";
const Public = defineAsyncComponent(() => import("./portals/Public.vue"));
const Employee = defineAsyncComponent(() => import("./portals/Employee.vue"));
const authStore = useAuthStore();
const settingStore = useSettingStore();
</script>
