<template>
  <v-dialog
    v-model="kpiData.dialog"
    width="100%"
    :max-width="kpiData.type == 'ecd' ? 600 : 900"
    persistent
  >
    <v-card class="rounded-lg">
      <v-row class="ma-0 pa-0">
        <div :class="`v-col-12 ${kpiData.is_review == true ? 'v-col-md-8' : ''} px-4`">
          <v-row>
            <div class="v-col-12">{{ kpiData.title }} {{}}</div>
            <div
              v-if="enableOn(['ecd', 'kpi'])"
              :class="`v-col-12 ${
                kpiData.type == 'ecd' ? 'v-col-md-12' : 'v-col-md-6'
              }  py-0`"
            >
            
              <v-text-field
                v-model="kpiData.data.title"
                variant="outlined"
                density="compact"
                label="Title*"
              >
                <template v-slot:selection="{ props, item }">
                  <span v-bind="props">
                    {{ item?.raw?.title.substring(0, 35) + "..." }}
                  </span>
                </template>
              </v-text-field>
            </div>
            <div
              v-if="enableOn(['ecd'])"
              :class="`v-col-12 ${
                kpiData.type == 'ecd' ? 'v-col-md-12' : 'v-col-md-6'
              }  py-0`"
            >
              <v-select
                v-model="kpiData.data.ecd_type"
                :items="['tech', 'soft', 'both']"
                variant="outlined"
                density="compact"
                class="bg-white"
                hide-details
                label="Select Type"
              >
              </v-select>
            </div>
            <div v-if="enableOn(['kpi'])" class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete
                v-model="kpiData.data.industry_id"
                :items="industryStore.active_industries"
                item-title="title"
                item-value="id"
                variant="outlined"
                density="compact"
                class="bg-white"
                hide-details
                :label="loadingIndustry ? 'Loading...' : 'Select Industry'"
                :loading="loadingIndustry"
                @focus="selectIndustry"
              >
                <template v-slot:selection="{ props, item }">
                  <span v-bind="props">
                    {{
                      item.raw.title && item.raw.title.length > 30
                        ? item.raw.title.substring(0, 30) + "..."
                        : item.raw.title
                    }}
                  </span>
                </template>
              </v-autocomplete>
            </div>
            <div v-if="enableOn(['kpi'])" class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.definition"
                label="KPI Definition*"
                variant="outlined"
                rows="2"
              ></v-textarea>
              <!-- :readonly="props.isHr" -->
            </div>
            <div v-if="enableOn(['kpi'])" class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.formula"
                label="Calculation Formula*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div v-if="enableOn(['kpi'])" class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.subordinate_measures"
                label="Subordinate Measures*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <!-- <div v-if="enableOn(['kpi'])" class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.calculation_example"
                label="KPI Calculation Example*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div> -->
            <div class="v-col-12 py-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div class="v-col-12 d-flex justify-end">
              <v-btn
                v-if="kpiData.action == 'view'"
                color="primary"
                @click="kpiData.dialog = false"
                >Close</v-btn
              >
              <v-btn
                v-if="['edit', 'add', 'approve'].includes(kpiData.action) == true"
                color="primary"
                variant="text"
                @click="kpiData.dialog = false"
                >Cancel</v-btn
              >
             
              <v-btn 
                v-if="['edit', 'add'].includes(kpiData.action) == true  && kpiData.data.title && ( enableOn(['kpi']) && kpiData.data.industry_id || (enableOn(['ecd']) && kpiData.data.ecd_type))"
                color="secondary"
                class="ml-2 px-8"
                @click="saveKpi"
                :loading="kpiData.loading"
                >save</v-btn
              >
              <v-btn
                v-if="kpiData.action == 'approve'"
                color="secondary"
                class="ml-2 px-8"
                :loading="kpiData.loading"
                @click="approveKpi"
                >Approve</v-btn
              >
            </div>
          </v-row>
        </div>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useIndustryStore } from "@/stores/industry";
import { useRoute } from "vue-router";
const route = useRoute();
const emit = defineEmits(["save", "approve"]);
const props = defineProps({
  kpiOptions: {
    type: Object,
    default: null,
  },
  isHr: {
    type: Boolean,
    default: false,
  },
});

const authStore = useAuthStore();

const kpiData = ref({
  title: "",
  data: {},
  dialog: false,
  loading: false,
  type: "",
  action: "",
  is_review: false,
});

// industries
const industryStore = useIndustryStore();
const loadingIndustry = ref(false);
const selectIndustry = () => {
  if (industryStore.industries.length == 0) {
    loadingIndustry.value = true;
    industryStore.getIndustries(authStore.authToken).then(() => {
      loadingIndustry.value = false;
    });
  }
};

const saveKpi = () => {
  kpiData.value.loading = true;
  emit("save", kpiData.value.data);
};
const approveKpi = () => {
  kpiData.value.loading = true;
  emit("approve", kpiData.value.data);
};
watch(
  () => props.kpiOptions,
  (newVal) => {
    selectIndustry();
    kpiData.value = Object.assign({}, newVal);
  }
);

// check type
const enableOn = (typeArray) => {
  return typeArray.includes(kpiData.value.type) == true ? true : false;
};
</script>
