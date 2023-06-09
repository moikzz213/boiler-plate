<template>
  <v-card>
    <v-card-title class="text-primary text-capitalize mb-3"
      >Account Settings</v-card-title
    >
    <v-card-text>
      <Form as="v-form" :validation-schema="validation">
        <div class="mb-2 text-body-2">Status</div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" class="mb-6" :color="statusColor">
              {{ user.data.status }}
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="(item, index) in statusList"
              :key="index"
              :value="index"
              @click="() => selectStatus(item.title)"
            >
              <v-list-item-title class="text-overline d-flex align-center">
                <v-icon :color="item.color" :icon="mdiCircleMedium" class="mr-1"></v-icon>
                <div>{{ item.title }}</div></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <Field name="username" v-slot="{ field, errors }" v-model="user.data.username">
          <v-text-field
            v-model="user.data.username"
            v-bind="field"
            label="Username"
            variant="outlined"
            density="compact"
            :error-messages="errors"
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
            :error-messages="errors"
          />
        </Field>
        <v-btn color="primary" size="large" :loading="user.loading" @click="saveUser"
          >Save</v-btn
        >
      </Form>
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

// roles
const roleList = ref(["normal", "hrbp", "hr_admin"]);

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

// save user
let validation = yup.object({
  username: yup.string().required(),
  role: yup.string().required(),
});
const saveUser = async () => {
  let data = {
    ecode: user.value.data.ecode,
    username: user.value.data.username,
    status: user.value.data.status,
    role: user.value.data.role,
  };
  user.value.loading = true;
  await clientApi(authStore.authToken)
    .post("/api/admin/account/save", data)
    .then((response) => {
      user.value.loading = false;
      emit("saved", response.data.message);
    })
    .catch((err) => {
      user.value.loading = false;
      console.log(err.response.data);
    });
};
</script>
