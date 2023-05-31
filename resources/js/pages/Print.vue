<template>
    <v-container class="pb-16">
      <v-row class="my-5" v-if="kpiDataEncrypted">
        <div class="v-col-12"> 
          <div id="divToPrint" width="100%" >
             
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
                        <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;">Revised Annual Target</div> 
                        {{ item.revised_annual_target }}
                      </td>
                      
                      <td style="text-align:left; font-size:12px; padding: 0 10px; margin:2px 10px;" colspan="3">&nbsp;
                          <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;">Mid Year Achievement</div> 
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
                      MID YEAR 
                      <div style="display:flex;">
                        <div class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;margin-right:10px;">Achievement</div> 
                      {{ item.revised_annual_target }}
                      </div>
                    </td> 
                      
                  </tr> 
                  <!--  -->
                  <tr v-if="kpiDataEncrypted.reviews[0].state == 'yearend'">
                    <td style="text-align:left; font-size:12px; padding: 5px 10px; margin:2px 10px;" colspan="2">
                      YEAR END 
                      <div style="display:flex;">
                      <div  class="secondary-title" style="color:#a3a3a3;font-size:10px;font-weight:normal;margin-right:10px;">Achievement</div> 
                      {{ item.achievement_yearend }}
                      </div>
                    </td>
                  </tr>
              </thead>
            </table>
         
          </div> 
          <v-btn size="small" color="primary" class="btn btn-primary noprint mt-5" @click="printDocument()">View as PDF</v-btn>
        </div>
      </v-row>  
          <div v-else class="mt-5 text-center">
            <small>Invalid link provided.</small>
          </div>
      <!-- selectedProfileKpi -->
    </v-container>
  </template>
  
<script setup>
import {  ref, computed,onMounted } from "vue"; 

import pdfFonts from "pdfmake/build/vfs_fonts.js";
import pdfMake from 'pdfmake';
import htmlToPdfmake from 'html-to-pdfmake'; 

import { useRoute } from "vue-router";

const route = useRoute(); 
const year = ref(route.params.year); 
const is_print = ref(route.query.print); 
const kpiDataEncrypted = ref(route.query.kpi);

if(kpiDataEncrypted.value){
  kpiDataEncrypted.value = JSON.parse(atob(kpiDataEncrypted.value));  
} 

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

  const printDocument = () => {
   //get table html
   const pdfTable = document.getElementById('divToPrint');
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML,{tableAutoSize:true});
    
    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts;
    pdfMake.createPdf(documentDefinition).open();
     
  }

onMounted(() => {
  setTimeout(() => {
    
    if(is_print.value == 1){
      window.print();
    }else{
      printDocument();
    } 
  }, 2000);
    
});
  
</script>
  
<style>
.v-navigation-drawer, header, .v-toolbar__content { display: none !important;}
main, .v-main, .v-container, .v-container .v-row.my-5{ padding-top: 0px; padding-left:0px; padding-right:0; padding-bottom: 0; }
.v-container .v-row.my-5{ margin: 0 !important;}
.v-theme--mel{max-width: 100% !important;}
.parent-tr{ background-color: #dbdbdb;}
@media print{
  .noprint { 
    display:none !important;
    visibility:hidden !important
  }
  #divToPrint{ width:100% !important; max-width: 100%;}
  td,th { font-size: 8px !important; margin: 0 30px;}
  .secondary-title{font-size: 8px !important; }
  .header-title { margin-top: 0 !important; padding-top: 0 !important; margin-bottom: 10px !important;}
}
</style>