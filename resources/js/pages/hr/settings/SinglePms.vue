<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Setup" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-card class="rounded-lg">
          <v-card-title class="d-flex align-center pb-6">
            <div class="text-primary text-capitalize text-h5">New Performance Setting</div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-6">
                <v-autocomplete
                  v-model="pms.data.company"
                  :items="companyList"
                  variant="outlined"
                  density="compact"
                  class="bg-white"
                  label="Select Company"
                  hide-details
                >
                  <template v-slot:selection="{ props, item }">
                    <span v-bind="props">
                      {{ item?.raw?.substring(0, 20) + "..." }}
                    </span>
                  </template>
                </v-autocomplete>
              </div>
              <div class="v-col-12 v-col-md-6">
                <VueDatePicker
                  v-model="pms.data.year"
                  year-picker
                  class="pms-date-picker"
                />
              </div>
            </v-row>
            <v-row class="mt-6">
              <div class="v-col-12 d-flex align-center">
                <div class="mr-3" style="font-size: 18px">Regular Employee</div>
              </div>
              <div class="v-col-12 py-0">
                <v-text-field
                  v-model="pms.data.review_allowed_days"
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
                  :model-value="pms.data.annual_start_date"
                  variant="outlined"
                  density="compact"
                  class="bg-white"
                />
              </div>
              <div class="v-col-12 v-col-md-6 py-0">
                <v-text-field
                  type="date"
                  label="End Date (mm/dd/yyyy)"
                  :model-value="pms.data.annual_end_date"
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
                  :model-value="pms.data.mid_year_start_date"
                  variant="outlined"
                  density="compact"
                  class="bg-white"
                />
              </div>
              <div class="v-col-12 v-col-md-6 py-0">
                <v-text-field
                  type="date"
                  label="End Date (mm/dd/yyyy)"
                  :model-value="pms.data.mid_year_end_date"
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
                  :model-value="pms.data.end_year_start_date"
                  variant="outlined"
                  density="compact"
                  class="bg-white"
                />
              </div>
              <div class="v-col-12 v-col-md-6 py-0">
                <v-text-field
                  type="date"
                  label="End Date (mm/dd/yyyy)"
                  :model-value="pms.data.end_year_end_date"
                  variant="outlined"
                  density="compact"
                  class="bg-white"
                />
              </div>
            </v-row>
            <v-row class="mt-6">
              <div class="v-col-12 d-flex align-center">
                <div class="mr-3" style="font-size: 18px">Probation</div>
              </div>
              <div class="v-col-12 py-0">
                <v-text-field
                  v-model="pms.data.probation_setting_max_allowed_days"
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
                  v-model="pms.data.probation_first_review_start_date"
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
                  v-model="pms.data.probation_first_review_end_date"
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
                  v-model="pms.data.probation_final_review_start_date"
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
                  v-model="pms.data.probation_final_review_end_date"
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
              <v-btn size="x-large" color="primary" class="px-10" @click="saveSetting"
                >save</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import PmsForm from "@/pages/hr/settings/PmsForm.vue";

// PMS
const pms = ref({
  title: "Add PMS Setting",
  dialog: true,
  data: {
    year: new Date().getFullYear(),
  },
  loading: false,
});
const pmsList = ref([]);
const getPmsSettings = async () => {
  await clientApi
    .get("/hr/employees/paginated")
    .then((res) => {
      pmsList.value = res.data.data;
    })
    .catch((err) => {
      console.log("getEmployees", err);
    });
};
getPmsSettings();

const addPms = () => {
  pms.value = {
    ...pms.value,
    ...{
      title: "Add PMS Setting",
      data: {},
      dialog: true,
    },
  };
};
const editPms = (item) => {
  pms.value = {
    ...pms.value,
    ...{
      title: "Edit PMS Setting",
      data: Object.assign({}, item),
      dialog: true,
    },
  };
};
const removePms = () => {
  console.log("open remove kpi in a dialog");
};
const saveSetting = () => {
  console.log("saveSetting");
};

// filter
const filter = ref({
  company: "Ghassan Aboud Group FZE",
  year: new Date().getFullYear(),
});
const companyList = ref([
  "Ghassan Aboud Group FZE",
  "Grandiose Supermarket",
  "Grandiose Catering",
  "Gallega",
]);
const filterPms = () => {
  console.log("filter", filter.value);
};
</script>
