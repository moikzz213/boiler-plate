<template>
  <v-container class="pb-16">
    <PageHeader title="Employees" />
    <v-row>
      <div class="v-col-12">
        <div class="text-h6">Employee List {{ "(" + employees.length + ")" }}</div>
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
      <div class="v-col-12 v-col-md-2">
        <VueDatePicker v-model="year" year-picker class="pms-date-picker" />
      </div>
      <div class="v-col-12 v-col-md-3">
        <v-autocomplete
          v-model="filter.data.company_id"
          :items="companyStore.companies"
          item-title="title"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          :label="loadingCompany ? 'Loading...' : 'Select Company'"
          :loading="loadingCompany"
          @focus="selectCompany"
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{
                item.raw.title && item.raw.title.length > 15
                  ? item.raw.title.substring(0, 15) + "..."
                  : item.raw.title
              }}
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-2">
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
        <v-btn
          block
          @click="runFilter"
          height="40px"
          color="primary"
          class="text-capitalize"
          >Search</v-btn
        >
      </div>
    </v-row>
    <v-row>
      <div v-if="employees.length > 0" class="v-col-12">
        <v-card
          v-for="profile in employees"
          :key="profile.id"
          class="mb-3 elevation-0"
          @click="() => openEmployee(profile)"
        >
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3">
                <EmployeeCard :profile="profile" />
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
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import VueDatePicker from "@vuepic/vue-datepicker";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import PageHeader from "@/components/pageHeader.vue";
import { useCompanyStore } from "@/stores/company";

// authenticated user object
const authStore = useAuthStore();

// router
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


// companies
const companyStore = useCompanyStore();
const loadingCompany = ref(false);
const selectCompany = () => {
  if (companyStore.companies.length == 0) {
    loadingCompany.value = true;
    companyStore.getCompanies(authStore.authToken).then(() => {
      loadingCompany.value = false;
    });
  }
};

// filter employee
const year = ref(new Date().getFullYear());
const employeeTypeList = ref(["Regular", "Probation"]);
const selectedEmployeeType = ref("Regular");
const filter = ref({
  data: {
    employee: "",
    company_id: null,
  },
});
const runFilter = async () => {
  filter.value.data = {
    ...filter.value.data,
    ...{
      employee_type: selectedEmployeeType.value,
      year: year.value,
    },
  };
  console.log("filter", filter.value);
};


// employees
const employees = ref([]);
const getEmployees = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/" + authStore.authProfile.ecode + "/employees/page/?page"+1, filter.value)
    .then((res) => {
      console.log("emp", res);
      employees.value = res.data.data;
    })
    .catch((err) => {
      console.log("getEmployees", err);
    });
};
getEmployees();

// open Employee
const openEmployee = (profile) => {
  console.log("profile", profile);
  openPage("SingleEmployee", { ecode: profile.ecode });
};
</script>
