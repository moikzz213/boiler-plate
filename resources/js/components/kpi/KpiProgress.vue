<template>
  <v-row class="">

    <div v-for="item, index in states" :key="item.title" class="v-col-12 v-col-md-4">
      <div :class="`${props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`" style="line-height: 1.2em; height: 30px">
        {{ item.title }}
      </div>
    
        <div class="d-flex justify-center" >
          <v-chip style="margin: 0 1px; font-size:10px" v-for="itemStatus, statusIndex in item.status" :key="itemStatus.status"
            :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
            :class="`${printColor(reviewSettings, index, statusIndex)}`">{{
              itemStatus.title }}</v-chip>
        </div>
    </div>
  </v-row>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { useSettingStore } from "@/stores/settings";
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
 
const settingStore = useSettingStore();
const userProfile = ref(props.selectedEmployee);
 
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
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' },  { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'yearend',
      title: 'Year End Review and Submission',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' },  { status: 'submitted', title: 'Submitted' }]
    }
  ];
  let probationStates = [
    {
      state: 'setting',
      title: 'KPI & Probation Target Setting',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' },  { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'first_review',
      title: 'First Probation Review',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' },   { status: 'submitted', title: 'Submitted' }]
    },
    {
      state: 'final_review',
      title: 'Final Probation Review',
      status: [{ status: 'open', title: 'Open' }, { status: 'inprogress', title: 'In Progress' },   { status: 'submitted', title: 'Submitted' }]
    }
  ]

  return userProfile.value && userProfile.value.is_regular ? regularStates : probationStates;
})


const currentDate = ref(new Date());
const printColor = (userState, index, statusIndex) => {
 
  let currentStatus = 0;
//  if(userState.status != 'Active' || (userState && userState.length > 0 && (userState[0].profile.status != 'Active' ))){
//   return '';
//  }
  if(userState && userState.reviews && userState.reviews.length > 0){
    let state = userState.reviews[0].state;
    let status = userState.reviews[0].status;
    let currentState = states.value.findIndex((el) => el.state == state);

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

  } else if(userState && userState.length > 0) {

    let user = userState[0].profile;
    if(user && user.is_regular == 0){
          let probationState = states.value.findIndex((el) => el.state == 'setting');
          let date = new Date(user.doj);

          date.setDate(date.getDate() +  parseInt(userState[0].probation_setting_allow_days));

          if(date >= currentDate.value  && index == probationState){
            currentStatus = states.value[index].status.findIndex((el) => el.status == 'open');
            if (currentStatus == statusIndex) {
              return 'bg-secondary text-white';
            }
          }
      }else{
        let state = userState[0].state;
        let status = userState[0].status;
        let currentState = states.value.findIndex((el) => el.state == state);

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
  }
  return '';
} 
const globalSetting = computed(() => settingStore.filteredSetting(userProfile.value.company_id));

const reviewSettings = computed(() => { 
  if (userProfile.value == null || !userProfile.value.reviews || userProfile.value.reviews.length == 0) {
    return [{
      state: globalSetting.value ? globalSetting.value.state : null,
      status: globalSetting.value ? globalSetting.value.status : null, 
      probation_setting_allow_days: globalSetting.value ? globalSetting.value.probation_kpi_setting : null,
      profile: userProfile.value
      }
    ];
  };

  return userProfile.value;
});

watch(
  () => props.selectedEmployee,
  (newVal) => {
    userProfile.value = Object.assign({}, newVal);
  
  }
);
</script>
