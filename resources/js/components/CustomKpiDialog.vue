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
                v-model="selectedIndustry"
                :items="industryList"
                item-title="title"
                item-value="title"
                variant="outlined"
                density="compact"
                label="Select Industry*"
                :readonly="props.isHr"
              >
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
                v-model="kpiData.data.calulation_formula"
                label="Calulation Formula*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.subordinate_measures"
                label="Subordinate Measures*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.calulation_example"
                label="KPI Calulation Example*"
                variant="outlined"
                rows="2"
                :readonly="props.isHr"
              ></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea
                v-model="kpiData.data.evaluation_method"
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

const kpiData = ref({});
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
const saveKpi = () => {
  console.log("saveKpi");
};
const approveKpi = () => {
  console.log("approveKpi");
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
