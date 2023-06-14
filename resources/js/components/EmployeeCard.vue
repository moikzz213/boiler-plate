<template>
  <div class="d-flex align-center">
    <v-avatar color="grey-lighten-1" size="55">
      <div class="text-primary" style="font-size: 20px; line-height: 20px">
        {{ printInitials(profileKPI.display_name) }}
      </div>
    </v-avatar>
    <div class="pl-2">
      <div class="text-capitalize mb-1" style="font-size: 12px; line-height: 14px">
        {{ profileKPI.display_name }}
        {{ profileKPI.ecode ? " (" + profileKPI.ecode + ")" : "" }}
      </div>
      <div style="font-size: 10px; line-height: 12px">
        {{ profileKPI.designation }}
      </div>
      <div class="d-flex align-center">
        <v-icon size="16"
          :color="`${employeeKPIStatus == 'locked' || employeeKPIStatus == 'closed' ? 'error' : 'success'}`"
          :icon="mdiCircleMedium"></v-icon>
        <div style="font-size: 10px; line-height: 12px">
          {{ employeeKPIStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { printInitials } from "@/composables/printInitials";
import { mdiCircleMedium } from "@mdi/js";
import { useSettingStore } from "@/stores/settings";
const settingStore = useSettingStore();

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
});

const profileKPI = ref({
  display_name: "Steve Ayala",
  designation: "Sr. Full Stack Software Developer",
  ecode: "100194",
  status: "locked",
});

const currentDate = ref(new Date());
 
const employeeKPIStatus = computed(() => { 
  if (props.profile && props.profile.length > 0) {
    profileKPI.value = props.profile[0];
  } else {
    profileKPI.value = props.profile;
  }

  if (profileKPI.value && profileKPI.value.reviews && profileKPI.value.reviews.length > 0) {
    return profileKPI.value.reviews[0].status;
  } else {
    let isKPISetByCompany = settingStore.filteredSetting(profileKPI.value.company_id);
    
    if (isKPISetByCompany && isKPISetByCompany.id) {
      if (profileKPI.value.is_regular == 0) {
        let date = new Date(profileKPI.value.doj);
        date.setDate(date.getDate() + parseInt(res.probation_kpi_setting));
        if (date >= currentDate.value) {
          return 'open' ;
        }
      }  
      return isKPISetByCompany.status; 
    }  
    return 'locked';
  }
});

watch(
  () => props.profile,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      profileKPI.value = newVal[0];
    } else {
      profileKPI.value = newVal;
    }
  }
);
</script>
