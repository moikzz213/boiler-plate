<template>
  <v-card>
    <v-card-title class="text-primary text-capitalize mb-3"
      >Profile Settings</v-card-title
    >
    <v-card-text>
      <v-row class="pb-3">
        <div class="v-col-12 py-0">
          <v-switch
            :model-value="profileData.data.status == 'Active' ? true : false"
            class="d-inline-block ma-0"
            hide-details
            inset
            :color="profileData.data.status == 'Active' ? 'success' : 'primary'"
            :label="`Status: ${profileData.data.status}`"
            readonly
          ></v-switch>
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            v-model="profileData.data.display_name"
            label="Full name"
            variant="outlined"
            density="compact"
            readonly
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            v-model="profileData.data.ecode"
            label="Ecode"
            variant="outlined"
            density="compact"
            readonly
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            v-model="profileData.data.email"
            label="Email"
            variant="outlined"
            density="compact"
            readonly
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            label="Employee Type"
            :model-value="profileData.data.is_regular ? 'Regular' : 'Probation'"
            variant="outlined"
            density="compact"
            readonly
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            v-model="profileData.data.company.title"
            label="Company"
            variant="outlined"
            density="compact"
            readonly
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="Designation"
            :v-model="profileData.data.designation"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="Department"
            v-model="profileData.data.department"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            type="date"
            label="Date of Birth"
            :model-value="profileData.data.dob"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            type="date"
            label="Date Joined"
            :model-value="profileData.data.doj"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="Nationality"
            :model-value="profileData.data.nationality"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="Grade"
            :model-value="profileData.data.grade"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="Reporting to"
            :model-value="`${
              profileData.data.managed_by.display_name +
              ' (' +
              profileData.data.managed_by.ecode +
              ')'
            }
            `"
            variant="outlined"
            density="compact"
          />
        </div>
        <div class="v-col-12 v-col-md-6 py-0">
          <v-text-field
            readonly
            label="HRBP"
            v-model="profileData.data.hrbp_email"
            variant="outlined"
            density="compact"
          />
        </div>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps(["user"]);
const emit = defineEmits(["saved"]);

// profile
const profileData = ref({
  loading: false,
  data: {
    company: {
      title: "",
    },
    managed_by: {
      display_name: "",
    },
    status: "Active",
  },
});
const switchStatus = ref(false);
watch(
  () => props.user,
  (newVal, oldValue) => {
    if (newVal != oldValue) {
      switchStatus.value = newVal.status == "Active" ? true : false;
      profileData.value.data = Object.assign({}, newVal);
    }
  }
);
</script>
