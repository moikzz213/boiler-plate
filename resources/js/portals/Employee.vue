<template>
  <div>
    <LoggedInLayout>
      <router-view></router-view>
    </LoggedInLayout>
  </div>
</template>

<script setup>
import LoggedInLayout from "@/layouts/LoggedInLayout.vue";
import { axiosWithBearer } from "@/services/sacntumApi";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/stores/settings";

const authStore = useAuthStore();
const settingStore = useSettingStore();
const router = useRouter();

const refreshAuth = async () => {
  settingStore.setPageLoading(true);
  await axiosWithBearer(authStore.authToken)
    .get("/api/checkuser")
    .then((res) => {
      // update the user token in pinia
      authStore.saveClientKey(res.data).then((keyResponse) => {
        settingStore.setPageLoading(false);
        settingStore.setIsFromLogin(false);
        settingStore.setPmsSettings(keyResponse.data.pms_settings);
        settingStore.setAllSettings(keyResponse.data.all_settings);
      });
    })
    .catch((err) => {
      console.log("error", err.response.status);
      // if error 401 unauthorize
      if (err.response.status == 401) {
        // logout user and redirect to login
        localStorage.removeItem("authClient");
 
        router.push({ path: "/login" });
      }
      settingStore.setPageLoading(false);
    });
};
if (settingStore.isFromLogin == false) {
  refreshAuth();
}
</script>
