<template>
  <v-row>
    <div class="v-col-12 v-col-md-2">
      <VueDatePicker v-model="year" year-picker class="pms-date-picker" />
    </div>
    <div class="v-col-12 v-col-md-2">
      <v-btn
        @click="printKPI"
        color="white"
        :loading="loadingLogin"
        class="text-capitalize"
        >Print KPI <v-icon :icon="mdiPrinter" class="ml-3"> </v-icon
      ></v-btn>
    </div>
    <div class="v-col-12">
      <div class="d-flex align-center px-3">
        <v-card
          @click="() => selectTab('kpi')"
          flat
          :class="`
          ${selectedTab == 'kpi' ? '' : 'bg-grey-darken-3 text-white'}
          d-flex align-center justify-center px-3 text-center pms-tab`"
        >
          KPI {{ "(" + kpiArray.length + ")" }}
        </v-card>
        <v-card
          @click="() => selectTab('ecd')"
          flat
          :class="`${
            selectedTab == 'ecd' ? '' : 'bg-grey-darken-3 text-white'
          } d-flex align-center justify-center px-3 text-caption text-center pms-tab`"
        >
          Employee Capability Development {{ "(" + ecdArray.length + ")" }}
        </v-card>
        <div class="ml-auto text-h6">Rate: 4</div>
      </div>
      <v-card flat>
        <v-card-title class="px-5 py-5 d-flex align-center">
          <v-btn
            @click="() => addKPI(selectedTab)"
            density="compact"
            size="35"
            class="rounded-xl elevation-2 mr-2"
            ><v-icon size="small" :icon="mdiPlus"></v-icon
          ></v-btn>
          <div class="text-uppercase text-primary">
            {{ selectedTab }}
          </div>
          <div class="ml-auto">Remaining weightage: 25%</div>
        </v-card-title>
        <v-card-text class="px-5 pb-5">
          <v-row v-show="selectedTab == 'kpi'" class="mt-n3">
            <div class="v-col-12" v-for="kpi in kpiArray" :key="kpi.id">
              <v-card class="rounded-lg">
                <v-card-text>
                  <v-row>
                    <div class="v-col-12 pb-0 d-flex justify-space-between">
                      <div>
                        <div class="text-grey text-caption">KPI</div>
                        <div class="text-primary text-body-1">
                          {{ kpi.title }}
                        </div>
                      </div>
                      <div>
                        <v-btn color="primary" class="rounded-xl px-5" size="small"
                          >review</v-btn
                        >
                      </div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">Industry</div>
                      <div class="text-primary text-body-1">{{ kpi.industry }}</div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">Target</div>
                      <div class="text-primary text-body-1">{{ kpi.target }}</div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">Measure</div>
                      <div class="text-primary text-body-1">{{ kpi.measures }}</div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
                      <div class="text-primary text-body-1">{{ kpi.weightage }}</div>
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </v-row>
          <v-row v-show="selectedTab == 'ecd'" class="mt-n3">
            <div class="v-col-12" v-for="ecd in ecdArray" :key="ecd.id">
              <v-card class="rounded-lg">
                <v-card-text>
                  <v-row>
                    <div class="v-col-12 pb-0 d-flex justify-space-between">
                      <div>
                        <div class="text-grey text-caption">Training</div>
                        <div class="text-primary text-body-1">
                          {{ ecd.title }}
                        </div>
                      </div>
                      <div>
                        <v-btn color="primary" class="rounded-xl px-5" size="small"
                          >review</v-btn
                        >
                      </div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
                      <div class="text-primary text-body-1">
                        {{ ecd.weightage }}
                      </div>
                    </div>
                    <div class="v-col-3">
                      <div class="text-grey text-caption">Type</div>
                      <div class="text-primary text-body-1">
                        {{ ecd.type }}
                      </div>
                    </div>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-row>
</template>

<script setup>
import { watch, ref } from "vue";
import { mdiPrinter, mdiPlus } from "@mdi/js";
import VueDatePicker from "@vuepic/vue-datepicker";
// import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  selectedEmployee: {
    type: Object,
    default: null,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
});
console.log("props.isManager", props.isManager);
const employee = ref({});
watch(
  () => props.selectedEmployee,
  (newVal) => {
    employee.value = Object.assign({}, newVal);
    console.log("watch employee", employee.value);
  }
);

// tabs
const selectedTab = ref("kpi");
const selectTab = (tab) => {
  selectedTab.value = tab;
  console.log("selectedTab", selectedTab.value);
};

// kpi
const year = ref(new Date().getFullYear());
const kpiArray = ref([
  {
    id: 1,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
  },
  {
    id: 2,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
  },
  {
    id: 3,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
  },
  {
    id: 4,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
  },
]);
const ecdArray = ref([
  {
    id: 1,
    title: "Organizational Behaviour - Personality and Learning",
    type: "Technical",
    weightage: "25%",
  },
  {
    id: 2,
    title: "Email Etiquettes",
    type: "Soft Skill",
    weightage: "10%",
  },
  {
    id: 3,
    title: "Intrapersonal and Interpersonal Communication",
    type: "Technical, Soft Skill",
    weightage: "10%",
  },
]);
const printKPI = () => {
  // opens kpi slug in new window
  console.log("printKPI route");
};
const getKPI = async () => {
  console.log("get kpi");
};
watch(year, async (newVal, oldVal) => {
  getKPI();
});

// add kpi
const addKPI = async (type) => {
  console.log("addKPI", type);
};
</script>

<style>
.pms-tab {
  width: 150px;
  height: 60px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.pms-tab:hover > .v-card__overlay {
  display: none;
}
</style>
