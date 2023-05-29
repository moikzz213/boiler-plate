<template>
  <div>
    <Employee v-if="authStore.authIsLoggedIn == true" />
    <Public v-else />
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card class="w-100 d-flex align-center justify-center">
        <div>loading...</div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useSettingStore } from "@/stores/settings";
const Public = defineAsyncComponent(() => import("./portals/Public.vue"));
const Employee = defineAsyncComponent(() => import("./portals/Employee.vue"));
const authStore = useAuthStore();
const settingStore = useSettingStore();
const dialog = ref(settingStore.isLoading);
</script>
