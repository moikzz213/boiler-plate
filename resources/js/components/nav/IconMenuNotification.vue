<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        size="36"
        class="mx-2"
        :color="iconProps.color == 'light' ? 'grey-lighten-3' : 'grey-darken-3'"
        icon
        variant="flat"
      >
        <v-icon
          :color="iconProps.color == 'light' ? 'primary' : 'white'"
          size="small"
          :icon="mdiBellOutline"
        ></v-icon>
      </v-btn>
    </template>
    <v-card min-width="300" class="rounded-lg mt-1">
      <div class="pa-3">Notifications</div>
      <v-divider></v-divider>
      <v-list nav density="compact" class="d-flex flex-column">
        <v-list-item
          v-for="item in notifications"
          :key="item.id"
          @click="() => openPage(item.path)"
        >
          <div>{{ item.title }}</div>
          <div class="text-caption text-grey-darken-1">{{ item.content }}</div>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { printInitials } from "@/composables/printInitials";
import { useSettingStore } from "@/stores/settings";
import { authApi } from "@/services/sacntumApi";
import { mdiAccount, mdiBellOutline } from "@mdi/js";
const settingStore = useSettingStore();
const iconProps = defineProps({
  color: {
    type: String,
    default: "dark",
  },
});
console.log("IconMenuNotification");
const authStore = useAuthStore();
const router = useRouter();
const menu = ref(false);
const openPage = (openPath) => {
  menu.value = false;
  router
    .push({
      path: openPath,
    })
    .catch((err) => {});
};

const notifications = ref([
  {
    id: 1,
    title: "PMS Notification",
    content: "KPI setting is now open. Please ensure to fill your team's KPI.",
    path: "/dashboard",
  },
  {
    id: 2,
    title: "PMS Notification",
    content: "KPI setting is now open. Please ensure to fill your team's KPI.",
    path: "/dashboard",
  },
  {
    id: 3,
    title: "KPI has been submitted",
    content: "KPI setting is now open. Please ensure to fill your team's KPI.",
    path: "/dashboard",
  },
]);
</script>
