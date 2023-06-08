<template>
  <v-container>
    <PageHeader title="Edit User" />
    <v-row class="mb-3" :disabled="user.loadingPage">
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
      <div class="v-col-12">
        <AccountForm
          v-show="currentForm == 'account'"
          :user="user.data"
          @saved="savedResponse"
        />
        <ProfileForm
          v-show="currentForm == 'profile'"
          :user="user.data"
          @saved="savedResponse"
        />
        <ChangePassword v-show="currentForm == 'change_password'" :user-id="1" />
      </div>
    </v-row>
    <Snackbar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import PageHeader from "@/components/pageHeader.vue";
import AccountForm from "@/pages/account/AccountForm.vue";
import ProfileForm from "@/pages/account/ProfileForm.vue";
import Snackbar from "@/components/SnackBar.vue";
import ChangePassword from "@/pages/account/ChangePassword.vue";

const route = useRoute();
const authStore = useAuthStore();

const sbOptions = ref({
  status: true,
  type: "info",
  text: null,
});

const currentForm = ref("profile");
const openForm = async (comp) => {
  currentForm.value = comp;
};

const user = ref({
  loadingPage: true,
  data: {},
});
const getSingleUser = async () => {
  user.value.loadingPage = true;
  await clientApi(authStore.authToken)
    .get("/api/admin/user/single/" + route.params.ecode)
    .then((response) => {
      user.value.data = response.data;
      user.value.loadingPage = false;
      console.log("user.value", user.value);
    })
    .catch((err) => {
      user.value.loadingPage = false;
      console.log(err);
    });
};
getSingleUser();
const savedResponse = (resMsg) => {
  getSingleUser().then(() => {
    sbOptions.value = {
      status: true,
      type: "success",
      text: resMsg,
    };
  });
};
</script>
