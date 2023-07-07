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
        <v-btn color="primary" size="large" :loading="user.loading" @click="saveUser"
          >Save</v-btn
        >
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import * as yup from "yup";
import { Form, Field } from "vee-validate";
import { mdiCircleMedium } from "@mdi/js";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["saved"]);
const props = defineProps(["user"]);
const authStore = useAuthStore();
const roleList = ref(["normal","hrbp", "hr_admin"]);
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
const statusColor = computed(() =>
  user.value.data.status == "Active" ? "success" : "error"
);
const selectStatus = (selected) => {
  user.value.data.status = selected;
}; 

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
  let data = user.value.data;
   
  user.value.loading = true;
  await axios
    .post("/account/save", data)
    .then((response) => {
      user.value.loading = false; 
    })
    .catch((err) => {
      user.value.loading = false;
       
    });
};
 
</script>
