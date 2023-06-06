<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-3">
        <v-autocomplete
          v-model="selectedEmployeeArr" 
          @update:modelValue="changeEmployee"
          :items="teamList"
          item-title="username"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          return-object
          hide-details
          label="Select Employee"
        >
        </v-autocomplete>
      </div>
      <div class="v-col-12">
        <v-card class="mb-3 elevation-0">
          <v-card-text>
            <v-row>
              <div class="v-col-12 v-col-md-3 d-flex align-center">
                <EmployeeCard />
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Reporting To</div>
                <div class="text-body-2">Tibs</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">Business Unit</div>
                <div class="text-body-2">{{selEmployeeObj && selEmployeeObj.company ? selEmployeeObj.company.title: ''}}</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <div class="text-caption text-grey">KPI's Target Year</div>
                <div class="text-body-2">{{settingStore.pmsSettings && settingStore.pmsSettings.year}}</div>
              </div>
              <div class="v-col-12 v-col-md-1 d-flex flex-column">
                <div class="text-caption text-grey">Total KPI</div>
                <div class="text-body-2">{{ ratingOrWeightage(selEmployeeObj) }}/100</div>
              </div>
              <div class="v-col-12 v-col-md-2 d-flex flex-column">
                <v-btn
                  @click="submitForReview"
                  block
                  color="secondary"
                  disabled
                  class="text-capitalize rounded-lg"
                  >Submit for Review</v-btn
                >
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent :selected-employee="selEmployeeObj" :industry-list="industryWithKPI" :ecd-list="ecdList" @yearchange="selectedYearResponse" :is-manager="true" />
  </v-container>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"; 
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";
import EmployeeCard from "@/components/EmployeeCard.vue"; 
import { useRoute,useRouter } from "vue-router";
import { clientApi } from "@/services/clientApi";
import { useSettingStore } from "@/stores/settings";
const router = useRouter();
const route = useRoute(); 
const ecode = ref(route.params.id); 
 
// authenticated user object
const authStore = useAuthStore(); 
const settingStore = useSettingStore();

const filter = ref({
  data: {
    employee: "",
    employee_type: "",
  },
}); 

// selected employee
const teamList = ref(authStore.authProfile.teams);
const selectedEmployeeArr = ref({});
const selEmployeeObj = ref({});
if(teamList.value && teamList.value.length > 0){
  selectedEmployeeArr.value = teamList.value.filter((o) => { return o.username == ecode.value })
  selEmployeeObj.value = selectedEmployeeArr.value[0];
}
console.log(selEmployeeObj.value);
const changeEmployee = () => {
  router
    .push({
      name: 'SingleTeamMember',
      params: { id: selectedEmployeeArr.value.ecode },
    })
    .catch((err) => {});
} 

watch(
  () => selectedEmployeeArr.value,
  (newVal) => {  
    console.log(newVal); 
    selEmployeeObj.value = newVal;
  }
);

const ratingOrWeightage = (user) => {
  let sum = 0 ;
  if(user.reviews && user.reviews.length > 0 && user.reviews[0].key_review){   
    user.reviews[0].key_review.map((o,i) =>{
      sum += o.weightage;
    });
  }
  return sum;
};

const industryList = ref([]);
const Industries = async () => {
  await clientApi(authStore.authToken)
    .get("/api/fetch/industries/non-paginate")
    .then((res) => {
      industryList.value = res.data;
    });
};

const industryWithKPI = ref([]);
const ecdList = ref([]);
const kpiMaster = async () => {
  await clientApi(authStore.authToken)
    .get("/api/fetch/master-kpi/non-paginate")
    .then((res) => {
    

      if(industryList.value && industryList.value.length > 0 && res.data && res.data.length > 0){
        industryList.value.map((o,i) => {
          industryWithKPI.value[i] = o;
          industryWithKPI.value[i].kpis = [];
          let count = 0;
          let ecdCount = 0;
          res.data.map((oo,ii) => {
            if(o.id == oo.industry_id){
                industryWithKPI.value[i].kpis[count] = oo;
                count++;
            }else if(oo.type == 'ecd'){
              ecdList.value[ecdCount] = oo;
              ecdCount++;
            }
          });

        });
         
      }
    });
};

const getEmployeeToView = () => {
  console.log("getEmployeeToView", selectedEmployeeArr.value);
};

const submitForReview = () => {
  console.log("submit review");
};
 
const selectedYearResponse = (v) => {
  getKPI(v)
}
const getKPI = async (year) => {
  await clientApi(authStore.authToken)
    .get("/api/dashboard/my-kpi/"+selEmployeeObj.value.id+'/' + year)
    .then((res) => {
       
      if (res.data.result == null) {
        selEmployeeObj.value = {
          ...selEmployeeObj.value , ...{
            reviews: []
          }
        }
      } else {
        selEmployeeObj.value  = {
          ...selEmployeeObj.value , ...{
            reviews: [res.data.result]
          }
        }
      }
    })
    .catch((err) => {

    });
};

onMounted(()=>{
  Industries().then(()=>{
    kpiMaster();
  });
}); 
</script>
