<template>
  <v-card>
    <v-card-title class="text-primary text-capitalize mb-3"
      >Account - {{ user.data.status }}</v-card-title
    >
    <v-card-text>  
        
        <Field name="username" v-slot="{ field, errors }"  v-model="user.data.username">
          <v-text-field
          v-bind="field"
            v-model="user.data.username" 
            label="Username"
            variant="outlined"
            density="compact"
            :error-messages="errors"
            readonly
          />
        </Field> 
 
        <Field name="role" v-slot="{ field, errors }" v-model="user.data.role">
          <v-select
          :disabled="route.name != 'EditUser'"
            v-model="user.data.role"
            v-bind="field"
            :items="roleList"
            label="Role"
            variant="outlined"
            density="compact"
            class="mb-2"
            :error-messages="errors"
          />
        </Field>
        <v-btn v-if="route.name == 'EditUser'" color="primary" size="large" :loading="user.loading" @click="saveUser"
          >Save</v-btn
        >
    </v-card-text>
  </v-card>
  <SnackBar :options="sbOptions" />
</template>
<script setup>
import { ref, watch } from "vue";

import { Field } from "vee-validate";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import SnackBar from "@/components/SnackBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const emit = defineEmits(["saved"]);
const props = defineProps(["user"]);
const authStore = useAuthStore();
const roleList = ref(["normal","hrbp", "hr_admin"]);
const sbOptions = ref({});
// status
const statusList = ref([
  {
    title: "Active",
    color: "success",
  },
  {
    title: "Inactive",
    color: "error",
  },
]); 
// user account
const user = ref({
  loading: false,
  data: Object.assign({}, props.user),
});
watch(
  () => props.user,
  (newVal) => {
    user.value.data = newVal;
  }
);
 
const saveUser = async () => {
  let data = {role: user.value.data.role,ecode: user.value.data.ecode, author: authStore.authProfile.id};
     
  user.value.loading = true;
  await clientApi(authStore.authToken)
    .post("/api/admin/account/save", data)
    .then((response) => {
      console.log(response);
      user.value.loading = false; 
      sbOptions.value = {
          status: true,
          type: "success",
          text: response.data.message,
        };
    })
    .catch((err) => {
      user.value.loading = false;
       
    });
};
 
</script>
