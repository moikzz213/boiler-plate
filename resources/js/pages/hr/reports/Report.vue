<template>
    <v-container class="pb-16">
        <v-row class="mt-5">
            <div class="v-col-12">
                <div class="text-h6">Report</div>
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
                        style="width: 48%"
                        >Search</v-btn
                    >
                </div>
            </div>
        </v-row>
        <v-row>
            <div v-if="employees.length > 0" class="v-col-12">
                <v-card class="mb-3 elevation-0">
                    <v-card-text>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Entity</th>
                                    <th class="text-center">Locked</th>
                                    <th class="text-center">Open</th>
                                    <th class="text-center">InProgress</th>
                                    <th class="text-center">InReview</th>
                                    <th class="text-center">Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </div>
            <div v-else class="v-col-12">
                <v-card>
                    <v-card-text class="text-center">
                        No records found
                    </v-card-text>
                </v-card>
            </div>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import { useCompanyStore } from "@/stores/company";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { useSettingStore } from "@/stores/settings";
const settingStore = useSettingStore();

// authenticated user object
const authStore = useAuthStore();

// router
const router = useRouter();
const route = useRoute();
const openPage = (pathName, openParams = null) => {
    let paramsValue = openParams ? Object.assign({}, openParams) : false;
    router
        .push({
            name: pathName,
            params: paramsValue,
        })
        .catch((err) => {});
};

const ratingOrWeightage = (user) => {
    let sum = 0;
    if (user.reviews && user.reviews.length > 0 && user.reviews[0].key_review) {
        user.reviews[0].key_review.map((o, i) => {
            sum += o.weightage;
        });
    }
    return sum;
};
// companies
const companyStore = useCompanyStore();
const loadingCompany = ref(false);
const loadCompnaies = () => {
    if (companyStore.companies.length == 0) {
        loadingCompany.value = true;
        companyStore.getCompanies(authStore.authToken).then(() => {
            loadingCompany.value = false;
        });
    }
};

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
        employee: null,
        company_id: null,
        is_regular: 1,
    },
});
const runFilter = async () => {
    filter.value.loadingFilter = true;
    getEmployees(1)
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
        filter.value.data.is_regular +
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
                let companyStatus = [];
                if (companiesObj.value && companiesObj.value.length > 0) {
                    companiesObj.value.map((o, i) => { 
                          companyStatus = settingStore.filteredSetting( o.id );
                          console.log("companyStatus", companyStatus);
                    });
                }
                console.log("companiesObj.value", companiesObj.value);
            }
        })
        .catch((err) => {
            console.log("getEmployees", err);
        });
};

getEmployees();
</script>
