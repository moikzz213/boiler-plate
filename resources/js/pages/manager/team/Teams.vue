<template>
  <v-container class="pb-16">
    <!-- <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6 mb-3">My KPI</div>
        <v-card max-width="1200">
          <v-card-text>
            <KpiProgress />
          </v-card-text>
        </v-card>
        <v-btn
          size="x-large"
          color="secondary"
          class="mt-5"
          @click="() => openPage('Dashboard')"
          >Open My Own KPI</v-btn
        >
      </div>
    </v-row> -->
    <v-row class="mt-5">
      <div class="v-col-12 pb-0">
        <div class="text-h6">
          My Team {{ "(" + authStore.authProfile.teams.length + ")" }}
        </div>
      </div>
      <div class="v-col-12 v-col-md-3">
        <v-text-field
          v-model="filter.data.employee"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Input Employee"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 v-col-md-3">
        <v-select
          v-model="selectedEmployeeType"
          :items="employeeTypeList"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Select Employee Type"
        >
        </v-select>
      </div>
      <div class="v-col-12 v-col-md-2">
        <v-btn @click="runFilter" block color="white" class="text-capitalize"
          >Filter</v-btn
        >
      </div>
      <div class="v-col-12 v-col-md-2 ml-auto d-flex align-center justify-end">
        <div class="text-h6">Year: 2023</div>
      </div>
    </v-row>
    <v-row>
      <div v-if="authStore.authProfile.teams.length > 0" class="v-col-12">
        <v-card
          v-for="user in authStore.authProfile.teams"
          :key="user.id"
          class="mb-3 elevation-0"
          @click="() => openMember(user)"
        >
          <!-- @click="() => openMember('SingleTeamMember', { id: user.id })" -->
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3">
                <EmployeeCard />
              </div>
              <div class="v-col-12 v-col-md-8">
                <KpiProgress :density="'compact'" />
              </div>
              <div class="v-col-12 v-col-md-1 d-flex justify-end align-center">
                <div>
                  <div>50/100</div>
                  <div class="text-caption text-grey">Total KPI</div>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div v-else class="v-col-12">
        <v-card>
          <v-card-text class="text-center"> No records found </v-card-text>
        </v-card>
      </div>
    </v-row>
    <v-dialog v-model="dialogOpenMember" width="450">
      <v-card class="rounded-lg">
        <v-card-title>
          Do you want to set KPI for {{ selectedUser.username }}?
        </v-card-title>
        <div class="pa-3 mt-3 d-flex justify-end">
          <v-btn color="primary" variant="text" @click="dialogOpenMember = false"
            >Cancel</v-btn
          >
          <v-btn color="primary" class="ml-2 px-8" @click="confirmOpenMember">yes</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";

const router = useRouter();
const openPage = (pathName, openParams = null) => {
  let paramsValue = openParams ? Object.assign({}, openParams) : false;
  router
    .push({
      name: pathName,
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

// open team member
const selectedUser = ref({});
const dialogOpenMember = ref(false);
const confirmOpenMember = () => {
  // update status using axios request

  // redirect to SingleTeamMember
  openPage("SingleTeamMember", { id: selectedUser.value.id });
};
const openMember = (user) => {
  selectedUser.value = Object.assign({}, user);
  dialogOpenMember.value = true;
};
</script>
