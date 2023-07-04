<template>
  <div>
    <v-row>
      <div class="v-col-12 v-col-md-6">
        <v-autocomplete
          v-model="pms.data.company_id"
          :items="companyStore.active_companies"
          item-title="title"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          :label="loadingCompany ? 'Loading...' : 'Select Company'"
          hide-details
          :loading="loadingCompany"
          @focus="selectCompany"
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{
                item.raw.title && item.raw.title.length > 30
                  ? item.raw.title.substring(0, 30) + "..."
                  : item.raw.title
              }}
              <!-- {{ item?.raw?.title?.substring(0, 30) + "..." }} -->
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-6">
        <VueDatePicker v-model="pms.data.year" year-picker class="pms-date-picker" />
      </div>
    </v-row>
    <v-row class="mt-6">
      <div class="v-col-12 d-flex align-center">
        <div class="mr-3 text-subtitle-1" style="min-width: 150px">Regular Employee</div>
        <v-divider></v-divider>
      </div>
      <div class="v-col-12 py-0">
        <v-text-field
          v-model="pms.data.employee_review_allowed_days"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="Employee Review Allowed (days)"
          type="number"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 pt-0">
        <div class="text-caption">Annual KPI Setting</div>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="Start Date (mm/dd/yyyy)"
          v-model="pms.data.annual_kpi_setting_start"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="End Date (mm/dd/yyyy)"
          v-model="pms.data.annual_kpi_setting_end"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>
      <div class="v-col-12 pt-0">
        <div class="text-caption">Mid-year Review</div>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="Start Date (mm/dd/yyyy)"
          v-model="pms.data.mid_year_review_start"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="End Date (mm/dd/yyyy)"
          v-model="pms.data.mid_year_review_end"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>

      <div class="v-col-12 pt-0">
        <div class="text-caption">End-year Review</div>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="Start Date (mm/dd/yyyy)"
          v-model="pms.data.end_year_review_start"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          type="date"
          label="End Date (mm/dd/yyyy)"
          v-model="pms.data.end_year_review_end"
          variant="outlined"
          density="compact"
          class="bg-white"
        />
      </div>
    </v-row>
    <v-row class="mt-6">
      <div class="v-col-12 d-flex align-center">
        <div class="mr-3 text-subtitle-1" style="min-width: 150px">
          Probation Employee
        </div>
        <v-divider></v-divider>
      </div>
      <div class="v-col-12 py-0">
        <v-text-field
          v-model="pms.data.probation_kpi_setting"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="Probation KPI Setting Max Allowed (days)"
          type="number"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 pt-0">
        <div class="text-caption">First Review</div>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          v-model="pms.data.probation_first_review_start"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="From (in days)"
          type="number"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          v-model="pms.data.probation_first_review_end"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="Up to (in days)"
          type="number"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 pt-0">
        <div class="text-caption">Final Review</div>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          v-model="pms.data.probation_final_review_start"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="From (in days)"
          type="number"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 v-col-md-6 py-0">
        <v-text-field
          v-model="pms.data.probation_final_review_end"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="Up to (in days)"
          type="number"
        >
        </v-text-field>
      </div>
    </v-row>
    <div class="d-flex justify-end mt-5">
      <v-btn
        size="x-large"
        color="primary"
        :loading="pms.loading"
        class="px-10"
        @click="saveSetting"
        >save</v-btn
      >
    </div>
    <SnackBar :options="sbOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/company";
import VueDatePicker from "@vuepic/vue-datepicker";
import SnackBar from "@/components/SnackBar.vue";
import { useRouter, useRoute } from "vue-router";
import { useSettingStore } from "@/stores/settings";

const settingStore = useSettingStore();``
const router = useRouter();
const route = useRoute();
const sbOptions = ref({});
const authStore = useAuthStore();
const props = defineProps({
  pms: {
    type: Object,
    default: {},
  },
});

// PMS
const pms = ref({
  title: "Add PMS Setting",
  dialog: true,
  data: {
    year: new Date().getFullYear(),
    company_id: null,
    employee_review_allowed_days: "",
    probation_final_review_end: "",
    probation_final_review_start: "",
    probation_first_review_end: "",
    probation_first_review_start: "",
    probation_kpi_setting: "",
    annual_kpi_setting_start: "",
    annual_kpi_setting_end: "",
    mid_year_review_start: "",
    mid_year_review_end: "",
    end_year_review_start: "",
    end_year_review_end: "",
  },
  loading: false,
});
watch(
  () => props.pms,
  (newVal) => {
    selectCompany();
    pms.value = {
      ...pms.value,
      ...{
        data: newVal,
      },
    };
  }
);

const getPmsSettings = async () => {
  pms.value.loading = true;
  await clientApi(authStore.authToken)
    .get("/hr/employees/paginated")
    .then((res) => {
      pms.value.loading = false;
    })
    .catch((err) => {
      pms.value.loading = false;
      console.log("getEmployees", err);
    });
};
const saveSetting = async () => {
  pms.value.loading = true;
  pms.value.data.profile_ecode = authStore.authProfile.ecode;
  await clientApi(authStore.authToken)
    .post("/api/hr/pms-settings/save", pms.value.data)
    .then((res) => {
      pms.value.loading = false;
      sbOptions.value = {
        status: true,
        type: "success",
        text: res.data.message,
      };

      settingStore.setPmsSettings(res.data.result);

      if(res.data.profile && res.data.profile.length > 0){
        authStore.setProfile(res.data.profile);
      }
      // check if NewPms then redirect
      setTimeout(() => {
        if (route.name == "NewPms") {
          router
            .push({
              name: "Pms",
            })
            .catch((err) => {});
        }
      }, 1000);
    })
    .catch((err) => {
      pms.value.loading = false;
      if (err.response.status == 422) {
        sbOptions.value = {
          status: true,
          type: "error",
          text: err.response.data.message,
        };
      }
      console.log("err", err);
    });
};
getPmsSettings();

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
</script>
