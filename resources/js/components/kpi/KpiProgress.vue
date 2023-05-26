<template>
  <v-row class="">
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      > 
        {{ "KPI & Annual Target Setting" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          :class="`${settingMethod('setting','open', reviewSettings)} text-white`"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          :class="`${settingMethod('setting','inprogress', reviewSettings)} text-white`"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          :class="`${settingMethod('setting','inreview', reviewSettings)} text-white`"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          :class="`${settingMethod('setting','submitted', reviewSettings)} text-white`"
          >Submitted</v-chip
        >
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      >
        {{ "Mid Year Review & Revised Target Setting" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Submitted</v-chip
        >
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      >
        {{ "Year End Review and Submission" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Submitted</v-chip
        >
      </div>
    </div>
  </v-row>
</template>
<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps({
  selectedEmployee: {
    type: Object,
    default: null,
  },
  density: {
    type: String,
    default: "",
  },
});

const kpiSettings = ref(props.selectedEmployee);

const reviewSettings = computed(() => {
  if (!kpiSettings.value.reviews || kpiSettings.value.reviews.length == 0) return null;
    return kpiSettings.value.reviews;  
}); 

const settingMethod = (state, status, reviewSettings) => {
   console.log(reviewSettings);
   //bg-grey-darken-1
    if(state == 'setting' && status == 'open' && reviewSettings.status == 'open'){
        return 'bg-secondary';
    }else if(state == 'setting' && status == 'inprogress'){
        return 'bg-secondary';
    }else if(state == 'setting' && status == 'inreview'){
        return 'bg-secondary';
    }else if(state == 'setting' && status == 'submitted'){
        return 'bg-secondary';
    }
}

watch(
  () => props.selectedEmployee,
  (newVal) => {
    kpiSettings.value = Object.assign({}, newVal); 
  }
);
</script>
