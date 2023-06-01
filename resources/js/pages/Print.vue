<template>
    <v-container class="pb-16">
      <v-row class="my-5" v-if="have_access && kpiDataEncrypted">
        <div class="v-col-12"> 
          <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5" @click="() => printDocument(null,pdfcont)">Download PDF</v-btn>
          <v-btn size="small" color="primary" class="btn btn-primary noprint ml-1 mt-5" @click="() => printDocument(1)">PRINT</v-btn>
          <div id="divToPrint" ref="pdfcont" width="100%" > 
            <div class="text-h6 mb-1 header-title text-center" style="text-align: center; margin-bottom: 10px;">PERFORMANCE REVIEW {{ year }}</div>
            <div class="mb-5 text-center" style="text-align: center; margin-bottom: 15px;font-size:12px;text-transform: uppercase;">
              {{ printState(kpiDataEncrypted.reviews[0].type) }} - {{ printState(kpiDataEncrypted.reviews[0].state) }} - {{ printState(kpiDataEncrypted.reviews[0].status) }}</div>
                
            <table  style="width:100%;" border="1" cellpadding="0" cellspacing="0">
              <thead>
                <tr>
                    <td style="text-align:left;width:20%;font-size:12px;  padding: 0 10px; margin:2px 10px;">Company</td>
                    <td style="text-align:left;width: 80%;font-size:12px; padding: 0 10px; margin:2px 10px;">{{ kpiDataEncrypted.company ? kpiDataEncrypted.company.title : '' }}</td>
                </tr>
                <tr>
                    <td style="text-align:left; width:20%; font-size:12px; padding: 0 10px; margin:2px 10px;" >Employee Code</td>
                    <td style="text-align:left; width: 80%;font-size:12px;  padding: 0 10px; margin:2px 10px;">{{ kpiDataEncrypted.ecode }}</td>
                </tr>
                <tr>
                    <td style="text-align:left;width:20%;font-size:12px;  padding: 0 10px; margin:2px 10px;">Name</td>
                    <td style="text-align:left;width: 80%;font-size:12px; padding: 0 10px; margin:2px 10px;">{{ kpiDataEncrypted.display_name }}</td>
                </tr>
                <tr>
                    <td style="text-align:left;width:20%;font-size:12px;  padding: 0 10px; margin:2px 10px;">Designation</td>
                    <td style="text-align:left;width: 80%;font-size:12px; padding: 0 10px; margin:2px 10px;">{{ kpiDataEncrypted.designation }}</td>
                </tr>
               
              </thead>
            </table>
            <div style="margin-top:10px;margin-bottom:10px; font-size:12px;">KPI</div>
            <table v-if="kpiArray && kpiArray.length > 0" style="width:100%" border="1" cellpadding="0" cellspacing="0">
              <thead v-for="item,index in kpiArray" :key="item.id">
                  <tr class="parent-tr"> 
                    <td style="text-align:left;font-size:12px; margin:5px 10px;padding:5px 10px;" colspan="4">{{ index+1 }}. KPI: {{ item.title }}</td>
                  </tr>
                  <tr>
                      <td style="text-align:left;font-size:12px; padding: 0 10px; margin:2px 10px;" >
                        <div class="secondary-title" style="color:#a3a3a3; font-size:9px;">Industry</div> 
                         {{ item.industry }} 
                      </td>
                      <td style="text-align:left;font-size:12px; padding: 0 10px; margin:2px 10px;" >
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">Target ({{item.target_type}})</div> 
                        {{ item.target }}
                      </td>
                      <td style="text-align:left;font-size:12px;  padding: 0 10px; margin:2px 10px;" >
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">Measure</div> 
                        {{ item.measure }}
                      </td>
                      <td style="text-align:left;font-size:12px; padding: 0 10px; margin:2px 10px;" >
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">KPI's Weightage(%)</div> 
                        {{ item.weightage }}%
                      </td>
                  </tr> 
                    <!--  -->
                    <tr v-if="kpiDataEncrypted.reviews[0].state != 'setting'">
                      <td style="text-align:left; font-size:12px; padding: 0 10px; margin:2px 10px;" >
                        {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'Mid Year' : 'First Review'}}
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">
                          {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'Revised Annual Target' : 'Revised Final Target'}} 
                        </div> 
                        {{ item.revised_annual_target && item.revised_annual_target != 0 ? item.revised_annual_target : '&nbsp;' }}
                      </td>
                      
                      <td style="text-align:left; font-size:12px; padding: 0 10px; margin:2px 10px;" colspan="3">&nbsp;
                          <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;">
                            {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'Mid Year Achievement' : 'Achievement'}}</div> 
                        {{ item.achievement_midyear }}
                      </td>
                        
                    </tr>
                    <!--  -->
                    <tr v-if="kpiDataEncrypted.reviews[0].state == 'yearend'">
                      <td style="text-align:left; font-size:12px; padding: 0 10px; margin:2px 10px;" colspan="4">
                        {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'YEAR END' : 'Final Review'}}
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">Achievement</div> 
                        {{ item.achievement_yearend }}
                      </td>
                    </tr>
              </thead>
            </table>
            <div style="margin-top:10px;margin-bottom:10px; font-size:12px;">EMPLOYEE CAPABILITY DEVELOPMENT</div>
            <table v-if="ecdArray && ecdArray.length > 0" style="width:100%;" border="1" cellpadding="0" cellspacing="0">
              <thead v-for="item, index in ecdArray" :key="item.id">
                  <tr class="parent-tr"> 
                      <td style="text-align:left;font-size:12px; margin:5px 10px;padding:5px 10px;" colspan="2">{{ index+1 }}. TRAINING: {{ item.title }}</td>
                  </tr>
                  <tr>
                      <td style="text-align:left; font-size:12px; padding: 5px 10px; margin:2px 10px; " >
                       <div style="display:flex;">
                        <div class="secondary-title" style="color:#a3a3a3; font-size:10px;font-weight:normal; margin-right:10px;">Type</div> 
                         {{ item.ecd_type }} 
                        </div> 
                      </td> 
                      <td style="text-align:left; font-size:12px;padding: 5px 10px;margin:2px 10px;" >
                        <div style="display:flex;"><div class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;margin-right:10px;">KPI's Weightage(%)</div> 
                        {{ item.weightage }}%
                      </div>
                      </td>
                  </tr>  
                  <!--  -->
                  <tr v-if="kpiDataEncrypted.reviews[0].state != 'setting'">
                    <td style="text-align:left; font-size:12px; padding: 5px 10px; margin:2px 10px;" colspan="2">
                      {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'Mid Year' : 'First Review'}} 
                      <div style="display:flex;">
                        <div class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;margin-right:10px;">Achievement</div> 
                      {{ item.revised_annual_target }}
                      </div>
                    </td> 
                      
                  </tr> 
                  <!--  -->
                  <tr v-if="kpiDataEncrypted.reviews[0].state == 'yearend'">
                    <td style="text-align:left; font-size:12px; padding: 5px 10px; margin:2px 10px;" colspan="2">
                      {{kpiDataEncrypted.reviews[0].type == 'regular' ? 'Year End' : 'Final Review'}} 
                      <div style="display:flex;">
                      <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;margin-right:10px;">Achievement</div> 
                      {{ item.achievement_yearend }}
                      </div>
                    </td>
                  </tr>
              </thead>
            </table>
         
          </div> 
          <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5" @click="() => printDocument(null,pdfcont)">Download PDF</v-btn>
          <v-btn size="small" color="primary" class="btn btn-primary noprint ml-1 mt-5" @click="() => printDocument(1)">PRINT</v-btn>
        </div>
      </v-row>  
          <div v-else class="mt-5 text-center">
            <small>Sorry but you dont have access to this KPI / Link is invalid.</small>
          </div>
      <!-- selectedProfileKpi -->
    </v-container>
  </template>
  
<script setup>
import {  ref, computed,onMounted } from "vue"; 
import { useAuthStore } from "@/stores/auth";
import html2pdf from "html2pdf.js"; 
import { useRoute } from "vue-router";
import { clientApi } from "@/services/clientApi";
const doc = html2pdf();
const pdfcont = ref(null);

const authStore = useAuthStore();
const route = useRoute(); 
const year = ref(route.params.year); 
const ecode = ref(route.params.ecode); 
const is_print = ref(route.query.print); 
const kpiDataEncrypted = ref(null); 

const teamList = ref(authStore.authProfile.teams);
const have_access = ref(false);
const adminRoles = ref(['hr_admin','app_admin']);
if(authStore.authProfile.ecode == ecode.value || adminRoles.value.includes(authStore.authProfile.role)){
  have_access.value = true;
}else if(teamList.value && teamList.value.length > 0){
  let selected = teamList.value.filter((o) => { return o.username == ecode.value })

  if(selected.length > 0){
    have_access.value = true;
  } 
}

const printDocument = (isPrint,container) => {
  if(isPrint){
      window.print();
  }else{
      doc.set({
          margin: 0.3,
          filename: "Performance-Review-"+year.value+"-"+ecode.value+".pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .from(container)
        .save(); 
  }
}

const fetchEmployeeKPIbyYear = async () => {
  await clientApi(authStore.authToken)
    .get("/api/print/employee-kpi/year/"+ecode.value+ "/" + year.value)
    .then((res) => {
      console.log(res.data.result);
        kpiDataEncrypted.value = res.data.result;
    })
    .catch((err) => { 
    });
}; 

onMounted(() => {
  if(have_access.value){
    fetchEmployeeKPIbyYear();

    setTimeout(() => {
      if(is_print.value == 1){
        window.print();
      }
    }, 2000);
  } 
});
  
const kpiArray = computed(() => {
  if (!kpiDataEncrypted.value.reviews || kpiDataEncrypted.value.reviews.length == 0) return [];
  return kpiDataEncrypted.value.reviews[0].key_review.filter((kpi) => kpi.type == 'kpi'); 
});
const ecdArray = computed(() => {
  if (!kpiDataEncrypted.value.reviews || kpiDataEncrypted.value.reviews.length == 0) return [];
    return kpiDataEncrypted.value.reviews[0].key_review.filter((kpi) => kpi.type == 'ecd');  
});

const printState = (v) => {
  switch(v) {
    case 'setting':
      return 'Setting';
    case 'probation':
      return 'Probation';
    case 'inreview':
      return 'In-Review';
    case 'submitted':
      return 'Submitted';
    case 'first_review':
      return 'First Review';
    case 'final_review':
      return 'Final Review';
    default:
      return 'In-Progress';
  }
} 
</script>
<style>
  .v-navigation-drawer, header, .v-toolbar__content { display: none !important; }
  main, .v-main, .v-container, .v-container .v-row.my-5{ padding-top: 0px; padding-left:0px; padding-right:0; padding-bottom: 0; }
  .v-container .v-row.my-5{ margin: 0 !important; }
  .v-theme--mel{ max-width: 100% !important; }
  .parent-tr{ background-color: #dbdbdb; }
  @media print{
    .noprint { 
      display:none !important;
      visibility:hidden !important
    }
    #divToPrint{ width:100% !important; max-width: 100%; }
    td,th { font-size: 8px !important; margin: 0 30px; }
    .secondary-title{ font-size: 8px !important; }
    .header-title { margin-top: 0 !important; padding-top: 0 !important; margin-bottom: 10px !important; }
  }
</style>