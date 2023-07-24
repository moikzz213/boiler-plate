<template>
    <v-container class="pb-16" style="max-width: 95%;">
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
                                <EmployeeCard :profile="selEmployeeObj" />
                            </div>
                            <div class="v-col-12 v-col-md-2 d-flex flex-column">
                                <div class="text-caption text-grey">
                                    Reporting To
                                </div>
                                <div class="text-body-2">{{ managerName }}</div>
                            </div>
                            <div class="v-col-12 v-col-md-2 d-flex flex-column">
                                <div class="text-caption text-grey">
                                    Business Unit
                                </div>
                                <div class="text-body-2"> 
                                    {{
                                        selEmployeeObj.company &&
                                        selEmployeeObj.company.title
                                    }}
                                </div>
                            </div>
                            <div class="v-col-12 v-col-md-2 d-flex flex-column">
                                <div class="text-caption text-grey">
                                    KPI's Target Year
                                </div>
                                <div class="text-body-2">
                                    {{ globalSetting.year }}
                                </div>
                            </div>
                            <div class="v-col-12 v-col-md-1 d-flex flex-column">
                                <div class="text-caption text-grey">
                                    Total KPI
                                </div>
                                <div class="text-body-2">
                                    {{ ratingOrWeightage(selEmployeeObj) }}/100
                                </div>
                            </div>
                            <div
                                class="v-col-12 v-col-md-2 d-flex align-center"
                            > 
                                <v-btn
                                    size="large"
                                    v-if="
                                        !hasError &&
                                        totalWeightage == 100 &&
                                        selEmployeeObj.reviews &&
                                        selEmployeeObj.reviews.length > 0 &&
                                        (selEmployeeObj.reviews[0].status ==
                                            'inprogress' ||
                                            selEmployeeObj.reviews[0].status ==
                                                'inreview' ||
                                            selEmployeeObj.reviews[0].status ==
                                                'open')
                                    "
                                    @click="submitForReview"
                                    :loading="loadingBtn"
                                    block
                                    :disabled="disabledBtn"
                                    color="secondary"
                                    class="text-capitalize rounded-lg text-md-caption text-lg-body-2"
                                    >{{
                                        selEmployeeObj.is_regular &&
                                        selEmployeeObj.reviews[0].state ==
                                            "setting" &&
                                        selEmployeeObj.reviews[0].status ==
                                            "inprogress"
                                            ? "Submit for Review"
                                            : "Submit"
                                    }}
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </div>
        </v-row>
        <KpiContent
        :selected-employee="selEmployeeObj"
            :measures-list="measuresList"
            :industry-list="industryWithKPI"
            :ecd-list="ecdList"
            @savedResponse="savedResponseMethod"
            @errorcheck="errorCheck"
            @yearchange="selectedYearResponse"
            @removeKPI="removeKPIMethod"
            :is-manager="true"
        />

        <SnackBar :options="sbOptions" />
    </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { useRoute, useRouter } from "vue-router";
import { clientApi } from "@/services/clientApi";
import { useSettingStore } from "@/stores/settings";
import { useIndustryStore } from "@/stores/industry";
import SnackBar from "@/components/SnackBar.vue";
const router = useRouter();
const route = useRoute();

const props = defineProps({
    manager: {
        type: String,
        default: null,
    },
});

const ecode = ref(route.params.id);

// authenticated user object
const authStore = useAuthStore();
const settingStore = useSettingStore();
const industryStore = useIndustryStore();
const sbOptions = ref({});
const managerName = authStore.authProfile.display_name;
// selected employee

const teamList = ref([]);
const selectedEmployeeArr = ref(ecode.value);
const selEmployeeObj = ref({});

const changeEmployee = () => {
    selEmployeeObj.value = selectedEmployeeArr.value;
    router
        .push({
            name: "SingleTeamMember",
            params: { id: selectedEmployeeArr.value.ecode },
        })
        .catch((err) => {});
};

const totalWeightage = ref(0);
const ratingOrWeightage = (user) => {
    let sum = 0;
    if (user.reviews && user.reviews.length > 0 && user.reviews[0].key_review) {
        user.reviews[0].key_review.map((o, i) => {
            sum += o.weightage;
        });
    }
    totalWeightage.value = sum;
    return sum;
};

const industryList = ref([]);
const selectIndustry = async () => {
    if (industryStore.industries.length == 0) {
        industryStore.getIndustries(authStore.authToken).then(() => {
            industryList.value = industryStore.industries;
        });
    } else {
        industryList.value = industryStore.industries;
    }
};

const industryWithKPI = ref([]);
const ecdList = ref([]);

const kpiMaster = async () => {
    await clientApi(authStore.authToken)
        .get("/api/fetch/master-kpi/non-paginate")
        .then((res) => {
           
            if (
                industryList.value &&
                industryList.value.length > 0 &&
                res.data &&
                res.data.length > 0
            ) {
                industryList.value.map((o, i) => {
                    industryWithKPI.value[i] = o;
                    industryWithKPI.value[i].kpis = [];
                    let count = 0;
                    let ecdCount = 0;
                    res.data.map((oo, ii) => {
                        if (o.id == oo.industry_id) {
                            industryWithKPI.value[i].kpis[count] = oo;
                            count++;
                        } else if (oo.type == "ecd") {
                            ecdList.value[ecdCount] = oo;
                            ecdCount++;
                        }
                    });
                });
            }
        });
};

const customKpiMaster = async () => {
    await clientApi(authStore.authToken)
        .get(
            "/api/fetch/master-custom-kpi/non-paginate/" +
                authStore.authProfile.ecode
        )
        .then((res) => {
            if (
                industryList.value &&
                industryList.value.length > 0 &&
                res.data &&
                res.data.length > 0
            ) {
                industryList.value.map((o, i) => {
                    let ecdCount = 0;
                    res.data.map((oo) => {
                        if (o.id == oo.industry_id) {  
                            
                            o.kpis.unshift(oo);
                        } else if (oo.type == "ecd") { 
                            ecdList.value[ecdCount] = oo;
                            ecdCount++;
                        }
                    });
                });
            }
        });
};

const loadingBtn = ref(false);
const disabledBtn = ref(false);
const submitForReview = () => {
    loadingBtn.value = true;
    let status = "inprogress";
    let reviewID = selEmployeeObj.value.reviews[0].id;
    if (!reviewID) {
        sbOptions.value = {
            status: true,
            type: "error",
            text: "Error: kindly refresh page and submit again.",
        };
        return false;
    }

    if (selEmployeeObj.value.reviews[0].state == "setting") {
        if (
            selEmployeeObj.value.is_regular &&
            (selEmployeeObj.value.reviews[0].status == "open" ||
                selEmployeeObj.value.reviews[0].status == "inprogress")
        ) {
            status = "inreview";
        } else {
            status = "submitted";
        }
    } else {
        if (
            selEmployeeObj.value.reviews[0].status == "open" ||
            selEmployeeObj.value.reviews[0].status == "inprogress"
        ) {
            status = "submitted";
        }
    }
    let formData = {
        reviewID: reviewID,
        newStatus: status,
        user_ecode: authStore.authProfile.ecode,
        managerEmail: authStore.authProfile.email,
        managerName: authStore.authProfile.display_name,
        allowedDays: selEmployeeObj.value.is_regular
            ? globalSetting.value.employee_review_allowed_days
            : globalSetting.value.probation_kpi_setting,
        closingDateSetting: selEmployeeObj.value.is_regular
            ? globalSetting.value.annual_kpi_setting_end
            : globalSetting.value.probation_kpi_setting,
        closingDateMid: selEmployeeObj.value.is_regular
            ? globalSetting.value.mid_year_review_end
            : globalSetting.value.probation_first_review_end,
        closingDateFinal: selEmployeeObj.value.is_regular
            ? globalSetting.value.end_year_review_end
            : globalSetting.value.probation_final_review_end,
    };
    clientApi(authStore.authToken)
        .post("/api/manager/employee-kpi/submit", formData)
        .then((res) => {
            sbOptions.value = {
                status: true,
                type: "success",
                text: res.data.message,
            };
            teamList.value = res.data.profile.teams;
            authStore.setProfile(res.data.profile).then(() => {
              employeePassData();

              setTimeout(() => {
                  loadingBtn.value = false;
                  disabledBtn.value = true;
              }, 2000);
          });
        })
        .catch((err) => {});
};

const hasError = ref(false);
const errorCheck = (v) => {
    hasError.value = v.hasError;
};

const removeKPIMethod = (v) => {
    let formData = {
        id: v.id,
        user_ecode: authStore.authProfile.ecode,
    };
    clientApi(authStore.authToken)
        .post("/api/delete/employee-kpi-year", formData)
        .then((res) => {
            teamList.value = res.data.profile.teams;
            authStore.setProfile(res.data.profile).then(() => {
                employeePassData();
                sbOptions.value = {
                    status: true,
                    type: "success",
                    text: res.data.message,
                };
            });
        })
        .catch((err) => {});
};

const savedResponseMethod = (v) => {
    
    let formData = {
        action: v.action,
        reviewID: v.reviewID,
        data: v.data,
        type: v.type,
        user_ecode: authStore.authProfile.ecode,
    };
    clientApi(authStore.authToken)
        .post("/api/create/employee-kpi-year", formData)
        .then((res) => {
            sbOptions.value = {
                status: true,
                type: "success",
                text: res.data.message,
            };
         
            teamList.value = res.data.profile.teams;
            authStore.setProfile(res.data.profile).then(() => {
                employeePassData();
            });
        })
        .catch((err) => {});
};
const selectedYearResponse = (v) => {
    getKPI(v);
};
const getKPI = async (year) => {
    await clientApi(authStore.authToken)
        .get("/api/dashboard/my-kpi/" + selEmployeeObj.value.id + "/" + year)
        .then((res) => {
            if (res.data.result == null) {
                selEmployeeObj.value = {
                    ...selEmployeeObj.value,
                    ...{
                        reviews: [],
                    },
                };
            } else {
                selEmployeeObj.value = {
                    ...selEmployeeObj.value,
                    ...{
                        reviews: [res.data.result],
                    },
                };
            }
        })
        .catch((err) => {});
};

const measuresList = ref([]);
const fetchMeasures = async () => {
    await clientApi(authStore.authToken)
        .get("/api/fetch/measures/non-paginated")
        .then((res) => {
            measuresList.value = res.data;
        })
        .catch((err) => {});
};

const employeePassData = () => {
    selEmployeeObj.value = {};
    let filteredEmp = teamList.value.filter((o) => {
        return o.username == ecode.value;
    });
    selEmployeeObj.value = Object.assign({}, filteredEmp[0]);
    getKPI(2023);
};

const globalSetting = computed(() =>
    settingStore.filteredSetting(selEmployeeObj.value.company_id)
);

const fetchTeamMembers = async () => {
    await clientApi(authStore.authToken)
        .get("/api/fetch/team-members/" + authStore.authProfile.ecode)
        .then((res) => { 
            if(res.data && res.data.length > 0){
                teamList.value = res.data.filter( o => o.reviews.length > 0);
            }
        })
        .catch((err) => {});
};

onMounted(() => {
fetchTeamMembers().then(() => {
    employeePassData();
    selectIndustry().then(() => {
        kpiMaster().then(() => {
            customKpiMaster().then(() => {
                fetchMeasures();
            });
        });
    });
});

});
</script>
