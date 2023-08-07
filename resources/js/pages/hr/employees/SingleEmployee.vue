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
      <div
        v-if="['hr_admin', 'app_admin', 'hrbp'].includes(authStore.authProfile.role)"
        class="v-col-12 v-col-md-3 text-right pb-0"
      >
        <div>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :color="`${switchStatus == 'Active' ? 'success' : 'error'}`"
                width="120"
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
        <div class="text-caption px-3 text-grey-darken-1 pt-1">Employee Status</div>
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
                      ? employee.managed_by.display_name
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

                  {{ globalSetting.year }}
                </div>
              </div>
              <div class="v-col-12 v-col-md-1 d-flex flex-column">
                <div class="text-caption text-grey">Total KPI</div>
                <div class="text-body-2">{{ ratingOrWeightage(employee) }}/100</div>
              </div>
              <div
                v-if="['hr_admin', 'app_admin','hrbp'].includes(authStore.authProfile.role)"
                class="v-col-12 v-col-md-2 d-flex align-center"
              > 
                <v-btn
                v-if="employee.status == 'Active' && employee.reviews && ((employee.reviews.length > 0 && (employee.reviews[0].status == 'closed' || employee.reviews[0].status == 'locked' || employee.reviews[0].status == 'submitted')) || (employee.reviews.length == 0 && (globalSetting.status == 'closed' || globalSetting.status == 'locked')))"
                  :loading="reopen.loading"
                  @click="reopenReview"
                  block
                  size="large"
                  color="secondary"
                  class="text-capitalize rounded-lg"
                  >Reopen</v-btn
                >
                <v-btn
                v-else-if="employee.status == 'Active' && employee.reviews.length == 0 && employee.is_regular == 0"
                  :loading="reopen.loading"
                  @click="reopenReview"
                  block
                  size="large"
                  color="secondary"
                  class="text-capitalize rounded-lg"
                  >Open</v-btn
                >
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent :selected-employee="employee" 
            :measures-list="measuresList"
            :industry-list="industryWithKPI"
            :ecd-list="ecdList" 
            @errorcheck="errorCheck"
            @yearchange="selectedYearResponse"
            :is-manager="true"
    />
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
    <SnackBar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSettingStore } from "@/stores/settings";
import { clientApi } from "@/services/clientApi";
import { mdiMagnify, mdiCircleMedium } from "@mdi/js";
import KpiContent from "@/components/kpi/KpiContent.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SnackBar from "@/components/SnackBar.vue";
import { useIndustryStore } from "@/stores/industry";

const industryStore = useIndustryStore();
const authStore = useAuthStore();
const settingStore = useSettingStore();
const router = useRouter();
const route = useRoute();
const sbOptions = ref({});

// status
const switchStatus = ref("Active");
const toUpdateStatus = ref("");
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

const industryList = ref([]);
const selectIndustry = async () => {
    if (industryStore.industries.length == 0) {
        industryStore.getIndustries(authStore.authToken).then(() => {
            industryList.value = industryStore.industries;
        });
    } else {
        industryList.value = industryStore.industries;
    }
};

const measuresList = ref([]);
const fetchMeasures = async () => {
    await clientApi(authStore.authToken)
        .get("/api/fetch/measures/non-paginated")
        .then((res) => {
            measuresList.value = res.data;
        })
        .catch((err) => {});
};

const industryWithKPI = ref([]);
const ecdList = ref([]);
const year = ref(new Date().getFullYear());
const selectedYearResponse = (v) => {
  year.value = v;
  getKPI(v);
};

const getKPI = async (year) => {
    await clientApi(authStore.authToken)
        .get("/api/dashboard/my-kpi/" + employee.value.id + "/" + year)
        .then((res) => {
            if (res.data.result == null) {
              employee.value = {
                    ...employee.value,
                    ...{
                        reviews: [],
                    },
                };
            } else {
              employee.value = {
                    ...employee.value,
                    ...{
                        reviews: [res.data.result],
                    },
                };
            }
        })
        .catch((err) => {});
};


const kpiMaster = async () => {
    await clientApi(authStore.authToken)
        .get("/api/fetch/master-kpi/non-paginate")
        .then((res) => {
        
            if (
                industryList.value &&
                industryList.value.length > 0 &&
                res.data &&
                res.data.length > 0
            ) {
                industryList.value.map((o, i) => {
                    industryWithKPI.value[i] = o;
                    industryWithKPI.value[i].kpis = [];
                    let count = 0;
                    let ecdCount = 0;
                    res.data.map((oo, ii) => {
                        if (o.id == oo.industry_id) {
                            industryWithKPI.value[i].kpis[count] = oo;
                            count++;
                        } else if (oo.type == "ecd") {
                            ecdList.value[ecdCount] = oo;
                            ecdCount++;
                        }
                    });
                });
            } 
        });
};

const ratingOrWeightage = (user) => {
  let sum = 0;
  if (user.reviews && user.reviews.length > 0 && user.reviews[0].key_review) {
    user.reviews[0].key_review.map((o, i) => {
      sum += o.weightage;
    });
  }
  return sum;
};
// get employee
const employee = ref({});
const getEmployee = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/employee/ecode/" + route.params.ecode)
    .then((res) => {
      employee.value = res.data;
      switchStatus.value = res.data.status;
    })
    .catch((err) => {
      console.log("getEmployee", err);
    });
};

const globalSetting = computed(() => settingStore.filteredSetting(employee.value.company_id));

getEmployee();
selectIndustry();
kpiMaster();
fetchMeasures();
// select employee
const selectStatus = (status) => {
  toUpdateStatus.value = status.title;
  confOptions.value = {
    dialog: true,
    title: "Confirm Status Update",
    text:
      "Please confirm that you want to update the status of " +
      employee.value.display_name +
      " into " +
      status.title +
      ".",
    btnColor: status.title == "Active" ? "success" : "error",
    btnTitle: "Confirm",
  };
};

// update status
const updateEmployeeStatus = async () => {
  let data = {
    profile_id: authStore.authProfile.id,
    ecode: employee.value.ecode,
    status: toUpdateStatus.value,
  };
  confOptions.value = {
    ...confOptions.value,
    ...{
      loading: true,
    },
  };
  await clientApi(authStore.authToken)
    .post("/api/hr/employee/status/update", data)
    .then((res) => {
      getEmployee().then(() => {
        confOptions.value = {
          ...confOptions.value,
          ...{
            loading: false,
            dialog: false,
          },
        };
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      console.log("getEmployee", err);
      confOptions.value = {
        ...confOptions.value,
        ...{
          loading: false,
        },
      };
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while updating employee",
      };
    });
};

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
watch(search, (newValue, oldValue) => {
  if (newValue != oldValue && newValue.length > 3) {
    searchEmployee(search.value);
  }
});

// reopen review
const reopen = ref({
  data: {},
  loading: false,
});
const reopenReview = () => {
  console.log("employee",employee);
  confOptions.value = {
    dialog: true,
    title: "Confirm to Open KPI",
    text:
      "Please confirm that you want to open the KPI for " +
      employee.value.display_name +
      ".",
    btnColor: "secondary",
    btnTitle: "Confirm",
  };
};
const updateEmployeeReview = async () => {
  
  confOptions.value = {
    ...confOptions.value,
    ...{
      loading: true,
    },
  };

  let data = {
    profile_id: authStore.authProfile.id,
    ecode: employee.value.ecode, 
    year: year.value
  };

  await clientApi(authStore.authToken)
    .post("/api/hr/employee/reopen", data)
    .then((res) => {
      confOptions.value = {
        ...confOptions.value,
        ...{
          loading: false,
          dialog: false,
        },
      };
      reopen.value.loading = true;
      getEmployee().then(() => {
        reopen.value.loading = false;
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      confOptions.value = {
        ...confOptions.value,
        ...{
          loading: false,
        },
      };
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while updating employee",
      };
      console.log("getEmployee", err);
    });
};

// confirm dialog
const confOptions = ref();
const confirmResponse = (v) => {
  if (confOptions.value.title == "Confirm Status Update") {
    updateEmployeeStatus();
  } else if (confOptions.value.title == "Confirm to Open KPI") {
    updateEmployeeReview();
  }
};
</script>
