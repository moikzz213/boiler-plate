<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="36" icon variant="flat" :color="iconProps.color">
        {{ printInitials(authStore.authProfile.display_name) }}
      </v-btn>
    </template>
    <v-card min-width="300" class="rounded-lg mt-1">
      <div class="d-flex align-center pa-3">
        <v-avatar
          color="grey-lighten-3"
          :size="36"
          class="d-flex align-center justify-center mr-3"
          style="cursor: pointer"
        >
          <div class="text-body-2">
            {{ printInitials(authStore.authProfile.display_name) }}
          </div>
        </v-avatar>
        <div>
          <div class="text-body-1">{{ authStore.authProfile.display_name }}</div>
          <div class="text-caption">{{ authStore.authProfile.email }}</div>
        </div>
      </div>
      <v-divider></v-divider>
      <v-list nav density="compact" class="d-flex flex-column">
        <v-list-item
          :prepend-icon="mdiAccount"
          title="Account Settings"
          @click="() => openPage('/account')"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="pa-3">
        <v-btn :loading="loadingLogout" @click="logout" width="100%" color="primary">
          Logout
        </v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { printInitials } from "@/composables/printInitials";
import { authApi } from "@/services/sacntumApi";
import { mdiAccount } from "@mdi/js";
const iconProps = defineProps({
  color: {
    type: String,
    default: "grey-darken-3",
  },
});
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

// logout
const loadingLogout = ref(false);
// remove client key
const removeClientKey = async () => {
  let data = {
    key: authStore.token,
  };
  await axios.post("/client/removekey", data).then(() => {
    authStore.logout().then(() => {
      loadingLogout.value = false;
      router.push({ path: "/login" });
      localStorage.removeItem("authClient");
    });
  });
};
// auth logout to sanctum
const authlogout = async () => {
  let data = {
    username: authStore.profile.ecode,
  };
  const response = await authApi.post("/api/sanctumlogout", data);
  return response;
};
const logout = async () => {
  loadingLogout.value = true;
  authlogout()
    .then(() => {
      
      removeClientKey().then(() => {
        
      });
    })
    .catch((err) => {
      loadingLogout.value = false;
     
      console.log("error while trying to logout to server", err);
    });
};
</script>
