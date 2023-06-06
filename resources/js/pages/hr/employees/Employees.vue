<template>
  <v-container class="pb-16">
    <PageHeader title="Employees" />
    <v-row>
      <div class="v-col-12">
        <div class="text-h6">Employee List {{ "(" + totalResult + ")" }}</div>
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
      <div class="v-col-12 v-col-md-4">
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
          clearable
          @focus="loadCompnaies"
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{
                item.raw.title && item.raw.title.length > 20
                  ? item.raw.title.substring(0, 20) + "..."
                  : item.raw.title
              }}
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-2">
        <v-select
          v-model="filter.data.is_regular"
          :items="employeeTypeList"
          item-title="title"
          item-value="value"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Select Employee Type"
        >
        </v-select>
      </div>
      <div class="v-col-12 v-col-md-3">
        <div class="d-flex justify-space-between">
          <v-btn
            @click="resetFilter"
            height="40px"
            variant="text"
            color="primary"
            class="bg-grey-lighten-2 text-capitalize"
            :loading="filter.loadingReset"
            style="width: 48%"
            >Reset</v-btn
          >
          <v-btn
            @click="runFilter"
            height="40px"
            color="primary"
            class="text-capitalize"
            :loading="filter.loadingFilter"
            style="width: 48%"
            >Search</v-btn
          >
        </div>
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
        <v-pagination
          v-if="totalPageCount > 1"
          v-model="currentPage"
          class="my-4"
          :length="totalPageCount"
          variant="elevated"
          active-color="primary"
          density="comfortable"
        ></v-pagination>
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
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import { useCompanyStore } from "@/stores/company";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import PageHeader from "@/components/pageHeader.vue";

// authenticated user object
const authStore = useAuthStore();

// router
const router = useRouter();
const route = useRoute();
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
const loadCompnaies = () => {
  if (companyStore.companies.length == 0) {
    loadingCompany.value = true;
    companyStore.getCompanies(authStore.authToken).then(() => {
      loadingCompany.value = false;
    });
  }
};

// filter employee
const employeeTypeList = ref([
  {
    value: 1,
    title: "Regular",
  },
  {
    value: 0,
    title: "Probation",
  },
]);
const filter = ref({
  loadingReset: false,
  loadingFilter: false,
  data: {
    employee: null,
    company_id: null,
    is_regular: 1,
  },
});
const runFilter = async () => {
  filter.value.loadingFilter = true;
  getEmployees(1)
    .then(() => {
      filter.value.loadingFilter = false;
    })
    .catch((err) => {
      filter.value.loadingFilter = false;
    });
};
const resetFilter = async () => {
  filter.value.data = {
    employee: null,
    company_id: null,
    is_regular: 1,
  };
  filter.value.loadingReset = true;
  getEmployees(1)
    .then(() => {
      filter.value.loadingReset = false;
    })
    .catch((err) => {
      filter.value.loadingReset = false;
    });
};

// employees
const employees = ref([]);
const totalPageCount = ref(0);
const totalResult = ref(0);
const currentPage = ref(route.params && route.params.page ? route.params.page : 1);
const getEmployees = async (page) => {
  let endpoint =
    "/api/hr/employees?&filter[is_regular]=" +
    filter.value.data.is_regular +
    "&filter[hrbp_email]=" +
    authStore.authProfile.email;
  if (filter.value.data.company_id !== null) {
    endpoint += "&filter[company_id]=" + filter.value.data.company_id;
  }
  if (filter.value.data.employee !== null) {
    endpoint += "&filter[employee]=" + filter.value.data.employee;
  }
  endpoint += "&page=" + page;

  await clientApi(authStore.authToken)
    .get(endpoint)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      totalResult.value = res.data.total;
      employees.value = res.data.data;
    })
    .catch((err) => {
      console.log("getEmployees", err);
    });
};
watch(currentPage, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router
      .push({
        name: "PaginatedEmployees",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getEmployees(currentPage.value);
  }
});
getEmployees(currentPage.value);

// open Employee
const openEmployee = (profile) => {
  console.log("profile", profile);
  openPage("SingleEmployee", { ecode: profile.ecode });
};
</script>
