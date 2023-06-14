<template>
  <v-container class="pb-16">
    <v-row class="mt-5 justify-space-between">
      <div class="v-col-12 v-col-md-3 pb-0">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field
              v-bind="props"
              v-model="search"
              :loading="loadingSearch"
              variant="outlined"
              density="compact"
              class="bg-white"
              label="Search Employee"
              hide-details
              :append-inner-icon="mdiMagnify"
            >
            </v-text-field>
          </template>
          <v-list density="compact" v-if="results.length > 0" style="max-height: 300px">
            <v-list-item
              v-for="(item, index) in results"
              :key="index"
              @click="() => selectEmployee(item)"
            >
              <v-list-item-title>{{
                item.display_name + " - " + item.ecode
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list density="compact" v-else>
            <v-list-item> No results found </v-list-item>
          </v-list>
        </v-menu>
        <div class="text-caption px-3 text-grey-darken-1 pt-1">
          Enter ecode, name, or email
        </div>
      </div>
      <div class="v-col-12 v-col-md-3 text-right pb-0">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              :color="`${switchStatus == 'Active' ? 'success' : 'error'}`"
            >
              {{ switchStatus }}
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item
              v-for="(item, index) in statusArray"
              :key="index"
              @click="() => selectStatus(item)"
            >
              <v-list-item-title>
                <v-icon size="16" :color="item.color" :icon="mdiCircleMedium"></v-icon>
                {{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>
    <v-row>
      <div class="v-col-12">
        <v-card class="elevation-0">
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3 d-flex align-center">
                <EmployeeCard :profile="employee" />
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Reporting To</div>
                <div class="text-body-2">
                  {{
                    employee.managed_by && employee.managed_by.display_name
                      ? employee.managed_by.display_name +
                        " - " +
                        employee.managed_by.ecode
                      : ""
                  }}
                </div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Business Unit</div>
                <div class="text-body-2">
                  {{ employee && employee.company ? employee.company.title : "" }}
                </div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">KPI's Target Year</div>
                <div class="text-body-2">
                  {{
                    settingStore && settingStore.pms_settings
                      ? settingStore.pms_settings.year
                      : ""
                  }}
                </div>
              </div>
              <div class="v-col-12 v-col-md-1 d-flex flex-column">
                <div class="text-caption text-grey">Total KPI</div>
                <div class="text-body-2">0/100</div>
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
    <KpiContent :selected-employee="employee" />
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSettingStore } from "@/stores/settings";
import { clientApi } from "@/services/clientApi";
import { mdiMagnify, mdiCircleMedium } from "@mdi/js";
import KpiContent from "@/components/kpi/KpiContent.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

const authStore = useAuthStore();
const settingStore = useSettingStore();
const router = useRouter();
const route = useRoute();

// search employee
const search = ref("");
const loadingSearch = ref(false);
const results = ref([]);
const searchEmployee = async (keywords) => {
  loadingSearch.value = true;
  await clientApi(authStore.authToken)
    .get("/api/hr/search/employee?&filter[search]=" + keywords)
    .then((res) => {
      loadingSearch.value = false;
      results.value = res.data;
      console.log("results.value", results.value);
    })
    .catch((err) => {
      loadingSearch.value = false;
      console.log("getEmployee", err);
    });
};
watch(search, (newValue, oldValue) => {
  console.log("search", search.value);
  if (newValue != oldValue && newValue.length > 3) {
    searchEmployee(search.value);
  }
});
const selectEmployee = (emp) => {
  employee.value = emp;
  switchStatus.value = emp.status;
  router
    .push({
      name: "SingleEmployee",
      params: {
        ecode: emp.ecode,
      },
    })
    .catch((err) => {});
};

// select employee
const employee = ref({});
const getEmployee = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/employee/ecode/" + route.params.ecode)
    .then((res) => {
      employee.value = res.data;
      switchStatus.value = res.data.status;
      console.log("employee.value", employee.value);
    })
    .catch((err) => {
      console.log("getEmployee", err);
    });
};
getEmployee();

// status
const switchStatus = ref("Active");
const statusArray = ref([
  {
    title: "Active",
    color: "success",
  },
  {
    title: "Inactive",
    color: "error",
  },
]);
const selectStatus = (status) => {
  switchStatus.value = status.title;
};

// confirm dialog
const confOptions = ref();
const confirmResponse = (v) => {
  getEmployee();
};

// reopen review
const reopen = ref({
  data: {},
});
const reopenReview = () => {
  confOptions.value = {
    dialog: true,
    title: "Confirm Reopen",
    text:
      "Please confirm that you want to reopen the KPI for " +
      authStore.authProfile.email +
      ".",
    btnColor: "primary",
    btnTitle: "Confirm",
  };
};
</script>
