<template>
  <GuestLayout>
    <div
      class="mx-auto px-3 text-center"
      style="z-index: 1; max-width: 400px; width: 100%; margin-top: 100px"
    >
      <WhiteLogo width="100%" />
      <div class="text-subtitle-1 text-white">{{ appName }}</div>
    </div>

    <v-card class="mt-8 pa-3 rounded-lg elevation-3" width="90%" max-width="450">
      <v-card-title class="px-5 pb-0 primary--text">Login</v-card-title>
      <v-card-text class="py-5">
        <v-form autocomplete="off" ref="form" @keydown.enter="login">
          <v-text-field
            v-model="credentials.login"
            variant="outlined"
            required
            class="border-radius"
            autocomplete="off"
            label="Username or Email"
          >
          </v-text-field>
          <v-text-field
            v-model="credentials.password"
            variant="outlined"
            required
            autocomplete="off"
            label="Password"
            type="password"
          >
          </v-text-field>
          <v-btn
            @click="login"
            width="100%"
            color="primary"
            height="55"
            large
            :loading="loadingLogin"
            >Login</v-btn
          >
          <div class="text-error mt-3">{{ hasError == true ? message : "" }}</div>
        </v-form>
      </v-card-text>
    </v-card>
  </GuestLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { authApi } from "@/services/sacntumApi";
import GuestLayout from "../layouts/GuestLayout.vue";
import WhiteLogo from "@/Components/logo/WhiteLogo.vue";
import { useSettingStore } from "@/stores/settings";

// router
const router = useRouter();

const settingStore = useSettingStore();
const appName = ref(import.meta.env.VITE_APP_NAME);
const key = ref(import.meta.env.VITE_APP_KEY);
// authStore
const authStore = useAuthStore();
if (authStore.authIsLoggedIn == true) {
  router.push({ path: "/dashboard" });
}

// login
const loadingLogin = ref(false);
const credentials = ref({
  login: "101590",
  password: "101590",
  url: key.value,
});

const hasError = ref(false);
const message = ref("");

const login = async () => {
  loadingLogin.value = true;
  authLogin()
    .then((res) => {
      settingStore.setPageLoading(true, "logging in");

      // redirect to previous path
      //   let redirectPath = router.options.history.state.back
      //     ? router.options.history.state.back
      //     : "/dashboard";
      let redirectPath = "/dashboard";
      authStore
        .saveClientKey(res.data)
        .then((keyResponse) => {
          loadingLogin.value = false;
          settingStore.setPmsSettings(keyResponse.data.pms_settings);
          router.push({ path: redirectPath });
          settingStore.setPageLoading(false, "logging in");
        })
        .catch(() => {
          loadingLogin.value = false;
          settingStore.setPageLoading(false, "logging in");
        });
    })
    .catch((err) => {
      loadingLogin.value = false;
      console.log("error while trying to login to server", err);
    });
};

// auth login to sanctum
const authLogin = async () => {
  let data = {
    username: credentials.value.login,
    password: credentials.value.password,
    url: credentials.value.url,
  };

  const response = await authApi.post("/api/sanctumlogin", data);
  if (response.data.status == false) {
    hasError.value = true;
    message.value = response.data.message;
    loadingLogin.value = false;
    return false;
  }
  return response;
};

// set from login
settingStore.setIsFromLogin(true);
</script>
