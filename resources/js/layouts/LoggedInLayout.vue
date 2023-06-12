<template>
  <div>
    <v-navigation-drawer
      :rail="temporary == true ? false : rail"
      v-model="drawer"
      :temporary="temporary"
      :permanent="!temporary"
      class="pt-4"
      color="primary"
    >
      <div class="d-flex flex-column h-100">
        <v-list-item nav :prepend-avatar="logo" class="mb-3">
          <div v-show="!rail" class="text-body-2" style="width: 180px">{{ appName }}</div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav>
          <div v-for="item in sideNavigation" :key="item.title" :value="item.title">
            <div v-if="hasAccess(item.roles) == true">
              <v-list-group v-if="item.subs" :value="item.title">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    nav
                    v-bind="props"
                    :prepend-icon="item.icon"
                    :title="item.title"
                  ></v-list-item>
                </template>
                <div class="bg-grey-darken-4" style="border-radius: 4px">
                  <v-list-item
                    density="compact"
                    style="padding-left: 12px !important"
                    v-for="(sub, i) in item.subs"
                    :key="i"
                    :title="sub.title"
                    :value="sub.title"
                    @click="() => openPage(sub.path)"
                  >
                    <template v-slot:title>
                      <div style="font-size: 12px">{{ sub.title }}</div>
                    </template>
                    <template v-slot:prepend>
                      <v-icon size="16" :icon="sub.icon"></v-icon>
                    </template>
                  </v-list-item>
                </div>
              </v-list-group>
              <v-list-item
                v-else
                :prepend-icon="item.icon"
                :title="item.title"
                :value="item.title"
                @click="() => openPage(item.path)"
              ></v-list-item>
            </div>
          </div>
        </v-list>
        <v-divider></v-divider>
        <v-list nav class="mt-auto">
          <v-list-item
            :prepend-icon="rail == false ? mdiChevronLeft : mdiChevronRight"
            title="Collapse"
            @click="rail = !rail"
          ></v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      v-if="profileHeaderList.includes(route.name)"
      height="100"
      color="black"
      elevation="0"
      style="overflow: visible"
    >
      <div class="d-flex align-start py-3 px-3 w-100 h-100">
        <div class="d-flex" style="position: relative">
          <v-app-bar-nav-icon
            v-if="mobile == true"
            @click="drawer = !drawer"
            size="small"
          ></v-app-bar-nav-icon>
          <div class="pms-avatar-wrapper">
            <div class="d-flex align-start">
              <v-avatar color="grey-lighten-1" size="90">
                <div class="text-h4 text-primary">
                  {{ printInitials(authStore.authProfile.display_name) }}
                </div>
              </v-avatar>
              <div
                class="pl-3 pt-2"
                style="
                  height: 56px;
                  overflow: hidden;
                  min-width: 600px;
                  max-width: 600px;
                  width: 100%;
                "
              >
                <div class="text-body-2 text-capitalize">
                  {{ authStore.authProfile.display_name }}
                  {{
                    authStore.authProfile.ecode ? " - " + authStore.authProfile.ecode : ""
                  }}
                </div>
                <div class="text-caption">{{ authStore.authProfile.email }}</div>
              </div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex">
          <v-btn size="36" class="mx-2" color="grey-darken-3" icon variant="flat">
            <v-icon color="white" size="small" :icon="mdiBellOutline"></v-icon>
          </v-btn>
          <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn size="36" color="grey-darken-3" icon variant="flat">
                <v-avatar
                  color="grey-darken-3"
                  :size="36"
                  class="d-flex align-center justify-center"
                  v-bind="props"
                  style="cursor: pointer"
                >
                  <div class="text-white text-body-2">
                    {{ printInitials(authStore.authProfile.display_name) }}
                  </div>
                </v-avatar>
              </v-btn>
            </template>
            <v-card min-width="300" class="rounded-lg mt-1">
              <div class="d-flex align-center pa-3">
                <v-avatar
                  color="grey-lighten-3"
                  :size="36"
                  class="d-flex align-center justify-center mr-3 text-body-2"
                  style="cursor: pointer"
                >
                  <div>{{ printInitials(authStore.authProfile.display_name) }}</div>
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
                <v-btn
                  :loading="loadingLogout"
                  @click="logout"
                  width="100%"
                  color="primary"
                >
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
    <v-app-bar v-else density="compact" color="white" elevation="0">
      <template v-slot:prepend>
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            v-if="mobile == true"
            @click="drawer = !drawer"
            size="small"
          ></v-app-bar-nav-icon>
          <div class="ml-1 text-body-1 text-primary">
            {{ appName }}
          </div>
        </div>
      </template>
      <v-spacer></v-spacer>
      <v-btn size="36" class="mx-2" icon variant="flat">
        <v-icon color="grey-darken-1" :icon="mdiBellOutline"></v-icon>
      </v-btn>
      <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-avatar
            color="grey-lighten-3"
            :size="36"
            class="d-flex align-center justify-center mr-3"
            v-bind="props"
            style="cursor: pointer"
          >
            <div class="text-body-2">
              {{ printInitials(authStore.authProfile.display_name) }}
            </div>
          </v-avatar>
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
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiHomeOutline,
  mdiBellOutline,
  mdiAccount,
  mdiChartTimelineVariant,
  mdiCog,
  mdiAccountGroup,
  mdiAccountSupervisor,
  mdiCogOutline,
  mdiFormatListBulleted,
  mdiDomain,
  mdiPercent,
  mdiAccountCog,
  mdiOfficeBuilding,
  mdiClipboardEditOutline
} from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
import { printInitials } from "@/composables/printInitials";
import { useRouter, useRoute } from "vue-router";
import { authApi } from "@/services/sacntumApi";
import { useSettingStore } from "@/stores/settings";

const settingStore = useSettingStore();
const appName = ref(import.meta.env.VITE_APP_NAME);
// const appName = "Ghassan Aboud Group";
const logo = ref(import.meta.env.VITE_APP_URL + "/assets/images/fav.png");

// profile header
const profileHeaderList = ref([
  "Dashboard",
  "Account",
  "Teams",
  "ManagerCustomKPI",
  "PaginatedManagerCustomKPI",
  "Employees",
  "PaginatedEmployees",
  "SingleEmployee",
]);

// navigation
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const sideNavigation = ref([
  {
    title: "Dashboard",
    icon: mdiHomeOutline,
    roles: ["app_admin", "normal", "manager", "hr_admin", "hrbp"],
    path: "/dashboard",
  },
  {
    title: "Teams",
    icon: mdiAccountSupervisor,
    roles: ["app_admin", "manager"],
    path: "/manager/teams",
  },
  {
    title: "My Custom KPI",
    icon: mdiChartTimelineVariant,
    roles: ["app_admin", "manager"],
    path: "/manager/custom-kpi",
  },
  {
    title: "Employees",
    icon: mdiAccountGroup,
    roles: ["app_admin", "hr_admin", "hrbp"],
    path: "/hr/employees",
  },
  {
    title: "Settings",
    icon: mdiCog,
    roles: ["app_admin", "hr_admin"],
    path: "",
    subs: [
      {
        title: "PMS Settings",
        icon: mdiCogOutline,
        path: "/hr/settings/pms",
      },
      {
        title: "Custom KPIs",
        icon: mdiChartTimelineVariant,
        path: "/hr/kpi/custom",
      },
      {
        title: "KPIs",
        icon: mdiFormatListBulleted,
        path: "/hr/kpi/master",
      },
      {
        title: "Industries",
        icon: mdiDomain,
        path: "/hr/industries",
      },
      {
        title: "Companies",
        icon: mdiOfficeBuilding,
        path: "/hr/companies",
      },
      {
        title: "Measures",
        icon: mdiClipboardEditOutline,
        path: "/hr/measures",
      },
      {
        title: "Weightage",
        icon: mdiPercent,
        path: "/hr/weightages",
      },
    ],
  },
  {
    title: "User Settings",
    icon: mdiAccountCog,
    path: "/admin/users",
    roles: ["app_admin"],
  },
]);
const hasAccess = (rolesArray) => {
  let filteredRoles = [];
  filteredRoles = rolesArray.filter((r) => authStore.authRole.includes(r));
  return filteredRoles.length > 0 ? true : false;
};
const openPage = (openPath) => {
  menu.value = false;
  router
    .push({
      path: openPath,
    })
    .catch((err) => {});
};

// app orientation
const { mobile } = useDisplay();
const menu = ref(false);
const rail = ref(true);
const drawer = ref(true);
const temporary = ref(false);
watch(mobile, async (newMobileValue, oldMobileValue) => {
  if (newMobileValue == true) {
    drawer.value = false;
    temporary.value = true;
  } else {
    drawer.value = true;
    temporary.value = false;
  }
});
onMounted(() => {
  if (mobile.value == true) {
    drawer.value = false;
    temporary.value = true;
  } else {
    drawer.value = true;
    temporary.value = false;
  }
});

// logout
const loadingLogout = ref(false);
const logout = async () => {
  loadingLogout.value = true;
  authlogout()
    .then(() => {
      settingStore.setPageLoading(true, "logging out");
      removeClientKey().then(() => {
        settingStore.setPageLoading(false, "logging out");
      });
    })
    .catch((err) => {
      loadingLogout.value = false;
      settingStore.setPageLoading(false, "logging out");
      console.log("error while trying to logout to server", err);
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
</script>

<style scoped>
.pms-avatar-wrapper {
  position: absolute;
  z-index: 100;
  bottom: auto;
  left: 15px;
  top: calc(30px);
  right: auto;
}
</style>
