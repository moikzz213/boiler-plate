<template>
  <div>
    <Employee v-if="authStore.authIsLoggedIn == true" />
    <Public v-else /> 
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
const Public = defineAsyncComponent(() => import("./portals/Public.vue"));
const Employee = defineAsyncComponent(() => import("./portals/Employee.vue"));
const authStore = useAuthStore();
</script>
