<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-3">
        <v-text-field
          v-model="search.employee"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Search Employee"
          :append-inner-icon="mdiMagnify"
        >
        </v-text-field>
      </div>
      <div class="v-col-12">
        <v-switch
          v-model="switchStatus"
          hide-details
          inset
          color="success"
          class="d-inline-block"
          :label="`${switchStatus ? 'Active' : 'Inactive'}`"
        ></v-switch>
        <v-card class="elevation-0">
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3 d-flex align-center">
                <EmployeeCard />
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Reporting To</div>
                <div class="text-body-2">Employee Name</div>
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
              <div class="v-col-12 v-col-md-2 d-flex align-center">
                <v-btn
                  @click="reopenReview"
                  block
                  color="secondary"
                  class="text-capitalize rounded-lg"
                  >Reopen</v-btn
                >
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent :selected-employee="authUser.user" />
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";
import { mdiMagnify } from "@mdi/js";
import EmployeeCard from "@/components/EmployeeCard.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

// authenticated user object
const authStore = useAuthStore();
const authUser = computed(() => {
  return authStore.user ? authStore.user : null;
});

// select employee
const search = ref({
  employee: "",
});
const employee = ref({});
const getEmployee = () => {
  console.log("getEmployee", employee.value);
};

// status
const switchStatus = ref(true);

// reopen review
const reopen = ref({
  data: {},
});
const reopenReview = () => {
  confOptions.value = {
    dialog: true,
    title: "Confirm Reopen",
    text:
      "Please confirm that you want to reopen the KPI for " + authStore.user.email + ".",
    btnColor: "primary",
    btnTitle: "Confirm",
  };
};

// confirm dialog
const confOptions = ref();
const confirmResponse = (v) => {
  getEmployee();
};
</script>
