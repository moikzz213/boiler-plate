<template>
  <v-container class="pb-16"> 
    <v-row class="mt-5">
      <div class="v-col-12 pb-0">
        <div class="text-h6">
          My Team {{ "(" + authStore.authProfile.teams.length + ")" }}
        </div>
      </div>
      <div class="v-col-12 v-col-md-3">
        <v-text-field
          v-model="filter.data.employee"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          clearable
          label="Input Employee Code"
          @keydown.enter="runFilter"
          @click:clear="clearField"
        >
        </v-text-field>
      </div>
      <div class="v-col-12 v-col-md-3">
        <v-select
          v-model="filter.data.employee_type"
          :items="employeeTypeList" 
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Select Employee Type"
        >
        </v-select>
      </div>
      <div class="v-col-12 v-col-md-2">
        <v-btn @click="runFilter" block color="primary" class="text-capitalize"
          >Filter</v-btn
        >
      </div>
      <div class="v-col-12 v-col-md-2 ml-auto d-flex align-center justify-end">
        <div class="text-h6">Year: 2023</div>
      </div>
    </v-row>
    <v-row>
      <div v-if="managerTeam.length > 0" class="v-col-12">
        <v-card
          v-for="user in managerTeam"
          :key="user.id"
          class="mb-3 elevation-0"
          @click="() => openMember(user)"
        >
          <!-- @click="() => openMember('SingleTeamMember', { id: user.id })" -->
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3">
                <EmployeeCard :profile="user" />
              </div>
              <div class="v-col-12 v-col-md-8">
                <KpiProgress :density="'compact'" :selected-employee="user"/>
              </div>
              <div class="v-col-12 v-col-md-1 d-flex justify-end align-center"> 
               
                <div v-if="settingStore.pmsSettings && settingStore.pmsSettings.state != 'yearend' || (user.reviews && user.reviews.length > 0 && user.reviews[0].type == 'probation' && user.reviews[0].state != 'final_review')">
                  <div>
                    
                    {{ ratingOrWeightage(user) }} / 100
                  </div>
                  <div class="text-caption text-grey">Total KPI</div>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div v-else class="v-col-12">
        <v-card>
          <v-card-text class="text-center"> No records found </v-card-text>
        </v-card>
      </div>
    </v-row>
    <v-dialog v-model="dialogOpenMember" width="450">
      <v-card class="rounded-lg">
        <v-card-title>
          Do you want to set KPI for {{ selectedUser.username }}?
        </v-card-title>
        <div class="pa-3 mt-3 d-flex justify-end">
          <v-btn color="primary" variant="text" @click="dialogOpenMember = false"
            >Cancel</v-btn
          >
          <v-btn color="primary" class="ml-2 px-8" @click="confirmOpenMember">yes</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="noKPIEmployee" width="450">
      <v-card class="rounded-lg">
        <v-card-text>
          {{ errorMessage }}
        </v-card-text>
        <div class="pa-3 mt-3 d-flex justify-end">
          <v-btn color="primary" variant="text" @click="noKPIEmployee = false"
            >Close</v-btn > 
        </div>
      </v-card>
    </v-dialog>
    <SnackBar :options="sbOptions" />
  </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { clientApi } from "@/services/clientApi";
import { useSettingStore } from "@/stores/settings";
import SnackBar from "@/components/SnackBar.vue";
const router = useRouter();
const openPage = (pathName, openParams = null) => {
  let paramsValue = openParams ? Object.assign({}, openParams) : false;
  router
    .push({
      name: pathName,
      params: paramsValue,
    })
    .catch((err) => {});
};

const sbOptions = ref({});
// authenticated user object
const authStore = useAuthStore();
const settingStore = useSettingStore();
 
const managerTeam = ref(authStore.authProfile.teams); 

const year = ref(new Date().getFullYear());
const currentDate = ref(new Date());
// filter employee
const employeeTypeList = ref(["All","Regular", "Probation"]);
const errorMessage = ref('Employee doesn`t have a KPI review setup for this year.');
const filter = ref({
  data: {
    employee: "",
    employee_type: "All",
  },
});
const runFilter = async () => { 
  filterTeamMethod(); 
};

const ratingOrWeightage = (user) => {
  let sum = 0 ;
  if(user.reviews && user.reviews.length > 0 && user.reviews[0].key_review){   
    user.reviews[0].key_review.map((o,i) =>{
      sum += o.weightage;
    });
  }
  return sum;
};
// open team member
const selectedUser = ref({});
const dialogOpenMember = ref(false);
const noKPIEmployee = ref(false);

const clearField = () => { 
  filter.value.data.employee = '';
  managerTeam.value = authStore.authProfile.teams;
};

const confirmOpenMember = () => {
  clientApi(authStore.authToken)
    .post('/api/create/employee-review/year', 
    { ecode: selectedUser.value.ecode, 
      is_regular: selectedUser.value.is_regular, 
      setting: settingStore.filteredSetting(selectedUser.value.company_id), 
      year: year.value,
      author: authStore.authProfile.display_name + " " + authStore.authProfile.ecode
    })
    .then((res) => {  
      sbOptions.value = {
        status: true,
        type: "success",
        text: res.data.message,
      };
    });

    clientApi(authStore.authToken)
    .get('/api/fetch/auth-profile/kpi/'+authStore.authProfile.ecode 
     )
    .then((res) => { 
      authStore.setProfile(res.data.result).then(()=>{
        openPage("SingleTeamMember", { id: selectedUser.value.ecode });
      }); 
    })
    .catch((err) => {

    });  

  // redirect to SingleTeamMember
  
};
const openMember = (user) => {
  let msgError = 'KPI review is currently closed';
  let statusGlobalSettings = settingStore.filteredSetting(user.company_id);
  selectedUser.value = Object.assign({}, user);
  if(user.reviews && user.reviews.length > 0){
    if(user.is_regular == 1 && user.reviews[0].status =='locked' && user.reviews[0].state == 'closed'){
      errorMessage.value = msgError;
      noKPIEmployee.value = true;
    }else{
      openPage("SingleTeamMember", { id: user.ecode }); 
    }
  }else{
    if(statusGlobalSettings.status == 'open' && statusGlobalSettings.state == 'setting'){
      dialogOpenMember.value = true;
    }else{
      if(user.is_regular == 0){
          let date = new Date(user.doj);
          date.setDate(date.getDate() + parseInt(statusGlobalSettings.probation_kpi_setting));
           
          if(date >= currentDate.value){
            dialogOpenMember.value = true;
          }else{
            noKPIEmployee.value = true;
          }
      }else{ 
        if(statusGlobalSettings.status =='locked' && statusGlobalSettings.state == 'closed'){
          errorMessage.value = msgError;
        }
        noKPIEmployee.value = true;
      }
    }
  } 
}; 

const filterTeamMethod = () => { 
  let result = authStore.authProfile.teams.filter(function(el) {
      if(filter.value.data.employee){
          return el.ecode == filter.value.data.employee;
      }else if(filter.value.data.employee_type == 'Probation'){
          return el.is_regular == 0;
      }else if(filter.value.data.employee_type  == 'Regular'){
          return el.is_regular == 1;
      }else{
          return el;
      }
    }); 
    managerTeam.value = result; 
};
</script>