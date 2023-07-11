<template>
  <div>
    <v-card :loading="password.loading">
      <v-card-title class="text-primary text-capitalize mb-3">
        Change password
      </v-card-title>
      <v-card-text>
        <Form as="v-form" :validation-schema="validation">
          <Field
            name="password"
            v-slot="{ field, errors }"
            v-model="password.data.password"
          >
            <v-text-field
              v-model="password.data.password"
              v-bind="field"
              label="Set New Password"
              type="password"
              variant="outlined"
              density="compact"
              :error-messages="errors"
            ></v-text-field>
          </Field>
          <Field
            name="password_confirmation"
            v-slot="{ field, errors }"
            v-model="password.data.password_confirmation"
          >
            <v-text-field
              v-model="password.data.password_confirmation"
              v-bind="field"
              label="Confirm New Password"
              type="password"
              variant="outlined"
              density="compact"
              :error-messages="errors"
            ></v-text-field>
          </Field>
          <div class="d-flex align-center"> 
            <v-btn :disabled="isDisabled" color="primary" size="large" @click="changePassword"> Save </v-btn>
          </div>
        </Form>
      </v-card-text>
    </v-card>
    <Snackbar :options="snackbar" />
  </div>
</template>

<script setup>
import { ref, watch  } from "vue";
import { Form, Field, useIsFormValid } from "vee-validate";
import * as yup from "yup";
import Snackbar from "@/components/SnackBar.vue";
const key = ref(import.meta.env.VITE_APP_KEY);
const sanctumBaseURL = ref(import.meta.env.VITE_SANCTUM_USER_URL);
const props = defineProps(["user"]);
const snackbar = ref({
  status: false,
  type: "",
  text: "",
}); 
  
const isDisabled = ref(true);
 
const isValid = useIsFormValid();
console.log(props.user);
const password = ref({
  status: false,
  loading: false,
  data: {
    username: "",
    password: "",
    password_confirmation: "",
    url: key.value
  },
});
const validation = yup.object({
  password: yup.string().min(5).required(),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
const changePassword = async () => {
  password.value.loading = true;
  await axios
    .post(sanctumBaseURL.value+"/api/application/reset-password", password.value.data)
    .then((response) => {
      password.value = {
        status: false,
        loading: false,
        data: {
          username: props.user.ecode,
          password: "",
          password_confirmation: "",
        },
      };
      snackbar.value = {
        status: true,
        type: "success",
        text: response.data.msg,
      };
    })
    .catch((err) => {
      password.value.loading = false;
      snackbar.value = {
        status: true,
        type: "error",
        text: "Error while updating password",
      };
      console.log(err.response.data);
    });
}; 
watch(
  () => props.user,
  (newVal, oldValue) => { 
    if (newVal != oldValue) {
      password.value.data.username = Object.assign({}, newVal.ecode);
      
    }
  }
);
watch(
  () => password.value.data.password,
  (newVal) => {
    console.log(isValid.value);
    if (newVal && newVal == password.value.data.password_confirmation) {
      isDisabled.value = false;
    }else{
      isDisabled.value = true;
    }
  } 
);
watch( 
  () => password.value.data.password_confirmation,
  (newVal, oldValue) => {
    if (newVal && newVal == password.value.data.password) {
      isDisabled.value = false;
    }else{
      isDisabled.value = true;
    }
  }
);
</script>
