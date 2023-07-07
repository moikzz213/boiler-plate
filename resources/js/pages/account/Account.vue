<template>
  <v-container class="pb-16">
    <v-row class="mt-10 mb-5">
      <div class="v-col-12 v-col-md-8">
        <div class="d-flex flex-wrap">
          <v-btn
            :color="`${currentForm == 'profile' ? 'primary' : 'white'} `"
            size="large"
            class="mr-3"
            :loading="user.loading"
            @click="() => openForm('profile')"
            >profile</v-btn
          >
          <v-btn
            
            :color="`${currentForm == 'account' ? 'primary' : 'white'} `"
            size="large"
            class="mr-3"
            :loading="user.loading"
            @click="() => openForm('account')"
            >Account</v-btn
          >
          <v-btn
            :color="`${currentForm == 'change_password' ? 'primary' : 'white'} `"
            size="large"
            class="mr-3"
            :loading="user.loading"
            @click="() => openForm('change_password')"
            >Change Password</v-btn
          >
        </div>
      </div>
      
      <div class="v-col-12 v-col-md-8">
        <AccountForm
        v-if="currentForm === 'account'"
          :user="user.data"
          @saved="savedResponse"
        />
        <ProfileForm
          v-if="currentForm == 'profile'"
          :user="user.data"
          @saved="savedResponse"
        />
      <ChangePassword v-if="currentForm == 'change_password'" :user="user.data" />
      </div>
    </v-row>
    <Snackbar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import AccountForm from "./AccountForm.vue";
import ProfileForm from "./ProfileForm.vue";
import ChangePassword from "./ChangePassword.vue";
import { useAuthStore } from "@/stores/auth";
import Snackbar from "@/components/SnackBar.vue";

const sbOptions = ref({
  status: false,
  type: "primary",
  text: null,
});

// user
const authStore = useAuthStore();
const user = ref({
  loading: false,
  data: Object.assign({}, authStore.authProfile),
});

// tabs
const currentForm = ref("profile");
const openForm = async (comp) => {
  currentForm.value = comp;
};

// form response
const savedResponse = (res) => {
  sbOptions.value = {
    status: true,
    type: "success",
    text: res,
  };
};
</script>
