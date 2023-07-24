<template>
  <v-row>
    <div class="v-col-12 v-col-md-2">
      <VueDatePicker v-model="year" year-picker class="pms-date-picker" />
    </div>
    <div class="v-col-12 v-col-md-2"> 
      <v-btn v-if="viewingEmployee && viewingEmployee.reviews && viewingEmployee.reviews.length > 0" @click="printKPI" color="white" class="text-capitalize text-md-caption text-lg-body-2">View/Print<v-icon
          :icon="mdiPrinter" class="ml-1"> </v-icon></v-btn>
    </div>
    <div class="v-col-12">
      <div class="d-flex align-center px-3">
        <v-card @click="() => selectTab('kpi')" flat :class="`
          ${selectedTab == 'kpi' ? '' : 'bg-grey-darken-3 text-white'}
          d-flex align-center justify-center px-3 text-center pms-tab`">
          KPI {{ kpiArray ? "(" + kpiArray.length + ")" : "(" + 0 + ")" }}
        </v-card>
        <v-card v-if="viewingEmployee && viewingEmployee.is_regular" @click="() => selectTab('ecd')" flat :class="`${selectedTab == 'ecd' ? '' : 'bg-grey-darken-3 text-white'
          } d-flex align-center justify-center px-3 text-caption text-center pms-tab`">
          Employee Capability Development {{ "(" + ecdArray.length + ")" }}
        </v-card>
        
        <!-- Final Rating here -->
        <!-- <div class="ml-auto text-h6" v-if="viewingEmployee && viewingEmployee.reviews && viewingEmployee.reviews.length > 0 && viewingEmployee.reviews[0].state == 'yearend' && viewingEmployee.reviews[0].status =='submitted'">Rate: Coming Soon</div> -->
      </div>
      <v-card flat>
        <v-card-title class="px-5 py-5 d-flex align-center">
          <v-btn v-if="canManage && selectedTab == 'kpi'" @click="() => addKPI(selectedTab)" density="compact" size="35"
            class="rounded-xl elevation-2 mr-2"><v-icon size="small" :icon="mdiPlus"></v-icon></v-btn>
          <div class="text-uppercase text-primary"
            v-if="(selectedTab == 'kpi' && kpiArray && kpiArray.length > 0) || selectedTab == 'ecd' && ecdArray && ecdArray.length > 0">
            {{ selectedTab == 'ecd' ? 'Employee Capability Development' : selectedTab }} List
          </div>
          <div v-else-if="!canManage" class="text-uppercase text-center" style="display: block !important; width:100%;">
            {{ selectedTab }} not set
          </div>
          <div v-else class="text-uppercase text-center">
            {{ selectedTab == 'ecd' ? 'Employee Capability Development' : (viewingEmployee.is_regular ? selectedTab : 'Probation KPI') }} List
          </div>
          <div v-if="canManage && ratingOrWeightage(selectedTab) > 0" class="ml-auto text-body-1">Remaining {{ selectedTab.toUpperCase() }} weightage: {{ ratingOrWeightage(selectedTab) }}%</div>
        </v-card-title>
        <v-card-text class="px-5 pb-10">
            <v-row v-if="hasError" class="mb-2">
            <div class="v-col-12 pb-0"  >
                  <v-card class="rounded-lg" style="border:2px solid red">
                    <v-card-text>
                      <v-row>
                        <div class="v-col-12"> 
                          <v-icon size="large" color="red" class="mr-1"
                                :icon="mdiAlert "></v-icon>
                          {{errorMessage}}
                          </div>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
            </v-row>
            <v-row v-show="selectedTab == 'kpi'" class="mt-3">
              <template v-if="kpiArray && kpiArray.length > 0">
                <div class="v-col-12 pb-0" v-for="kpi in kpiArray" :key="kpi.id">
                  <v-card class="rounded-lg content-card">
                    <v-card-text>
                      <v-row>
                        <div class="v-col-12 pb-0 d-flex justify-space-between">
                          <div>
                            <div class="text-grey text-caption">KPI</div>
                            <div class="text-primary text-body-1">
                              {{ kpi.title }}
                            </div>
                          </div>
                          <div>  
                            
                            <v-btn v-if="!isReviewStage && isNotDashboard" @click="() => viewKPI(kpi, 'kpi')" density="compact" 
                              color="primary" class="rounded-xl elevation-2 ml-1 text-caption">
                              View<v-icon size="small" :icon="mdiEye"  class="ml-1"></v-icon></v-btn>

                            <v-btn v-if="isReviewStage" color="secondary" class="rounded-xl px-5 " size="small"
                              @click="() => reviewKPI(kpi, 'kpi')">review</v-btn>
                            <v-btn v-if="canManage" @click="() => editKPI(kpi, 'kpi')" density="compact" 
                              color="teal" class="rounded-xl elevation-2 ml-1 text-caption">Edit<v-icon size="small"  class="ml-1"
                                :icon="mdiPencil"></v-icon></v-btn>
                            <v-btn v-if="canManage" @click="() => removeKPI(kpi)" density="compact"  
                              color="error" class="rounded-xl elevation-2 ml-1 text-caption">Delete<v-icon size="small" class="ml-1"
                                :icon="mdiTrashCan"></v-icon></v-btn>
                          </div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">Industry</div>
                          <div class="text-primary text-body-1">{{ kpi.industry }}</div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">Target ({{ kpi.target_type }})</div>
                          <div class="text-primary text-body-1"> {{ kpi.target }}</div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">Measure</div>
                          <div class="text-primary text-body-1">{{ kpi.measures }}</div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
                          <div class="text-primary text-body-1">{{ kpi.weightage }}%</div>
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
              </template>
              <div class="v-col-12 pb-0 text-center" v-else> 
                        No records yet. 
              </div>
            </v-row>
            <v-row v-show="selectedTab == 'ecd'" class="mt-n3">

            <!-- Start Technical Skill -->
            <div class="v-col-6 pb-0"><v-btn v-if="canManage" @click="() => addKPI(selectedTab,'tech')" density="compact" size="35"
            class="rounded-xl elevation-2 mr-2"><v-icon size="small" :icon="mdiPlus"></v-icon></v-btn><span v-if="canManage">Technical Skill</span></div>
            <div class="v-col-6 pb-0"><v-btn v-if="canManage" @click="() => addKPI(selectedTab, 'soft')" density="compact" size="35"
            class="rounded-xl elevation-2 mr-2"><v-icon size="small" :icon="mdiPlus"></v-icon></v-btn> <span v-if="canManage">Soft Skill</span></div>
            <div class="v-col-6 pb-0"> 
              <v-row>
                <div class="v-col-12 pb-0" v-for="ecd in ecdTechnicalSkillArray" :key="ecd.id">
                  <v-card class="rounded-lg">
                    <v-card-text>
                      <v-row>
                        <div class="v-col-12 pb-0 d-flex justify-space-between">
                          <div>
                            <div class="text-grey text-caption">Training</div>
                            <div class="text-primary text-body-1">
                              {{ ecd.title }}
                            </div>
                          </div>
                          <div> 
                            <v-btn v-if="!isReviewStage && isNotDashboard" @click="() => viewKPI(ecd, 'ecd')" density="compact" 
                              color="primary" class="rounded-xl elevation-2 ml-1 text-caption">
                              View<v-icon size="small" :icon="mdiEye"  class="ml-1"></v-icon></v-btn> 
                            <!-- <v-btn v-if="isReviewStage" color="secondary" class="rounded-xl px-5 " size="small"
                              @click="() => reviewKPI(ecd, 'ecd')">review</v-btn> -->
                            <v-btn v-if="canManage" @click="() => editKPI(ecd, 'ecd', 'tech')" density="compact" 
                              color="teal" class="rounded-xl elevation-2 ml-1 text-caption">Edit<v-icon size="small"  class="ml-1"
                                :icon="mdiPencil"></v-icon></v-btn>
                            <v-btn v-if="canManage" @click="() => removeKPI(ecd)" density="compact"  
                              color="error" class="rounded-xl elevation-2 ml-1 text-caption">Delete<v-icon size="small" class="ml-1"
                                :icon="mdiTrashCan"></v-icon></v-btn>
                          </div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
                          <div class="text-primary text-body-1">
                            {{ ecd.weightage }}
                          </div>
                        </div>
                        <div class="v-col-3">
                          <div class="text-grey text-caption">Type</div>
                          <div class="text-primary text-body-1">
                            {{ ecd.ecd_type }}
                          </div>
                        </div>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </div>
              </v-row>
            </div>
            <!-- End Technical Skill -->
            <!-- Start Soft Skill -->
            <div class="v-col-6 pb-0">
              <v-row>
              <div class="v-col-12 pb-0" v-for="ecd in ecdSoftSkillArray" :key="ecd.id">
                <v-card class="rounded-lg">
                  <v-card-text>
                    <v-row>
                      <div class="v-col-12 pb-0 d-flex justify-space-between">
                        <div>
                          <div class="text-grey text-caption">Training</div>
                          <div class="text-primary text-body-1">
                            {{ ecd.title }}
                          </div>
                        </div>
                        <div> 
                          <v-btn v-if="!isReviewStage && isNotDashboard" @click="() => viewKPI(ecd, 'ecd')" density="compact" 
                              color="primary" class="rounded-xl elevation-2 ml-1 text-caption">
                              View<v-icon size="small" :icon="mdiEye"  class="ml-1"></v-icon></v-btn> 
                            <!-- <v-btn v-if="isReviewStage" color="secondary" class="rounded-xl px-5 " size="small"
                              @click="() => reviewKPI(ecd, 'ecd')">review</v-btn> -->
                            <v-btn v-if="canManage" @click="() => editKPI(ecd, 'ecd', 'soft')" density="compact" 
                              color="teal" class="rounded-xl elevation-2 ml-1 text-caption">Edit<v-icon size="small"  class="ml-1"
                                :icon="mdiPencil"></v-icon></v-btn>
                            <v-btn v-if="canManage" @click="() => removeKPI(ecd)" density="compact"  
                              color="error" class="rounded-xl elevation-2 ml-1 text-caption">Delete<v-icon size="small" class="ml-1"
                                :icon="mdiTrashCan"></v-icon></v-btn>
                        </div>
                      </div>
                      <div class="v-col-3">
                        <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
                        <div class="text-primary text-body-1">
                          {{ ecd.weightage }}
                        </div>
                      </div>
                      <div class="v-col-3">
                        <div class="text-grey text-caption">Type</div>
                        <div class="text-primary text-body-1">
                          {{ ecd.ecd_type }}
                        </div>
                      </div>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-row>
          </div>
            <!-- End Soft Skill -->
          </v-row>
        </v-card-text>
      </v-card>
      
    </div>
    <v-dialog v-model="toRemoveKpi.dialog" width="100%" max-width="480" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="pa-3">Confirm Remove</v-card-title>
        <v-card-text class="px-3">
          <div class="pb-3 text-grey">
            Please confirm that you want to remove
            <span class="text-primary">{{
              "'" + toRemoveKpi.data.title.substring(0, 35) + "...'"
            }}</span>
          </div>
          <div class="d-flex justify-end mt-5">
            <v-btn class="bg-grey-lighten-2 text-primary" variant="text"
              @click="toRemoveKpi.dialog = false">Cancel</v-btn>
            <v-btn color="primary" class="ml-2" @click="confirmRemoveKpi">Remove</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    
    <KpiDialog :created-kpi-title="createdKpis" :final-review="isFinalReview" :measures-list="measuresList" :kpi-options="kpiOptions" :remain-weightage="ratingOrWeightage(selectedTab)" :industry-list="industryList"  :submit-button="props.submitButton"  @savedResponse="savedResponseMethod"/>
    <EcdDialog :created-kpi-title="createdKpis" :final-review="isFinalReview" :ecd-options="ecdOptions" :remain-weightage="ratingOrWeightage(selectedTab)" :ecd-list="ecdList" :submit-button="props.submitButton" @savedResponse="savedResponseMethod"/>
    <SnackBar :options="sbOptions" />
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { mdiPrinter, mdiPlus, mdiPencil, mdiTrashCan,mdiEye } from "@mdi/js";
import VueDatePicker from "@vuepic/vue-datepicker";
import KpiDialog from "@/components/kpi/KpiDialog.vue";
import EcdDialog from "@/components/kpi/EcdDialog.vue";
import { useRouter, useRoute} from "vue-router";
import { useSettingStore } from "@/stores/settings";
import SnackBar from "@/components/SnackBar.vue";
import { mdiAlert  } from '@mdi/js';

const router = useRouter();
const route = useRoute();
const kpiEmit = defineEmits(['yearchange', 'savedResponse', 'errorcheck']); 
 
const authStore = useAuthStore();
const props = defineProps({
  selectedEmployee: {
    type: Object,
    default: null,
  },
  industryList: {
    type: Object,
    default: null
  },
  ecdList: {
    type: Object,
    default: null
  },
  submitButton: {
    type: Boolean,
    default: true
  },
  measuresList:{
    type:Object,
    default: null
  }
});

const sbOptions = ref({});
const settingStore = useSettingStore();
const viewingEmployee = ref(props.selectedEmployee);
const createdKpis = computed(() => {
  let data = [];
  if(viewingEmployee.value && viewingEmployee.value.reviews && viewingEmployee.value.reviews[0] && viewingEmployee.value.reviews[0].key_review.length > 0){
    data = viewingEmployee.value.reviews[0].key_review.map((kpi) =>  kpi.title)
  }
  
  return data;
});
 
const kpiArray = computed(() => { 
  if (!viewingEmployee.value || (viewingEmployee.value && (!viewingEmployee.value.reviews || viewingEmployee.value.reviews.length == 0))) return [];
  return viewingEmployee.value.reviews[0].key_review.filter((kpi) => kpi.type == 'kpi'); 
});

const ecdArray = computed(() => {
  if (!viewingEmployee.value || (viewingEmployee.value && (!viewingEmployee.value.reviews || viewingEmployee.value.reviews.length == 0))) return [];
    return viewingEmployee.value.reviews[0].key_review.filter((kpi) => kpi.type == 'ecd');  
});

const ecdTechnicalSkillArray = computed(() => {
  if (!viewingEmployee.value || (viewingEmployee.value && (!viewingEmployee.value.reviews || viewingEmployee.value.reviews.length == 0))) return [];
    return viewingEmployee.value.reviews[0].key_review.filter((kpi) => kpi.type == 'ecd' && kpi.ecd_type == 'tech');  
});

const ecdSoftSkillArray = computed(() => {
  if (!viewingEmployee.value || (viewingEmployee.value && (!viewingEmployee.value.reviews || viewingEmployee.value.reviews.length == 0))) return [];
    return viewingEmployee.value.reviews[0].key_review.filter((kpi) => kpi.type == 'ecd' && kpi.ecd_type == 'soft');  
});

const isNotDashboard = ref(false);
watch(
  () => props.selectedEmployee,
  (newVal) => { 
    isNotDashboard.value = true;

    if(newVal.length > 0){
      viewingEmployee.value = Object.assign({}, newVal[0]);
    }else{
      viewingEmployee.value = Object.assign({}, newVal);
    }
  
    if( route.name == "SingleTeamMember" ){
      emitResponseWeightageValidation();
 
    }
  }
);

const globalSetting = computed(() => settingStore.filteredSetting(viewingEmployee.value.company_id));

const hasError = ref(false);
const singlePageHasError = ref(false);
const emitResponseWeightageValidation = () => {
 
  if(viewingEmployee.value && viewingEmployee.value.reviews && viewingEmployee.value.reviews.length > 0 && (viewingEmployee.value.reviews[0].state == 'midyear' || viewingEmployee.value.reviews[0].state == 'first_review')){
    let nVal = viewingEmployee.value.reviews[0].key_review.filter(el => el.type == 'kpi' && el.achievement_midyear == null);
    let errorCheck = false;
    if(nVal && nVal.length > 0 ){
      errorCheck = true;
    }
    kpiEmit('errorcheck', {hasError: errorCheck});
  }else if(viewingEmployee.value && viewingEmployee.value.reviews && viewingEmployee.value.reviews.length > 0 && (viewingEmployee.value.reviews[0].state == 'yearend' || viewingEmployee.value.reviews[0].state == 'final_review')){
    
    let nVal = viewingEmployee.value.reviews[0].key_review.filter(el => el.type == 'kpi' && el.achievement_yearend == null);
    let errorCheck = false;
    if(nVal && nVal.length > 0 ){
      errorCheck = true;
    }
    
    kpiEmit('errorcheck', {hasError: errorCheck});
  } else{
    weightageValidation().then(() => {
     
      kpiEmit('errorcheck', {hasError: singlePageHasError.value});
    }) 
  }
 
} 

const errorMessage = ref('');
const weightageValidation = async () => { 
  let message = '';
  let isError = false;
   
  if(selectedTab.value == 'kpi' && kpiArray.value.length < 4 && ratingOrWeightage('kpi') == 0){
    
    message = "Invalid: Minimum 4 KPI's needed, kindly update the weightage.";
    isError = true;
  }else {
    
    message = "Invalid: Should have 1 each, technical and soft skill, kindly update the weightage.";
  
    isError = ecdValidationError(isError);
  }
  hasError.value = isError;
  
  if(isError){  
    errorMessage.value = message; 
  } 
  errorValidation();
}

const ecdValidationError = (isError) => {

  if(ratingOrWeightage('ecd') == 0 && ecdArray.value && ecdArray.value.length > 0 && ecdArray.value.length < 2){
    isError = true; 
  }else if( ecdArray.value.length > 1 ){ 
    let ecdValidation = [];
    ecdArray.value.map((o,i) =>{
      ecdValidation.push(o.ecd_type);
    });

    ecdValidation  = [...new Set(ecdValidation)]; 
    if(ratingOrWeightage('ecd') == 0 && ecdValidation.length < 2){
      isError = true;
    } 
  } 
  return isError;
}

const errorValidation = async () => { 
  let isError = false; 
  if(kpiArray.value.length < 4 && ratingOrWeightage('kpi') == 0){
    isError = true;
  }  
  isError = ecdValidationError(isError); 
  singlePageHasError.value = isError;
}

// tabs
const selectedTab = ref("kpi");
const selectTab = (tab) => {
  selectedTab.value = tab;

  if( route.name == "SingleTeamMember"){ 
    weightageValidation(); 
  }
};

const currentDate = ref(new Date());
const canManage = computed(() => {   
    if(viewingEmployee.value && viewingEmployee.value.reviews && viewingEmployee.value.reviews.length > 0){
        return authStore.authRole.includes("manager") && route.name == "SingleTeamMember" && viewingEmployee.value.reviews[0].state == 'setting'
          &&   (viewingEmployee.value.reviews[0].status == 'open' || viewingEmployee.value.reviews[0].status == 'inprogress' || viewingEmployee.value.reviews[0].status == 'inreview')
            ? true
            : false;
    }else if(route.name == "SingleTeamMember" && globalSetting.value && globalSetting.value.state == 'setting' && ( globalSetting.value.status == 'open' || globalSetting.value.status == 'inprogress')){
      return true;
    } else if(viewingEmployee.value && viewingEmployee.value.is_regular == 0 && route.name == "SingleTeamMember"){ 
          let date = new Date(viewingEmployee.value.doj);  
          date.setDate(date.getDate() +  parseInt(globalSetting.value.probation_kpi_setting));  
          if(date >= currentDate.value ){
            return true;
          } 
    } 
    return false;
});
const isFinalReview = ref({saveBtn: false, isFinal: false});
const isReviewStage = computed(() => {
  isFinalReview.value = {saveBtn: false, isFinal: false};

  if(route.name == "SingleTeamMember" && globalSetting && globalSetting.value.state == 'yearend' && (viewingEmployee.value.reviews[0].status == 'submitted' || viewingEmployee.value.reviews[0].status == 'closed' || viewingEmployee.value.reviews[0].status == 'locked')){ 
      isFinalReview.value = {saveBtn: false, isFinal: false};
      return false;
    }else if(route.name == "SingleTeamMember" && globalSetting.value && (globalSetting.value.state == 'yearend' ) && ( globalSetting.value.status == 'open' || globalSetting.value.status == 'inprogress')){
      isFinalReview.value = {saveBtn: true, isFinal: true}; 
      return true;
    }else if(viewingEmployee.value && viewingEmployee.value.is_regular == 0 && route.name == "SingleTeamMember"){  
          isFinalReview.value = {saveBtn: false, isFinal: false};
        if(globalSetting.value){
        
          let midStart = new Date(viewingEmployee.value.doj);  
          let midEnd = new Date(viewingEmployee.value.doj);   
          midStart.setDate(midStart.getDate() +  parseInt(globalSetting.value.probation_first_review_start));  
          midEnd.setDate(midEnd.getDate() +  parseInt(globalSetting.value.probation_first_review_end));  
          
          if(viewingEmployee.value.reviews[0].state == 'first_review' && (viewingEmployee.value.reviews[0].status == 'open' || viewingEmployee.value.reviews[0].status == 'inprogress')){
            isFinalReview.value = {saveBtn: true, isFinal: false};
            return true;
          }else if(midStart <= currentDate.value && midEnd >= currentDate.value){
            isFinalReview.value = {saveBtn: true, isFinal: false};
            return true;
          }

          let yearEndStart = new Date(viewingEmployee.value.doj);  
          let yearEnd = new Date(viewingEmployee.value.doj);  
          yearEndStart.setDate(yearEndStart.getDate() +  parseInt(globalSetting.value.probation_final_review_start));  
          yearEnd.setDate(yearEnd.getDate() +  parseInt(globalSetting.value.probation_final_review_end));  

          if(viewingEmployee.value.reviews[0].state == 'final_review' && (viewingEmployee.value.reviews[0].status == 'open' || viewingEmployee.value.reviews[0].status == 'inprogress')){
            isFinalReview.value = {saveBtn: true, isFinal: true}; 
            return true;
          }else if(yearEndStart <= currentDate.value  && yearEnd >= currentDate.value){
            isFinalReview.value = {saveBtn: true, isFinal: true}; 
            return true;
          } 
        }
    }else if(viewingEmployee.value && viewingEmployee.value.reviews && viewingEmployee.value.reviews.length > 0){
      if(viewingEmployee.value.reviews[0].status == 'open' || viewingEmployee.value.reviews[0].status == 'inprogress'){
        isFinalReview.value.saveBtn = true; 
      }else if(viewingEmployee.value.reviews[0].state == 'yearend' ){
        isFinalReview.value.isFinal = true;
      }
          return authStore.authRole.includes("manager") && route.name == "SingleTeamMember" && 
          (viewingEmployee.value.reviews[0].state == 'midyear' || viewingEmployee.value.reviews[0].state == 'yearend') 
            ? true
            : false;
    } 
  
    return false;
})
// kpi
const year = ref(new Date().getFullYear());

const printKPI = () => {
  // opens kpi slug in new window
  const routeData = router.resolve({
    path: '/print/kpi/'+year.value+'/'+viewingEmployee.value.username, 
    params: {
      year: year.value
    },
    query: {print:1}
  });
  window.open(routeData.href, '_blank'); 
};

watch(year, async (newVal, oldVal) => {  
  kpiEmit('yearchange', newVal);
});

// save kpi & ecd
const kpiOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const ecdOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const addKPI = async (type,ecdType) => {
  if(ratingOrWeightage(selectedTab.value) <= 0){
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Denied: You've reached the weightage limit.",
      
      }; 
  } else if (type == "kpi") {
  
    if(kpiArray.value.length > 5){
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Denied: Max of 6 KPI only. Minimum is 4 KPI",
      };
   
    }else{
        kpiOptions.value = {
                  title: "Add KPI ",
                  data: {},
                  dialog: true,
                  type: type,
                  action: "add",
                  is_review: false, 
              };
    }
  }else {
    let title = 'Identify Technical Skill Development';
    if(ecdType == 'soft'){
      title = 'Identify Behavioral Program';
    }
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: title,
        data: {},
        dialog: true,
        type: type,
        ecdType: ecdType,
        action: "add",
        is_review: false,
      },
    };
 
  } 
};
const editKPI = async (item, type = "kpi",ecdType) => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: "Edit KPI ",
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "edit",
        is_review: false,
      },
    };
  }else {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: "Edit ECD ",
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "edit",
        ecdType: ecdType,
        is_review: false,
      },
    };
  }
};

const viewKPI = async (item, type = "kpi") => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "readonly",
        is_review: true,
        state:viewingEmployee.value.reviews[0].state,
        is_regular: viewingEmployee.value.is_regular
      },
    };
  }

  if (type == "ecd") {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "readonly",
        is_review: true,
        is_regular: viewingEmployee.value.is_regular
      },
    };
  }
 
};
const reviewKPI = async (item, type = "kpi") => {
  if (type == "kpi") {
    kpiOptions.value = {
      ...kpiOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "review",
        is_review: true,
        state:viewingEmployee.value.reviews[0].state,
        is_regular: viewingEmployee.value.is_regular
      },
    };
  }

  if (type == "ecd") {
    ecdOptions.value = {
      ...ecdOptions.value,
      ...{
        title: type.toUpperCase(),
        data: Object.assign({}, item),
        dialog: true,
        type: type,
        action: "review",
        is_review: true,
        is_regular: viewingEmployee.value.is_regular
      },
    };
  }
 
};

const savedResponseMethod = (v) => {  

    let reviewID = {
      reviewID : viewingEmployee.value.reviews[0].id,
      data: v,
      industryTitle: v.industryTitle,
      state: v.state
    }
    emitResponseWeightageValidation();
    
    kpiEmit('savedResponse', reviewID); 
}

// remove kpi
const toRemoveKpi = ref({
  data: {},
  dialog: false,
  loading: false,
});
const removeKPI = async (item) => {

  toRemoveKpi.value = {
    ...toRemoveKpi.value,
    ...{
      data: Object.assign({}, item),
      dialog: true,
    },
  };

};
const confirmRemoveKpi = async () => { 
  let kpiRemove = toRemoveKpi.value.data;
  toRemoveKpi.value.dialog = false;

  kpiEmit('removeKPI', kpiRemove); 
};

const ratingOrWeightage = (type) => {
 let remainingWeightage = 70;
  if(viewingEmployee.value && viewingEmployee.value.is_regular == 0){
    remainingWeightage = 100;
  }
  
  if(type == 'ecd'){
    remainingWeightage = 30;

    if(ecdArray.value && ecdArray.value.length > 0 ){
      ecdArray.value.map((o,i) => {
        remainingWeightage -= o.weightage;
      })
    }
  }else{
    if(kpiArray.value && kpiArray.value.length > 0 ){
      kpiArray.value.map((o,i) => {
        remainingWeightage -= o.weightage;
      })
    }
  }
  return remainingWeightage;
  
}
</script>

<style>
.pms-tab {
  width: 150px;
  height: 60px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.pms-tab:hover>.v-card__overlay {
  display: none;
}
.content-card:hover{ background-color: #ECEFF1;}
</style>
