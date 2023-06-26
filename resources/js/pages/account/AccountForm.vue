<template>
  <v-card>
    <v-card-title class="text-primary text-capitalize mb-3"
      >Account Settings</v-card-title
    >
    <v-card-text>
       
        <div class="mb-2 ma-auto text-body-2 d-flex">Status
          <v-btn   class=" ml-5 mb-6" :color="statusColor">
            {{ user.data.status }}
          </v-btn>
        </div>
        
        
        <Field name="username"  v-model="user.data.username">
          <v-text-field
            v-model="user.data.username"
            v-bind="field"
            label="Username"
            variant="outlined"
            density="compact"
           
          />
        </Field> 
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

 
</script>
