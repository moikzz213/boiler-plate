<template>
  <v-dialog
    v-model="kpiAction.dialog"
    width="100%"
    :max-width="`${ecdOptions.is_review == true ? '1240' : '700'} `"
     
    persistent
  >
    <v-card class="rounded-lg" minHeight="300">
      <v-row class="ma-0 pa-0">
        <div :class="`v-col-12 ${ecdOptions.is_review == true ? 'v-col-md-8' : ''} px-4`">
          <v-row>
            <div class="v-col-12">{{ kpiAction.title }}</div>

            <div class="v-col-12 py-0">
              <v-autocomplete
                v-model="selectedKPI"
                :items="kpiList"
                item-title="title"
                item-value="id"
                return-object
                variant="outlined"
                density="compact"
                label="Select *"
              >             
              <template v-slot:item="{ props, item }">
                <v-list-item
                :style="`${item.raw.profile_ecode ? 'background-color:#2196F3; color:#fff;' : ''} `"
                  v-bind="props" 
                  :title="item?.raw?.title" 
                ></v-list-item>
              </template>  
              </v-autocomplete>
            </div>
            <div class="v-col-12 py-0">
              <v-select
                v-model="ecdDataWeightage"
                :items="kpiWeightageList"
                label="Development Weightage (%)*"
                variant="outlined"
                density="compact"
              ></v-select>
            </div>
            
            <div class="v-col-12 py-0">
              <v-divider class="mx-auto"></v-divider>
            </div>
            <div v-if="!kpiAction.is_review" class="v-col-12 d-flex justify-end">
              <v-btn color="primary" variant="text" @click="kpiAction.dialog = false"
                >Cancel</v-btn
              >
              <v-btn :disabled="!isValid" :loading="saveLoading" color="secondary" class="ml-2 px-8" @click="saveKpi">save</v-btn>
            </div>
          </v-row>
        </div>
      
        <div v-if="kpiAction.is_review" class="v-col-12 v-col-md-4 bg-grey-lighten-4">
          <v-row class="px-3" v-if="!finalReview.isFinal">
            <div class="v-col-12 px-1">{{ "Review" }}</div>
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
              {{  kpiAction.is_regular ? "Mid-Year Achievement" : 'First Review Achievement'}} 
            </div> 
            <div class="v-col-12 v-col-md-12 py-0 px-1">
              <v-text-field
                v-model="ecdData.achievement_midyear"
                label="Achievement*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div> 
            </v-row>
          
            <v-row class="px-3" v-if="finalReview.isFinal">
            <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
              {{  kpiAction.is_regular ? "Year-End Achievement" : 'Final Review Achievement'}}
            </div> 
            <div class="v-col-12 py-0 px-1">
              <v-text-field
                v-model="ecdData.achievement_yearend"
                label="Achievement*"
                variant="outlined"
                density="compact"
                persistent-hint
              ></v-text-field>
            </div> 
            </v-row> 
            <v-row class="pb-4" v-if="finalReview.saveBtn">
            <div class="v-col-12 d-flex justify-end">
              <v-btn
                class="bg-grey-lighten-2 text-primary"
                variant="text"
                @click="kpiAction.dialog = false"
                >Cancel</v-btn
              >
              <v-btn :loading="saveLoading" v-if="kpiAction.action !='readonly' && props.submitButton && finalReview.saveBtn" color="secondary" class="ml-2" @click="submitReview">Submit</v-btn>
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
  ecdOptions: {
    type: Object,
    default: null,
  },
  ecdList: {
    type: Object,
    default: null,
  },
  remainWeightage:{
    type: Number,
    default: 30
  },
  submitButton: {
    type: Boolean,
    default: true
  },
  finalReview:{
    type: Boolean,
    default: false
  }
});

const kpiEmit = defineEmits(['savedResponse']);

const oldWeightage = ref(null);
// save kpi
const ecdData = ref({});
const kpiList = ref([]);
const kpiAction = ref({});
const selectedKPI = ref(null);
const ecdDataWeightage = ref(null);
const saveLoading = ref(false);

const kpiWeightageList = ref(["5%", "10%", "15%", "20%"]);
const saveKpi = () => { 
  saveLoading.value = true;
  ecdData.value.weightage = ecdDataWeightage.value;
  ecdData.value.ecd_type = props.ecdOptions.ecdType;
  kpiAction.value.data = ecdData.value; 

  setTimeout(() => {
      saveLoading.value = false;
      kpiAction.value.dialog = false;
      kpiEmit('savedResponse', kpiAction.value);
    }, 1200);
};

watch(
  () => props.ecdOptions,
  (newVal) => { 

    ecdData.value = Object.assign({}, newVal.data);
    kpiList.value = props.ecdList.filter((el) => {
      return el.ecd_type == newVal.ecdType || el.ecd_type == 'both'
    }); 
   
    kpiAction.value = Object.assign({}, newVal);
    
    if(kpiAction.value.action == 'edit' ||  kpiAction.value.action == 'review' ||  kpiAction.value.action == 'readonly'){
      oldWeightage.value = newVal.data.weightage;
      selectedKPI.value = newVal.data.title;
      ecdDataWeightage.value = newVal.data.weightage;
    }else{
      oldWeightage.value = null;
      selectedKPI.value = null;
      ecdDataWeightage.value = null;
    }
 
  }
);   

const submitReview = () => { 
    if(props.finalReview.isFinal){
      kpiAction.value.state = 'final';
    }else{
      kpiAction.value.state = 'mid';
    }

    saveKpi(); 
}

watch(
  () => selectedKPI.value,
  (newVal) => {
    if(kpiAction.value.action == 'add'){
        ecdData.value = {};
        ecdData.value = newVal;
    }
  }
);
const sbOptions = ref({});
const isValid = ref(false);
watch(
  () => ecdDataWeightage.value,
  (newVal) => { 
    if(!isNaN(newVal) || newVal == undefined || newVal == null){ 
      isValid.value = false;
    }else{
     if(kpiAction.value.action == 'add'){ 
        if( parseInt(newVal) > props.remainWeightage){ 
          isValid.value = false;
          sbOptions.value = {
            status: true,
            type: "error",
            text: "Weightage is over the limit!",
          };
        }else{
          isValid.value = true;
        } 
     } else{
        let deduceWeightage = parseInt(props.remainWeightage) + parseInt(oldWeightage.value) - parseInt(newVal); 
         
        if( parseInt(deduceWeightage) < 0){ 
          isValid.value = false;
          sbOptions.value = {
            status: true,
            type: "error",
            text: "Weightage is over the limit!",
          };
        }else{
          if( oldWeightage.value > parseInt(newVal)){
            isValid.value = true;
          }else{ 
            if( parseInt(deduceWeightage) >= 0){ 
              isValid.value = true;  
            }else{ 
              isValid.value = false;
            }
          }
        } 
        
     }
    } 
  }
); 
 
</script>