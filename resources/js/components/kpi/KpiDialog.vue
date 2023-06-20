<template>
  <v-dialog v-model="kpiAction.dialog" width="100%" :max-width="`${kpiAction.is_review == true ? '1240' : '900'} `"
    persistent>
    <v-card class="rounded-lg">
      <v-row class="ma-0 pa-0">
        <div :class="`v-col-12 ${kpiAction.is_review == true ? 'v-col-md-8' : ''} px-4`">
          <v-row>
            <div class="v-col-12">{{ kpiAction.title }}</div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete v-model="industry" :items="industryList" 
              item-title="title" item-value="title"  
              return-object
              :disabled="kpiAction.action == 'edit' || kpiAction.is_review"
                variant="outlined" density="compact" label="Select Industry*">
              </v-autocomplete>
            </div>
            <div class="v-col-12 v-col-md-6 py-0">
              <v-autocomplete v-model="selectedKPI"  :items="kpiList" 
                item-title="title" item-value="id" 
                variant="outlined"
                :disabled="kpiAction.action == 'edit' || kpiAction.is_review"
                density="compact" label="Select KPI*"> 
                <template v-slot:selection="{ props, item }">
                  <span v-bind="props">
                    {{ item?.title.substring(0, 35) + "..." }}
                  </span>
                </template>
              </v-autocomplete>
            </div>
          
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select  :disabled="isDisabled || kpiAction.is_review" v-model="kpiData.target_type" :items="targetTypeList" label="Target Type*" variant="outlined"
                density="compact"></v-select>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-text-field  :disabled="isDisabled || kpiAction.is_review"  v-model="kpiData.target" label="Target*" variant="outlined" density="compact"
                persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select  :disabled="isDisabled || kpiAction.is_review"   v-model="kpiData.measures" :items="measuresList" label="Measures*" variant="outlined"
                density="compact"></v-select>
            </div>
            <div class="v-col-12 v-col-md-3 py-0">
              <v-select :disabled="isDisabled || kpiAction.is_review"  v-model="kpiData.weightage" :items="kpiWeightageList" label="KPI's Weightage (%)*"
                variant="outlined" density="compact"></v-select>
            </div>
            <div class="v-col-12 py-0">
              <v-row class="mx-0  mb-3">
                <v-col class="pa-3" style="border:1px solid #b1b1b1;border-radius: 5px;min-height:70px;" v-html="kpiData.evaluation_pattern">
               
                </v-col>
              </v-row>
              
              <!-- <v-textarea v-model="kpiData.evaluation_pattern" readonly label="KPI Evaluation Pattern*" variant="outlined"
                rows="2"></v-textarea> -->
            </div>
            <div class="v-col-12 pt-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea v-model="kpiData.definition" :readonly="isDisabled || kpiAction.action == 'edit' || kpiAction.is_review" label="KPI Definition*" variant="outlined" rows="2"></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea v-model="kpiData.formula" readonly label="Calulation Formula*" variant="outlined"
                rows="2"></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea v-model="kpiData.subordinate_measures" readonly label="Subordinate Measures*" variant="outlined"
                rows="2"></v-textarea>
            </div>
            <div class="v-col-12 py-0">
              <v-textarea v-model="kpiData.calculation_example" readonly label="KPI Calulation Example*" variant="outlined"
                rows="2"></v-textarea>
            </div> 
            <div class="v-col-12 py-0">
              <v-divider class="mx-auto"></v-divider>
            </div> 
            <div v-if="!kpiAction.is_review" class="v-col-12 d-flex justify-end">
              <v-btn color="primary" variant="text" @click="cancelKPI">Cancel</v-btn>
              <v-btn :loading="saveLoading" :disabled="requiredFields.length < 6" color="primary" class="ml-2 px-8" @click="saveKpi">save</v-btn>
            </div>
          </v-row>
        </div>
        <div v-if="kpiAction.is_review" class="v-col-12 v-col-md-4 bg-grey-lighten-4">
          <v-row class="px-3">
            <div class="v-col-12 px-1">{{ "Review" }}</div>
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
             {{  kpiAction.is_regular ? "Mid-year Achievement" : 'First Review Achievement'}} 
            </div> 
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field :disabled="finalReview.isFinal" v-model="kpiData.achievement_midyear" label="Achievement*" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field readonly v-model="mid_target_variation" label="Target Variation" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field v-if="kpiAction.is_regular" :disabled="finalReview.isFinal" v-model="kpiData.revised_annual_target" label="Revised Annual Target*" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field v-if="kpiAction.is_regular" :disabled="finalReview.isFinal" v-model="kpiData.mid_year_remainder_target" label="Remainder Annual Target*"
                variant="outlined" density="compact" persistent-hint></v-text-field>
            </div>
            </v-row>
            <v-row class="px-3" v-if="finalReview.isFinal"> 
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
              {{  kpiAction.is_regular ? "Year-end Achievement" : 'Final Review Achievement'}}
            </div>
            <div class="v-col-12 py-0 px-1">
              <v-text-field v-model="kpiData.achievement_yearend" label="Achievement*" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field readonly v-model="final_target_variation" disabled label="Target Variation" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            <div class="v-col-12 v-col-md-6 py-0 px-1">
              <v-text-field v-model="kpiData.year_end_remainder_target" disabled label="Remainer Annual Target*" variant="outlined"
                density="compact" persistent-hint></v-text-field>
            </div>
            </v-row>
            <v-row> 
            <div class="v-col-12 d-flex justify-end">
              <v-btn class="bg-grey-lighten-2 text-primary" variant="text" @click="kpiAction.dialog = false">Cancel</v-btn>
              <v-btn :loading="saveLoading" v-if="props.submitButton && finalReview.saveBtn" color="primary" class="ml-2" @click="submitReview">Save</v-btn>
            </div>
          </v-row>
        </div>
      </v-row>
    </v-card>
  </v-dialog>
  <SnackBar :options="sbOptions" />
</template>

<script setup>
import { ref, watch } from "vue";
import SnackBar from "@/components/SnackBar.vue";
const props = defineProps({
  kpiOptions: {
    type: Object,
    default: null,
  },
  submitButton: {
    type: Boolean,
    default: true
  },
  industryList: {
    type: Object,
    default: null
  },
  remainWeightage:{
    type: Number,
    default: 70
  },
  measuresList: {
    type: Object,
    default: null
  },
  finalReview:{
    type: Boolean,
    default: false
  }
});
const sbOptions = ref({});
const kpiEmit = defineEmits(['savedResponse']) 

const targetTypeList = ref(["min", "max"]);
const measuresList = ref([]);
const kpiWeightageList = ref(["5%", "10%", "15%", "20%", "25%",'30%']);
const oldWeightage = ref(null);
const kpiAction = ref({});

const kpiData = ref({measures: null});
const kpiList = ref([]); 
const listIndustries = ref([]);
const industry = ref('');  
 
const selectedKPI = ref('');

const industryTitle = ref('');
const saveLoading = ref(false);
const isDisabled = ref(true);

const requiredFields = ref([]);

const saveKpi = () => {
    saveLoading.value = true;
    kpiAction.value.data = kpiData.value; 
    kpiAction.value.industryTitle = industryTitle.value; 
    setTimeout(() => {
      saveLoading.value = false;
      kpiAction.value.dialog = false;
      kpiEmit('savedResponse', kpiAction.value);
    }, 1200);

    industry.value = props.kpiOptions.data.industry;
};
 
const cancelKPI = () => {
  kpiAction.value.dialog = false;
  if(kpiAction.value.action == 'edit' ||  kpiAction.value.action == 'review'){
    industry.value = props.kpiOptions.data.industry;
    selectedKPI.value = props.kpiOptions.data.title;
  } 
} 

const submitReview = () => {

  if(props.finalReview.isFinal){
    kpiAction.value.state = 'final';
  }else{
    kpiAction.value.state = 'mid';
  }

  saveKpi();
  
}
watch(
  () => props.kpiOptions,
  (newVal) => {
    console.log('newValnewVal',props.industryList);
    saveLoading.value = false;
      listIndustries.value = props.industryList;
      kpiData.value = Object.assign({}, newVal.data);
      kpiAction.value = Object.assign({}, newVal);
      
      if(kpiAction.value.action == 'edit' ||  kpiAction.value.action == 'review'){
        industry.value = newVal.data.industry;
        selectedKPI.value = newVal.data.title;
        oldWeightage.value = newVal.data.weightage;
        isDisabled.value = false;
      }else{
        industry.value = null;
        selectedKPI.value = null;
        oldWeightage.value = null;
        isDisabled.value = true;
      }
  }
);

watch(
  () => industry.value,
  (newVal) => {
    kpiList.value = [];
    measuresList.value = props.measuresList;
    if(kpiAction.value.action == 'add'){ 
      isDisabled.value = true;
      kpiData.value = {};
      selectedKPI.value = null;
      if(newVal){
        requiredFields.value.push('industry'); 
      removeDuplicateFromArray();
        industryTitle.value = newVal.title;
        listIndustries.value.map((el) => {
          if(el.id == newVal.id){
            kpiList.value = el.kpis;
          }
        });
      }
    }else{
      requiredFields.value.push('industry'); 
      isDisabled.value = false;
    }
  }, 
); 
watch(
  () => selectedKPI.value,
  (newVal) => { 
    
    if(kpiAction.value.action == 'add'){
      

      kpiData.value = {};
      let newData = kpiList.value.filter((el) => {
        return el.id == newVal;
      });
      if(newData && newData.length > 0){
        kpiData.value = newData[0];
        isDisabled.value = false;
        requiredFields.value.push('kpi'); 
        removeDuplicateFromArray();
      } 
    }else{
      requiredFields.value.push('kpi'); 
    }
  }
);

watch(
  () => kpiData.value.weightage,
  (newVal) => { 
    let isValid = false;
    if(!isNaN(newVal) || newVal == undefined || newVal == null){ 
      isValid = false;
    }else{
     if(kpiAction.value.action == 'add'){ 
        if( parseInt(newVal) > props.remainWeightage){ 
          isValid = false;
          sbOptions.value = {
            status: true,
            type: "error",
            text: "Weightage is over the limit!",
          };
        }else{
          isValid = true;
        } 
     } else{
        let deduceWeightage = parseInt(props.remainWeightage) + parseInt(oldWeightage.value) - parseInt(newVal); 
         
        if( parseInt(deduceWeightage) < 0){ 
          isValid = false;
          sbOptions.value = {
            status: true,
            type: "error",
            text: "Weightage is over the limit!",
          };
        }else{
          if( oldWeightage.value > parseInt(newVal)){
            isValid = true;
          }else{ 
            if( parseInt(deduceWeightage) >= 0){ 
              isValid = true;  
            }else{ 
              isValid = false;
            }
          }
        }
     }
    } 
    if(isValid){
      requiredFields.value.push('weightage'); 
      removeDuplicateFromArray();
    }else{
      removeFromArray('weightage');
    } 
  }
);

const removeDuplicateFromArray = () => {

  requiredFields.value = requiredFields.value.filter((item,
        index) => requiredFields.value.indexOf(item) === index);
}

const removeFromArray = (value) => {
  const index = requiredFields.value.indexOf(value);
  if (index > -1) { // only splice array when item is found
    requiredFields.value.splice(index, 1); // 2nd parameter means remove one item only
  }
}

watch (
  () => kpiData.value.target,
  (newVal) =>{
    if(newVal){
      requiredFields.value.push('target'); 
      removeDuplicateFromArray();
    }else{
      removeFromArray('target');
    }
  }, 
);
watch (
  
  () => kpiData.value.measures,
  (newVal) =>{ 
    if(newVal){
      requiredFields.value.push('measures'); 
      removeDuplicateFromArray();
    }else{
      removeFromArray('measures');
    }
  },
);
watch(
  () => kpiData.value.target_type,
  (newVal) => { 
    
    requiredFields.value.push('target_type'); 
    removeDuplicateFromArray();
    if(newVal == 'min'){
      kpiData.value.evaluation_pattern = '<span style="color:green">Positive Ranking = Exceeding the Target</span> <br/><span style="color:red">Negative Ranking = Falling short of the Target</span>';
    }else if(newVal == 'max'){
      kpiData.value.evaluation_pattern = '<span style="color:green">Positive Ranking = Falling short of the Target</span> <br/><span style="color:red">Negative Ranking = Exceeding the Target</span>';
    }else{
      removeFromArray('target_type');
      kpiData.value.evaluation_pattern = '';
    }
  }
);

</script>