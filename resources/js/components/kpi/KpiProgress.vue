<template>
  <v-row class="">

    <div v-for="item, index in states" :key="item.title" class="v-col-12 v-col-md-4">
      <div :class="`${props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`" style="line-height: 1.2em; height: 30px">
        {{ item.title }}
      </div>
      <div class="d-flex justify-center">
        <v-chip style="margin: 0 1px" v-for="itemStatus, statusIndex in item.status" :key="itemStatus.status"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          :class="`${printColor(reviewSettings, index, statusIndex)}`">{{
            itemStatus.title }}</v-chip>
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
  globalKeystatus:{
    type: Object,
    default: null,
  },
  density: {
    type: String,
    default: "",
  },
});

const currentGlobalKPIStatus = ref(props.globalKeystatus);
 
const states = computed(() => {
  let regularStates = [
    {
      state: 'setting',
      title: 'KPI & Annual Target Setting',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'midyear',
      title: 'Mid Year Review & Revised Target Setting',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'yearend',
      title: 'Year End Review and Submission',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    }
  ];
  let probationStates = [
    {
      state: 'setting',
      title: 'KPI & Annual Target Setting',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'first_review',
      title: 'First Probation Review',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'final_review',
      title: 'Final Probation Review',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' }, { status: 'inreview', title: 'In Review' }, { status: 'submitted', title: 'Submitted' }]
    }
  ]
  
  return kpiSettings.value.is_regular ? regularStates : probationStates;
})

const printColor = (userState, index, statusIndex) => {
  if(userState && userState.length > 0){
    let state = userState[0].state;
    let status = userState[0].status;

    let currentState = states.value.findIndex((el) => el.state == state);
    let currentStatus = 0;
    if (index < currentState) {
      return 'bg-grey-darken-1';
    } else if (index == currentState) {
      currentStatus = states.value[index].status.findIndex((el) => el.status == status);
      if (currentStatus == statusIndex) {
        return 'bg-secondary text-white';
      } else if (statusIndex < currentStatus) {
        return 'bg-grey-darken-1';
      }  
    }  
  } 
  return '';  
}

const kpiSettings = ref(props.selectedEmployee);
 
const reviewSettings = computed(() => {
  if (kpiSettings.value == null || !kpiSettings.value.reviews || kpiSettings.value.reviews.length == 0) {
    return [{
      state: currentGlobalKPIStatus.value.state,
      status: currentGlobalKPIStatus.value.status,
      }
    ];
  };
  return kpiSettings.value.reviews;
});
 
watch(
  () => props.selectedEmployee,
  (newVal) => {
    kpiSettings.value = Object.assign({}, newVal);
  }
);
</script>
