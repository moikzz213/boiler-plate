<template>
  <v-row>
    <div class="v-col-12 v-col-md-8">
      <v-row>
        <div class="v-col-6">
          <v-autocomplete
            v-model="selectedIndustry"
            :items="industryList"
            item-title="title"
            item-value="title"
            variant="outlined"
            density="compact"
            class="bg-white"
            hide-details
            label="Select Employee"
          >
          </v-autocomplete>
        </div>
        <div class="v-col-6"></div>
        <div class="v-col-12 d-flex justify-end">
          <v-btn color="primary" variant="text" @click="kpi.dialog = false">Cancel</v-btn>
          <v-btn color="primary" class="ml-2 px-8" @click="saveKpi">save</v-btn>
        </div>
      </v-row>
    </div>
    <div class="v-col-12 v-col-md-4 bg-grey-lighten-3"></div>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
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
const selectedIndustry = ref({
  id: 1,
  title: "Healthcare Trading",
});
const saveKpi = () => {
  console.log("saveKpi");
};
</script>
