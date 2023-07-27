<template>
    <v-container class="pb-16">
        <v-row class="mt-5">
            <div class="v-col-12 v-col-md-2">
            <VueDatePicker v-model="year" year-picker class="pms-date-picker" />
            </div>
            <div class="v-col-12 v-col-md-2">
                <v-select
                    v-model="filter.data.is_regular"
                    :items="employeeTypeList"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                    class="bg-white"
                    hide-details
                    label="Select Employee Type"
                >
                </v-select>
            </div>

            <div class="v-col-12 v-col-md-3">
                <div class="d-flex justify-space-between">
                    <v-btn
                        @click="runFilter"
                        height="40px"
                        color="secondary"
                        class="text-capitalize"
                        :loading="filter.loadingFilter"
                        
                        >Generate Report</v-btn
                    >
                </div>
            </div>
        </v-row>
        <v-row>
            <div class="v-col-12">
                <v-card class="mb-3 elevation-0">
                    <v-card-text>
                        <v-table density="compact" >
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Entity</th>
                                    <th class="text-center">Status</th>
                                    <th class="text-center">Locked</th>
                                    <th class="text-center">Open</th>
                                    <th class="text-center">InProgress</th>
                                    <th class="text-center">InReview</th>
                                    <th class="text-center">Submitted</th>
                                </tr>
                            </thead>
                            <tbody  v-if="companiesObj.length > 0" >
                                <tr v-for="(item,index) in companiesObj" :key="item.id">
                                    <td class="text-center">{{ index += 1}}</td>
                                    <td class="text-center"> {{ item.title }}</td>
                                    <td class="text-center text-capitalize py-2"><span :class="`${item.state == 'no-setting' ? 'text-error' : 'text-info'}`">{{ item.state == 'no-setting' ? "( No Setting )" : "( "+item.state + " - " + item.status + " )"}}</span></td>
                                    <td class="text-center">{{ item.lock }}</td>
                                    <td class="text-center">{{ item.open }}</td>
                                    <td class="text-center">{{ item.inprogress }}</td>
                                    <td class="text-center">{{ item.inreview }}</td>
                                    <td class="text-center">{{ item.submitted }}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-center">No record found.</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </div>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useSettingStore } from "@/stores/settings";
const settingStore = useSettingStore();

// authenticated user object
const authStore = useAuthStore();
const year = ref(new Date().getFullYear()); 

// filter employee
const employeeTypeList = ref([
    {
        value: 1,
        title: "Regular",
    },
    {
        value: 0,
        title: "Probation",
    },
]);

const filter = ref({
    loadingFilter: false,
    data: { 
        company_id: null,
        is_regular: 1,
    },
});
const runFilter = async () => {
    filter.value.loadingFilter = true;
    getEmployees()
        .then(() => {
            filter.value.loadingFilter = false;
        })
        .catch((err) => {
            filter.value.loadingFilter = false;
        });
};

// employees
const employees = ref([]);

const companies = ref([]);
const companiesObj = ref([]);
const getEmployees = async () => {
    let endpoint =
        "/api/reports/business-entity/kpi-employees?&filter[is_regular]=" +
        filter.value.data.is_regular + "&year=" + year.value +
        "&filter[hrbp_email]=" +
        authStore.authProfile.email;

    await clientApi(authStore.authToken)
        .get(endpoint)
        .then((res) => {
            employees.value = res.data;

            if (res.data && res.data.length > 0) {
                res.data.map((o, i) => {
                    if (!companies.value.includes(o.company_id)) {
                        companies.value.push(o.company_id);
                        companiesObj.value.push({
                            id: o.company_id,
                            title: o.company.title,
                        });
                    }
                });
                companyStatus();
            }
        })
        .catch((err) => {
            console.log("getEmployees", err);
        });
}; 

const companyStatus = () => {
    let companyStatus = {};
    if (companiesObj.value && companiesObj.value.length > 0) {
        companiesObj.value.map((o, i) => {
            companyStatus = settingStore.filterAllSettings(o.id, year.value);
           
            if (companyStatus.state) {
                o.state = companyStatus.state;
                o.status = companyStatus.status; 
                o.sort = i;
            } else {
                o.state = "no-setting";
                o.status = "locked"; 
                o.sort = 99;
            }
            o.lock = "-";
            o.open ="-";
            o.inprogress = "-";
            o.inreview = "-";
            o.submitted = "-";

            employees.value.map((j) =>{
                if(j.company_id == o.id){
                    if(j.reviews.length > 0){
                        if(j.reviews[0].status && (j.reviews[0].status == 'locked' || j.reviews[0].status == 'closed')){
                                 o.lock = !isNaN(o.lock) ? o.lock : 0;
                                 o.lock = parseInt(o.lock) + 1;
                        }else if(j.reviews[0].status && j.reviews[0].status == 'open'){ 
                                 o.open = !isNaN(o.open) ? o.open : 0;
                                 o.open = parseInt(o.open) + 1;
                        }else if(j.reviews[0].status && j.reviews[0].status == 'inprogress'){ 
                                 o.inprogress = !isNaN(o.inprogress) ? o.inprogress : 0;
                                 o.inprogress = parseInt(o.inprogress) + 1;
                        }else if(j.reviews[0].status && j.reviews[0].status == 'inreview'){ 
                                 o.inreview = !isNaN(o.inreview) ? o.inreview : 0;
                                 o.inreview = parseInt(o.inreview) + 1;
                        }else if(j.reviews[0].status && j.reviews[0].status == 'submitted'){   
                                 o.submitted = !isNaN(o.submitted) ? o.submitted : 0;
                                 o.submitted = parseInt(o.submitted) + 1;
                        }
                    }else if(o.state == 'no-setting'){ 
                            o.lock = !isNaN(o.lock) ? o.lock : 0; 
                            o.lock = parseInt(o.lock) + 1; 
                    }else{
                        if(o.status == 'closed' || o.status == 'locked'){
                            o.lock = !isNaN(o.lock) ? o.lock : 0;
                            o.lock = parseInt(o.lock) + 1;
                        }else{
                            o.open = !isNaN(o.open) ? o.open : 0;
                            o.open = parseInt(o.open) + 1;
                        }
                    }
                }
            });
        });
    }
    companiesObj.value.sort((a, b) => {
        return a.sort - b.sort;
    }); 
} 
</script>