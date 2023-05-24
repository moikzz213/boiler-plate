<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-3">
        <v-autocomplete
          v-model="selectedEmployee"
          :items="teamList"
          item-title="username"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Select Employee"
        >
        </v-autocomplete>
      </div>
      <div class="v-col-12">
        <v-card class="mb-3 elevation-0">
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3 d-flex align-center">
                <EmployeeCard />
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Reporting To</div>
                <div class="text-body-2">Tibs</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Business Unit</div>
                <div class="text-body-2">Ghassan Aboud Group FZE</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">KPI's Target Year</div>
                <div class="text-body-2">2023</div>
              </div>
              <div class="v-col-12 v-col-md-1 d-flex flex-column">
                <div class="text-caption text-grey">Total KPI</div>
                <div class="text-body-2">50/100</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <v-btn
                  @click="submitForReview"
                  block
                  color="secondary"
                  disabled
                  class="text-capitalize rounded-lg"
                  >Submit for Review</v-btn
                >
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent :selected-employee="selectedEmployee" :is-manager="true" />
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";

const router = useRouter();
const openPage = (openPath, openParams = null) => {
  let paramsValue = openParams ? Object.assign({}, openParams) : false;
  router
    .push({
      path: openPath,
      params: paramsValue,
    })
    .catch((err) => {});
};

// authenticated user object
const authStore = useAuthStore();

// filter employee
const employeeTypeList = ref(["Regular", "Probation"]);
const selectedEmployeeType = ref("Regular");
const filter = ref({
  data: {
    employee: "",
    employee_type: "",
  },
});
const runFilter = async () => {
  console.log("filter data in pinia store");
};

// selected employee
const selectedEmployee = ref(authStore.authUser);
const teamList = ref(authStore.authUser.teams);
const getEmployeeToView = () => {
  console.log("getEmployeeToView", selectedEmployee.value);
};
watch(
  () => selectedEmployee.value,
  (newVal) => {
    console.log("newVal", newVal);
  }
);
</script>
