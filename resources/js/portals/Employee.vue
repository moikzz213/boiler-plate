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
 

const authStore = useAuthStore(); 
const router = useRouter();

const refreshAuth = async () => {
 
  await axiosWithBearer(authStore.authToken)
    .get("/api/checkuser")
    .then((res) => {
      // update the user token in pinia
      authStore.saveClientKey(res.data).then((keyResponse) => {
      
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
 
    });
};
 
refreshAuth();
 
</script>
