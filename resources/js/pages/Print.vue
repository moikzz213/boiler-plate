<template>
  <v-container class="pb-16" style="max-width:1200px;">
    <v-row class="my-5" v-if="have_access && kpiDataEncrypted">
      <div class="v-col-12">
        <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5"
          @click="() => printDocument(null, pdfcont, 'portrait')">Download PDF - Portrait</v-btn>
        <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5"
          @click="() => printDocument(null, pdfcont, 'landscape')">Download PDF - Landscape</v-btn>
        <v-btn size="small" color="primary" class="btn btn-primary noprint ml-1 mt-5"
          @click="() => printDocument(1)">PRINT</v-btn>
        <div id="divToPrint" ref="pdfcont" width="100%">
          <div class="text-h6 mb-1 header-title text-center" style="text-align: center; margin-bottom: 10px;">GHASSAN
            ABOUD GROUP</div>
          <div class="sub-header py-1  mb-1 header-title text-center"
            style="text-align: center; margin-bottom: 10px;font-size:14px; !important">Performance Management System KPI's
            Form (Grade 6 - 10 Only)</div>
          <!-- <div class="mb-5 text-center" style="text-align: center; margin-bottom: 15px;font-size:12px;text-transform: uppercase;">
              {{ printState(kpiDataEncrypted.reviews[0].type) }} - {{ printState(kpiDataEncrypted.reviews[0].state) }} - {{ printState(kpiDataEncrypted.reviews[0].status) }}</div> -->
          <v-row class="download-print my-0">
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Employee ID :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1">{{ kpiDataEncrypted.ecode }}</v-col>
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Grade :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1">8</v-col>
          </v-row>
          <v-row class="download-print my-0">
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Emp Name :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1">{{ kpiDataEncrypted.display_name }}</v-col>
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Designation :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1">{{ kpiDataEncrypted.designation }}</v-col>
          </v-row>
          <v-row class="download-print my-0">
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Business Unit :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1">{{ kpiDataEncrypted.company ?
              kpiDataEncrypted.company.title : '' }}</v-col>
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Department :</v-col>
            <v-col style="max-width:38%" class="my-0 pb-0 pt-1"> </v-col>
          </v-row>
          <v-row class="download-print my-0">
            <v-col style="max-width:100px" class="my-0 pb-0 pt-1">Reporting To :</v-col>
            <v-col style="max-width:86%" class="my-0 pb-0 pt-1">Steve Ayala / Sr. Software Developer / G - 7 </v-col>
          </v-row>
          <v-row class="download-print my-0">
            <v-col style="max-width:200px" class="my-0 pb-0 pt-1">KPI's & Target Setting Year & Month :</v-col>
            <v-col style="max-width:70%" class="my-0 pb-0 pt-1">Jan 1, {{ year }}</v-col>
          </v-row>

          <table class="mt-1" v-if="kpiArray && kpiArray.length > 0" style="width:100%" border="1" cellpadding="0"
            cellspacing="0">
            <thead>
              <tr>
                <td class="py-1 px-2" style="background:#e6e6e6;color:#000;" colspan="8">
                  KPI's count: 4 to 6 KPI's, 70% weightage to KPI's & 30% weightage to competencies development. KPI's &
                  Targets integrated with Annual Business Plan & Budget for FY {{ year }}
                </td>
              </tr>
              <tr>
                <td class="px-1  text-center" width="30">#</td>
                <td class="px-1 text-center" width="30%">KPI's</td>
                <td class="px-1 py-2 text-center">Measures (Units, Volumes, Values in AED, Index, %ile, any suitable measures)</td>
                <td class="px-1 py-2 text-center">Assigned Weightage (%)</td>
                <td class="px-1 py-2 text-center">Target for the Year - Planned {{ year }}</td>
                <td class="px-1 py-2 text-center">{{ kpiDataEncrypted.reviews[0].type == 'regular' ? 'Mid Year Performance Review' : 'First Review'}} {{ year }}</td>
                <td class="px-1 py-2 text-center">{{ kpiDataEncrypted.reviews[0].type == 'regular' ? 'Final Target Achievement - Actuals' : 'Final Review'}} {{ year }}</td>
                <td class="px-1 py-2 text-center">Overall Performance Score (Month 1-12) Refer the KPI's Target Description below</td>
              </tr>
            </thead>
            <tbody v-for="item, index in kpiArray" :key="item.id">
              <tr>
                <td class="px-2 py-2 text-center">{{ index + 1 }}</td>
                <td class="px-2"> {{ item.title }}</td>
                <td class="px-2 text-center"> {{ item.measures }}</td>
                <td class="px-2 text-center"> {{ item.weightage }}%</td>
                <td class="px-2 text-center"> {{ item.target }}{{ item.measures == 'Percentage' ? '%' : '' }}</td>
                <td class="px-2 text-center"> {{ item.achievement_midyear }}{{ item.achievement_midyear && item.measures
                  == 'Percentage' ? '%' : '' }}</td>
                <td class="px-2 text-center"> {{ item.achievement_yearend }}{{ item.achievement_yearend && item.measures
                  == 'Percentage' ? '%' : '' }}</td>
                <td class="px-2 text-center"> {{ item.achievement_yearend }}</td>
              </tr>
            </tbody>
          </table>
          <v-row class="download-print my-0 mx-0">
            <v-col md="12" class="pb-1" style="font-size:11px;"> KPI's Target Description</v-col>
          </v-row>
          <v-row class="download-print my-0 mb-5 mx-0">
            <v-col md="8" class="mt-0 pt-0">
              100% & Above: Exceeded Targets / Stretch Target = 6 (Significant Achievement - Extremely Excellent)<br />
              70% to 89% of target achievement = 4 (Very Good)<br />
              35% to 49% of target achievement = 2 (Satisfactory)
            </v-col>
            <v-col md="4" class="mt-0 pt-0">
              90 % to 99% Closeness to reach the Target = 5 (Excellent)<br />
              50% to 69% of target achievement = 3 (Good)<br />
              1% to 34% of target achievement = 1 ( Needs to Improve - Poor)
            </v-col>

            <v-col v-if="technicalArr.length == 0" md="12" sm="12" xs="12" class="py-2 pb-6" style="border: 1px solid #000;">
                Reporting Managers Final Comments/Remarks:
              </v-col>
              <v-col v-if="technicalArr.length == 0" md="12" sm="12" xs="12" class="py-2 pb-6" style="border: 1px solid #000;">
                Employee Comments:
              </v-col>
              <v-col v-if="technicalArr.length == 0" md="12" sm="12" xs="12" class="px-1 py-2">
                Final Rating (KPI's + Employee Capability Development): 5 - Top Performer,4- Strong Performer, 3-
                Competent Performer, 2- Developing Perfomer,1- Low Performer
              </v-col>
              <v-col v-if="technicalArr.length == 0" md="6" sm="6" xs="6" class="px-1 py-4 d-flex">Reporting Manager's Signature & Date: <div
                  style="border-bottom:1px solid #000;padding-right:170px;"></div></v-col>
              <v-col v-if="technicalArr.length == 0" md="6" sm="6" xs="6" class="px-4 py-4 d-flex">HOD or Reviewing Manager's Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:165px;"></div></v-col>

              <v-col v-if="technicalArr.length == 0" md="6" sm="6" xs="6" class="px-1 py-4 d-flex">Employee Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:220px;"></div></v-col>
              <v-col v-if="technicalArr.length == 0" md="6" sm="6" xs="6" class="px-4 py-4 d-flex">HRBP Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:280px;"></div></v-col>
          </v-row>
         
          <div id="ecd-print" class="ecd-print" v-if="technicalArr.length > 0">
            <div class="text-h6 mb-1 header-title text-center" style="text-align: center; margin-bottom: 10px;">GHASSAN
              ABOUD GROUP</div>
            <div class="sub-header py-1  mb-1 header-title text-center"
              style="text-align: center; margin-bottom: 10px;font-size:14px; !important">Performance Management System
              KPI's Form (Grade 6 - 10 Only)</div>

            <v-row class="download-print ma-0 mb-1">
              <v-col md="12" sm="12" xs="12" class="px-4 py-2" style="border: 1px solid #000;">
                Employee Capability Development - ECD (To be filled at the Time of KPI's Target Setting Phase Only, 30%
                weightage can be distributed between Technical & Behavioural areas)
              </v-col>
              <v-col md="6" sm="6" xs="6" class="px-4 py-2" style="border: 1px solid #000;">
                <strong>Technical / Functional / Job Related Trainings:</strong> Identify 2 or 3 training programs along
                with weightage% which may help or increase the employee job knowledge or competency level to achieve the
                assigned target. (For Example: Business Analytics, Strategic Planning, Essential Food Safety, Advance MS
                Office skills, Project Management, ECommerce, International Trade Terms, Supply chain Analytics , CRM,
                Business Intelligence, Advance Financial Management)
              </v-col>
              <v-col md="6" sm="6" xs="6" class="px-4 py-2" style="border: 1px solid #000;">
                <strong>Soft Skills or Behaviour Related Trainings:</strong> Identify 1 or 2 training programs weightage%
                which may enhance the employee behaviour or a skill which enables to achieve the assigned target. ( For
                example: Negotiation skills, Coaching & Mentoring skills, Managerial skills development, Leadership
                Development, Planning & Organizing skills, Team Management & Supervisory development skills, Emotional
                Intelligence etc)
              </v-col>
            </v-row>

            <v-row class="download-print ma-0 mb-1">
              <v-col md="6" sm="6" xs="6" class="px-3 py-2">
                <v-row v-for="item, index in technicalArr" :key="item.id">
                  <v-col style="border: 1px solid #000;">
                    {{ index + 1 }}. {{ item.title }}
                  </v-col>
                  <v-col v-if="technicalArr.length == 1" md="12" sm="12" xs="12" style="border: 1px solid #000;">
                    2.
                  </v-col>
                </v-row>
              </v-col>

              <v-col md="6" sm="6" xs="6" class="px-3 py-2">
                <v-row v-for="item, index in softskillArr" :key="item.id">
                  <v-col md="12" sm="12" xs="12" style="border: 1px solid #000;">
                    {{ index + 1 }}. {{ item.title }}
                  </v-col>
                  <v-col v-if="softskillArr.length == 1" md="12" sm="12" xs="12" style="border: 1px solid #000;">
                    2.
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-row class="download-print ma-0 mb-5">
              <v-col md="12" sm="12" xs="12" class="px-4 py-2" style="border: 1px solid #000;">
                <strong>ECD Ratings by end of the year (after attending the training):</strong>
                5 - Skill level improved drastically & widely noticed,
                4 - Improvement is noticed,
                3 - Marginal improvement in skills,
                2 - Very slight Improvement,
                1 - No Improvement at all,
                0 - Didn't attend the training
              </v-col>
              <v-col md="12" sm="12" xs="12" class="px-4 py-2 pb-6" style="border: 1px solid #000;">
                Reporting Managers Final Comments/Remarks:
              </v-col>
              <v-col md="12" sm="12" xs="12" class="px-4 py-2 pb-6" style="border: 1px solid #000;">
                Employee Comments:
              </v-col>
              <v-col md="12" sm="12" xs="12" class="px-1 py-2">
                Final Rating (KPI's + Employee Capability Development): 5 - Top Performer,4- Strong Performer, 3-
                Competent Performer, 2- Developing Perfomer,1- Low Performer
              </v-col>
              <v-col md="6" sm="6" xs="6" class="px-1 py-4 d-flex">Reporting Manager's Signature & Date: <div
                  style="border-bottom:1px solid #000;padding-right:170px;"></div></v-col>
              <v-col md="6" sm="6" xs="6" class="px-4 py-4 d-flex">HOD or Reviewing Manager's Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:165px;"></div></v-col>

              <v-col md="6" sm="6" xs="6" class="px-1 py-4 d-flex">Employee Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:220px;"></div></v-col>
              <v-col md="6" sm="6" xs="6" class="px-4 py-4 d-flex">HRBP Signature & Date:<div
                  style="border-bottom:1px solid #000;padding-right:280px;"></div></v-col>

            </v-row>
          </div>
        </div>
        <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5"
          @click="() => printDocument(null, pdfcont, 'portrait')">Download PDF - Portrait</v-btn>
        <v-btn size="small" color="primary" class="btn btn-primary noprint mr-1 mt-5"
          @click="() => printDocument(null, pdfcont, 'landscape')">Download PDF - Landscape</v-btn>
        <v-btn size="small" color="primary" class="btn btn-primary noprint ml-1 mt-5"
          @click="() => printDocument(1)">PRINT</v-btn>
      </div>
    </v-row>
    <div v-else class="mt-5 text-center">
      <small>Sorry but you dont have access to this KPI / Link is invalid.</small>
    </div>
    <!-- selectedProfileKpi -->
  </v-container>
</template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import html2pdf from "html2pdf.js";
import { useRoute } from "vue-router";
import { clientApi } from "@/services/clientApi";

const pdfcont = ref(null);

const authStore = useAuthStore();
const route = useRoute();
const year = ref(route.params.year);
const ecode = ref(route.params.ecode);
const is_print = ref(route.query.print);
const kpiDataEncrypted = ref(null);

const teamList = ref(authStore.authProfile.teams);
const have_access = ref(false);
const adminRoles = ref(['hr_admin', 'app_admin']);
if (authStore.authProfile.ecode == ecode.value || adminRoles.value.includes(authStore.authProfile.role)) {
  have_access.value = true;
} else if (teamList.value && teamList.value.length > 0) {
  let selected = teamList.value.filter((o) => { return o.username == ecode.value })

  if (selected.length > 0) {
    have_access.value = true;
  }
}

const printDocument = (isPrint, container, orientation) => {
  const doc = html2pdf();
  if (isPrint) {
    window.print();
  } else {
    doc.set({
      margin: 0.3,
      filename: "Performance-Review-" + year.value + "-" + ecode.value + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      pagebreak: { mode: "css", before: "#ecd-print" },
      jsPDF: { unit: "in", format: "a4", orientation: orientation },
    })
      .from(container)
      .save();

  }
}

const fetchEmployeeKPIbyYear = async () => {
  await clientApi(authStore.authToken)
    .get("/api/print/employee-kpi/year/" + ecode.value + "/" + year.value)
    .then((res) => {
      kpiDataEncrypted.value = res.data.result;

      setTimeout(() => {
        if (is_print.value == 1) {
          window.print();
        }
      }, 1000);
    })
    .catch((err) => {
    });
};

onMounted(() => {
  if (have_access.value) {
    fetchEmployeeKPIbyYear();
  }
});
//ecdArray
const kpiArray = computed(() => {
  if (!kpiDataEncrypted.value.reviews || kpiDataEncrypted.value.reviews.length == 0) return [];
  return kpiDataEncrypted.value.reviews[0].key_review.filter((kpi) => kpi.type == 'kpi');
});
const technicalArr = computed(() => {
  if (!kpiDataEncrypted.value.reviews || kpiDataEncrypted.value.reviews.length == 0) return [];
  return kpiDataEncrypted.value.reviews[0].key_review.filter((kpi) => kpi.ecd_type == 'technical' || kpi.ecd_type == 'technical,softskill');
});

const softskillArr = computed(() => {
  if (!kpiDataEncrypted.value.reviews || kpiDataEncrypted.value.reviews.length == 0) return [];
  return kpiDataEncrypted.value.reviews[0].key_review.filter((kpi) => kpi.ecd_type == 'softskill');
}); 
</script>
<style>.download-print {
  font-size: 10px;
}

.sub-header {
  background-color: #005795;
  color: #fff;
}

.v-navigation-drawer,
header,
.v-toolbar__content {
  display: none !important;
}

main,
.v-main,
.v-container,
.v-container .v-row.my-5 {
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0;
  padding-bottom: 0;
}

.v-container .v-row.my-5 {
  margin: 0 !important;
}

.v-theme--mel {
  max-width: 100% !important;
}

table tr th,
table tr td {
  font-size: 10px;
}

@media print {
  .v-container {
    background: #fff;
  }

  .ecd-print {
    page-break-before: always
  }

  .noprint {
    display: none !important;
    visibility: hidden !important
  }

  #divToPrint {
    width: 100% !important;
    max-width: 100%;
  }

  td,
  th {
    font-size: 10px !important;
    margin: 0 30px;
  }

  .secondary-title {
    font-size: 10px !important;
  }

  .header-title {
    margin-top: 0 !important;
    padding-top: 0 !important;
    margin-bottom: 10px !important;
  }
}</style>