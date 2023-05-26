<template>
  <v-dialog
    v-model="kpiData.dialog"
    width="100%"
    :max-width="`${kpiOptions.is_review == true ? '1240' : '900'} `"
    persistent
  >
    <v-card class="rounded-lg">
      <v-row class="ma-0 pa-0">
        <div :class="`v-col-12 ${kpiOptions.is_review == true ? 'v-col-md-8' : ''} px-4`">
          <v-row>
            <div class="v-col-12">{{ kpiData.title }} {{}}</div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete
                v-model="selectedIndustry"
                :items="industryList"
                item-title="title"
                item-value="title"
                variant="outlined"
                density="compact"
                label="Select Industry*"
              >
              </v-autocomplete>
            </div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete
                v-model="selectedKpi"
                :items="kpiList"
                item-title="title"
                item-value="id"
                variant="outlined"
                density="compact"
                label="Select KPI*"
              >
                <template v-slot:selection="{ props, item }">
                  <span v-bind="props">
                    {{ item?.raw?.title.substring(0, 35) + "..." }}
                  </span>
                </template>
              </v-autocomplete>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select
                v-model="kpiData.target_type"
                :items="targetTypeList"
                label="Target Type*"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-text-field
                v-model="kpiData.target"
                label="Target*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select
                v-model="kpiData.measures"
                :items="measuresList"
                label="Measures*"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select
                v-model="kpiData.weightage"
                :items="kpiWeightageList"
                label="KPI's Weightage (%)*"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            <div class="v-col-12 pt-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.definition"
                label="KPI Definition*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.calulation_formula"
                label="Calulation Formula*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.subordinate_measures"
                label="Subordinate Measures*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.calulation_example"
                label="KPI Calulation Example*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.evaluation_method"
                label="KPI Evaluation Method*"
                variant="outlined"
                rows="2"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div v-if="!kpiOptions.is_review" class="v-col-12 d-flex justify-end">
              <v-btn color="primary" variant="text" @click="kpiData.dialog = false"
                >Cancel</v-btn
              >
              <v-btn color="primary" class="ml-2 px-8" @click="saveKpi">save</v-btn>
            </div>
          </v-row>
        </div>
        <div v-if="kpiOptions.is_review" class="v-col-12 v-col-md-4 bg-grey-lighten-4">
          <v-row class="px-3">
            <div class="v-col-12 px-1">{{ "Review" }}</div>
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
              Mid-year Achievement
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.revised_annual_target"
                label="Revised Annual Target*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.mid_year_remainder_target"
                label="Remainder Annual Target*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.mid_year_achievement"
                label="Mid-year Achievement*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.mid_year_target_variation"
                label="Target Variation*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
              Year-year Achievement
            </div>
            <div class="v-col-12 py-0 px-1">
              <v-text-field
                v-model="kpiData.year_end_achievement"
                label="Year-end Achievement*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.year_end_target_variation"
                label="Mid-year Achievement*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field
                v-model="kpiData.year_end_remainder_target"
                label="Target Variation*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div>
            <div class="v-col-12 d-flex justify-end">
              <v-btn
                class="bg-grey-lighten-2 text-primary"
                variant="text"
                @click="kpiData.dialog = false"
                >Cancel</v-btn
              >
              <v-btn v-if="props.submitButton" color="primary" class="ml-2" @click="submitReview">Submit</v-btn>
            </div>
          </v-row>
        </div>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  kpiOptions: {
    type: Object,
    default: null,
  },
  submitButton:{
    type: Boolean,
    default: true
  }
});

// save kpi
const kpiData = ref({});
const kpiList = ref([
  {
    id: 1,
    title:
      "Percentage Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
  },
  {
    id: 2,
    title: "logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
  },
  {
    id: 3,
    title: "Hipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
  },
  {
    id: 4,
    title: "Cost of logistics for shipping orders with healthcare products and equipment",
    industry: "Healthcare Trading",
  },
]);
const selectedKpi = ref(null);
const industryList = ref([
  {
    id: 1,
    title: "Healthcare Trading",
  },
  {
    id: 2,
    title: "IT",
  },
]);
const selectedIndustry = ref(null);
const targetTypeList = ref(["min", "max"]);
const measuresList = ref(["Percentage", "Units"]);
const kpiWeightageList = ref(["5%", "10%", "15%"]);
const saveKpi = () => {
  console.log("saveKpi");
};
const submitReview = () => {
  console.log("submitReview");
};
watch(
  () => props.kpiOptions,
  (newVal) => {
    
    kpiData.value = Object.assign({}, newVal);
    selectedIndustry.value = newVal.action == "edit" ? newVal.data.industry : null;
    selectedKpi.value = newVal.action == "edit" ? newVal.data.kpi_id : null;
  }
);
</script>
