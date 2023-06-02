<template>
  <v-dialog v-model="kpiData.dialog" width="100%" :max-width="900" persistent>
    <v-card class="rounded-lg">
      <v-row class="ma-0 pa-0">
        <div :class="`v-col-12 ${kpiData.is_review == true ? 'v-col-md-8' : ''} px-4`">
          <v-row>
            <div class="v-col-12">{{ kpiData.title }} {{}}</div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-text-field
                v-model="kpiData.data.title"
                variant="outlined"
                density="compact"
                label="Title*"
                :readonly="props.isHr"
              >
                <template v-slot:selection="{ props, item }">
                  <span v-bind="props">
                    {{ item?.raw?.title.substring(0, 35) + "..." }}
                  </span>
                </template>
              </v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete
                v-model="kpiData.data.industry_id"
                :items="industryStore.industries"
                item-title="title"
                item-value="id"
                variant="outlined"
                density="compact"
                class="bg-white"
                :readonly="props.isHr"
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
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.definition"
                label="KPI Definition*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.formula"
                label="Calculation Formula*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.measures"
                label="Subordinate Measures*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.calculation_example"
                label="KPI Calculation Example*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.evaluation_pattern"
                label="KPI Evaluation Method*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div class="v-col-12 d-flex justify-end">
              <v-btn color="primary" variant="text" @click="kpiData.dialog = false"
                >Cancel</v-btn
              >
              <v-btn
                v-if="props.isHr == false"
                color="primary"
                class="ml-2 px-8"
                @click="saveKpi"
                :loading="kpiData.loading"
                >save</v-btn
              >
              <v-btn v-else color="primary" class="ml-2 px-8" @click="approveKpi"
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
const emit = defineEmits(["save"]);
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
  console.log("approveKpi");
};
watch(
  () => props.kpiOptions,
  (newVal) => {
    selectIndustry();
    kpiData.value = Object.assign({}, newVal);
  }
);
</script>
