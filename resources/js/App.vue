<template>
  <div>
    <Admin v-if="authUser && authUser.role == 'admin'" />
    <Hr v-else-if="authUser && authUser.role == 'hr'" />
    <Manager v-else-if="authUser && authUser.team == 'manager'" />
    <Employee v-else-if="authUser && authUser.role == 'employee'" />
    <Public v-else />
  </div>
</template>
<script setup>
import { computed, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
const Public = defineAsyncComponent(() => import("./portals/Public.vue"));
const Admin = defineAsyncComponent(() => import("./portals/Admin.vue"));
const Employee = defineAsyncComponent(() => import("./portals/Employee.vue"));
const Manager = defineAsyncComponent(() => import("./portals/Manager.vue"));
const Hr = defineAsyncComponent(() => import("./portals/Hr.vue"));

// authenticated user object
const authStore = useAuthStore();
const authUser = computed(() => {
  return authStore.user;
});
</script>
