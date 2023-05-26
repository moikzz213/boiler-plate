<template>
  <v-row>
    <div class="v-col-12 v-col-md-2">
      <VueDatePicker v-model="year" year-picker class="pms-date-picker" />
    </div>
    <div class="v-col-12 v-col-md-2">
      <v-btn
        @click="printKPI"
        color="white"
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
            v-if="canManage"
            @click="() => addKPI(selectedTab)"
            density="compact"
            size="35"
            class="rounded-xl elevation-2 mr-2"
            ><v-icon size="small" :icon="mdiPlus"></v-icon
          ></v-btn>
          <div class="text-uppercase text-primary">
            {{ selectedTab }}
          </div>
          <div class="ml-auto text-body-1">Remaining weightage: 25%</div>
        </v-card-title>
        <v-card-text class="px-5 pb-10">
          <v-row v-show="selectedTab == 'kpi'" class="mt-n3">
            <div class="v-col-12 pb-0" v-for="kpi in kpiArray" :key="kpi.id">
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
                        <v-btn
                          color="primary"
                          class="rounded-xl px-5"
                          size="small"
                          @click="() => reviewKPI(kpi, 'kpi')"
                          >review</v-btn
                        >
                        <v-btn
                          v-if="canManage"
                          @click="() => editKPI(kpi, 'kpi')"
                          density="compact"
                          size="30"
                          color="primary"
                          class="rounded-xl elevation-2 ml-1"
                          ><v-icon size="small" :icon="mdiPencil"></v-icon
                        ></v-btn>
                        <v-btn
                          v-if="canManage"
                          @click="() => removeKPI(kpi)"
                          density="compact"
                          size="30"
                          color="primary"
                          class="rounded-xl elevation-2 ml-1"
                          ><v-icon size="small" :icon="mdiTrashCan"></v-icon
                        ></v-btn>
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
            <div class="v-col-12 pb-0" v-for="ecd in ecdArray" :key="ecd.id">
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
                        <v-btn
                          color="primary"
                          class="rounded-xl px-5"
                          size="small"
                          @click="() => reviewKPI(ecd, 'ecd')"
                          >review</v-btn
                        >
                        <v-btn
                          v-if="canManage"
                          @click="() => editKPI(ecd, 'ecd')"
                          density="compact"
                          size="30"
                          color="primary"
                          class="rounded-xl elevation-2 ml-1"
                          ><v-icon size="small" :icon="mdiPencil"></v-icon
                        ></v-btn>
                        <v-btn
                          v-if="canManage"
                          @click="() => removeKPI(ecd)"
                          density="compact"
                          size="30"
                          color="primary"
                          class="rounded-xl elevation-2 ml-1"
                          ><v-icon size="small" :icon="mdiTrashCan"></v-icon
                        ></v-btn>
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
    <v-dialog v-model="toRemoveKpi.dialog" width="100%" max-width="480" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="pa-3">Confirm Remove</v-card-title>
        <v-card-text class="px-3">
          <div class="pb-3 text-grey">
            Please confirm that you want to remove
            <span class="text-primary">{{
              "'" + toRemoveKpi.data.title.substring(0, 35) + "...'"
            }}</span>
          </div>
          <div class="d-flex justify-end mt-5">
            <v-btn
              class="bg-grey-lighten-2 text-primary"
              variant="text"
              @click="toRemoveKpi.dialog = false"
              >Cancel</v-btn
            >
            <v-btn color="primary" class="ml-2" @click="confirmRemoveKpi">Remove</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <KpiDialog :kpi-options="kpiOptions" />
    <EcdDialog :ecd-options="ecdOptions" />
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { mdiPrinter, mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import VueDatePicker from "@vuepic/vue-datepicker";
import KpiDialog from "@/components/kpi/KpiDialog.vue";
import EcdDialog from "@/components/kpi/EcdDialog.vue";
const authStore = useAuthStore();
const props = defineProps({
  selectedEmployee: {
    type: Object,
    default: null,
  },
});
const viewingEmployee = ref({});
watch(
  () => props.selectedEmployee,
  (newVal) => {
    viewingEmployee.value = Object.assign({}, newVal);
    console.log("watch employee", viewingEmployee.value);
  }
);

// tabs
const selectedTab = ref("kpi");
const selectTab = (tab) => {
  selectedTab.value = tab;
};
const canManage = computed(() => {
  return authStore.authRole.includes("manager") && useRoute().name == "SingleTeamMember"
    ? true
    : false;
});

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
    kpi_id: 1,
  },
  {
    id: 2,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
    kpi_id: 3,
  },
  {
    id: 3,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
    kpi_id: 4,
  },
  {
    id: 4,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
    target: "121",
    measures: "Units",
    weightage: "25%",
    kpi_id: 4,
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

// save kpi & ecd
const kpiOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const ecdOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const addKPI = async (type) => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: "Add KPI ",
        data: {},
        dialog: true,
        type: type,
        action: "add",
        is_review: false,
      },
    };
  }
  if (type == "ecd") {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: "Add Technical & Behavioural Program",
        data: {},
        dialog: true,
        type: type,
        action: "add",
        is_review: false,
      },
    };
  }
};
const editKPI = async (item, type = "kpi") => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: "Edit KPI ",
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "edit",
        is_review: false,
      },
    };
  }
  if (type == "ecd") {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: "Edit ECD ",
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "edit",
        is_review: false,
      },
    };
  }
};
const reviewKPI = async (item, type = "kpi") => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "review",
        is_review: true,
      },
    };
  }

  if (type == "ecd") {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "review",
        is_review: true,
      },
    };
  }
};

// remove kpi
const toRemoveKpi = ref({
  data: {},
  dialog: false,
  loading: false,
});
const removeKPI = async (item) => {
  toRemoveKpi.value = {
    ...toRemoveKpi.value,
    ...{
      data: Object.assign({}, item),
      dialog: true,
    },
  };
};
const confirmRemoveKpi = async () => {
  console.log("axios request to client");
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
