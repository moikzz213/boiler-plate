<template>
    <v-container class="pb-16" style="max-width: 98%;">
        <v-row class="mt-5">
            <div class="v-col-12 pb-0">
                <div class="text-h6">
                    My Team {{ "(" + managerTeam.length + ")" }}
                </div>
            </div>
            <div class="v-col-12 v-col-md-3">
                <v-text-field
                    v-model="filter.data.employee"
                    variant="outlined"
                    density="compact"
                    class="bg-white"
                    hide-details
                    clearable
                    label="Input Employee Code"
                    @keydown.enter="runFilter"
                    @click:clear="clearField"
                >
                </v-text-field>
            </div>
            <div class="v-col-12 v-col-md-3">
                <v-select
                    v-model="filter.data.employee_type"
                    :items="employeeTypeList"
                    variant="outlined"
                    density="compact"
                    class="bg-white"
                    hide-details
                    label="Select Employee Type"
                >
                </v-select>
            </div>
            <div class="v-col-12 v-col-md-2">
                <v-btn
                    @click="runFilter"
                    block
                    color="primary"
                    class="text-capitalize"
                    >Filter</v-btn
                >
            </div>
            <div
                class="v-col-12 v-col-md-2 ml-auto d-flex align-center justify-end"
            >
                <div class="text-h6">Year: 2023</div>
            </div>
        </v-row>
        <v-row>
            <div v-if="managerTeam && managerTeam.length > 0" class="v-col-12">
                <div v-for="user in managerTeam" :key="user.id">
                    <div
                        class=""
                        :style="`
                            color: white;
                            font-size: 8px;
                            line-height: 8px;
                            margin-left: 15px;
                            padding: 4px 10px;
                            display: inline-block;
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px;
                            text-transform: uppercase;
                            background-color: ${
                                user.is_regular == true ? '#000' : '#2196F3'
                            };
                            `"
                    >
                        {{ user.is_regular == true ? "Regular Employee" : "Probation" }}
                    </div>
                    <v-card
                        class="mb-1 elevation-0"
                        @click="() => openMember(user)"
                    >
                        <!-- @click="() => openMember('SingleTeamMember', { id: user.id })" -->
                        <v-card-text>
                            <v-row>
                                <div class="v-col-12 v-col-md-3">
                                    <EmployeeCard :profile="user" />
                                </div>
                                <div class="v-col-12 v-col-md-8">
                                    <KpiProgress
                                        :density="'compact'"
                                        :selected-employee="user"
                                    />
                                </div>
                                <div
                                    class="v-col-12 v-col-md-1 d-flex justify-end align-center"
                                >
                                    <div
                                        v-if="
                                            (settingStore.pmsSettings &&
                                                settingStore.pmsSettings
                                                    .state != 'yearend') ||
                                            (user.reviews &&
                                                user.reviews.length > 0 &&
                                                user.reviews[0].type ==
                                                    'probation' &&
                                                user.reviews[0].state !=
                                                    'final_review')
                                        "
                                    >
                                        <div>
                                            {{ ratingOrWeightage(user) }} / 100
                                        </div>
                                        <div class="text-caption text-grey">
                                            Total KPI
                                        </div>
                                    </div>
                                </div>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
            <div v-else class="v-col-12">
                <v-card>
                    <v-card-text class="text-center">
                        No records found
                    </v-card-text>
                </v-card>
            </div>
        </v-row>
        <v-dialog v-model="dialogOpenMember" width="450">
            <v-card class="rounded-lg">
                <v-card-text>
                    {{ message }} {{ selectedUser.first_name }}?
                </v-card-text>
                <div class="pa-3 mt-3 d-flex justify-end">
                    <v-btn
                        color="primary"
                        variant="text"
                        @click="dialogOpenMember = false"
                        >Cancel</v-btn
                    >
                    <v-btn
                        :loading="loadingConfirmation"
                        color="primary"
                        class="ml-2 px-8"
                        @click="confirmOpenMember"
                        >yes</v-btn
                    >
                </div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="noKPIEmployee" width="450">
            <v-card class="rounded-lg">
                <v-card-text>
                    {{ errorMessage }}
                </v-card-text>
                <div class="pa-3 mt-3 d-flex justify-end">
                    <v-btn
                        color="primary"
                        variant="text"
                        @click="noKPIEmployee = false"
                        >Close</v-btn
                    >
                </div>
            </v-card>
        </v-dialog>
        <SnackBar :options="sbOptions" />
    </v-container>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { clientApi } from "@/services/clientApi";
import { useSettingStore } from "@/stores/settings";
import SnackBar from "@/components/SnackBar.vue";
const router = useRouter();
const openPage = (pathName, openParams = null) => {
    let paramsValue = openParams ? Object.assign({}, openParams) : false;
    router
        .push({
            name: pathName,
            params: paramsValue,
        })
        .catch((err) => {});
};

const sbOptions = ref({});
// authenticated user object
const authStore = useAuthStore();
const settingStore = useSettingStore();

const managerTeam = ref([]);

const year = ref(new Date().getFullYear());
const currentDate = ref(new Date());
// filter employee
const employeeTypeList = ref(["All", "Regular", "Probation"]);
const errorMessage = ref(
    "Employee doesn`t have a KPI review setup for this year."
);
const filter = ref({
    data: {
        employee: "",
        employee_type: "All",
    },
});

const ratingOrWeightage = (user) => {
    let sum = 0;
    if (user.reviews && user.reviews.length > 0 && user.reviews[0].key_review) {
        user.reviews[0].key_review.map((o, i) => {
            sum += o.weightage;
        });
    }
    return sum;
};

const loadingConfirmation = ref(false);
// open team member
const selectedUser = ref({});
const dialogOpenMember = ref(false);
const noKPIEmployee = ref(false);

const clearField = () => {
    filter.value.data.employee = "";
    managerTeam.value = originalTeamValue.value;
};

const confirmOpenMember = () => {
    loadingConfirmation.value = true;

    sbOptions.value = {
        status: true,
        type: "info",
        text: "Initializing KPI. Please wait...",
    };

    clientApi(authStore.authToken)
        .post("/api/create/employee-review/year", {
            ecode: selectedUser.value.ecode,
            is_regular: selectedUser.value.is_regular,
            setting: settingStore.filteredSetting(
                selectedUser.value.company_id
            ),
            year: year.value,
            author:
                authStore.authProfile.display_name +
                " " +
                authStore.authProfile.ecode,
        })
        .then((res) => {
            setTimeout(() => {
                sbOptions.value = {
                    status: true,
                    type: "success",
                    text: res.data.message,
                };
            }, 800);
        });

    clientApi(authStore.authToken)
        .get("/api/fetch/auth-profile/kpi/" + authStore.authProfile.ecode)
        .then((res) => {
            authStore.setProfile(res.data.result).then(() => {
                setTimeout(() => {
                    loadingConfirmation.value = false;
                    openPage("SingleTeamMember", {
                        id: selectedUser.value.ecode,
                    });
                }, 3000);
            });
        })
        .catch((err) => {});

    // redirect to SingleTeamMember
};

const message = ref("");
const openMember = (user) => {
    let msgError = "KPI review is currently closed";
    let statusGlobalSettings = settingStore.filteredSetting(user.company_id);
    message.value = "Do you want to set KPI for ";
    selectedUser.value = Object.assign({}, user);
    if (user.status == "Inactive") {
        errorMessage.value =
            "Employee is currently Inactive, kindly contact your HRBP if this is a mistake.";
        noKPIEmployee.value = true;
    } else if (user.reviews && user.reviews.length > 0) {
        if (
            user.is_regular == 1 &&
            user.reviews[0].status == "locked" &&
            user.reviews[0].state == "closed"
        ) {
            errorMessage.value = msgError;
            noKPIEmployee.value = true;
        } else if (user.reviews[0].status == "open") {
            dialogOpenMember.value = true;
            if (statusGlobalSettings.state != "setting") {
                message.value = "Do you want to initialize the review for ";
            }
        } else {
            openPage("SingleTeamMember", { id: user.ecode });
        }
    } else {
        if (
            statusGlobalSettings.status == "open" &&
            statusGlobalSettings.state == "setting"
        ) {
            dialogOpenMember.value = true;
        } else {
            if (user.is_regular == 0) {
                let date = new Date(user.doj);
                date.setDate(
                    date.getDate() +
                        parseInt(statusGlobalSettings.probation_kpi_setting)
                );

                if (date >= currentDate.value) {
                    dialogOpenMember.value = true;
                } else {
                    noKPIEmployee.value = true;
                }
            } else {
                if (
                    statusGlobalSettings.status == "locked" &&
                    statusGlobalSettings.state == "closed"
                ) {
                    errorMessage.value = msgError;
                }
                noKPIEmployee.value = true;
            }
        }
    }
};

const runFilter = () => {
    let result = originalTeamValue.value.filter(function (el) {
        if (filter.value.data.employee) {
            let nameToLower = el.display_name.toLowerCase();
            if (
                nameToLower.includes(filter.value.data.employee.toLowerCase())
            ) {
                return el;
            }
            return el.ecode == filter.value.data.employee;
        } else if (filter.value.data.employee_type == "Probation") {
            return el.is_regular == 0;
        } else if (filter.value.data.employee_type == "Regular") {
            return el.is_regular == 1;
        } else {
            return el;
        }
    });
    managerTeam.value = result;
};

const originalTeamValue = ref([]);
const fetchTeamMembers = () => {
    clientApi(authStore.authToken)
        .get("/api/fetch/team-members/" + authStore.authProfile.ecode)
        .then((res) => {
            managerTeam.value = res.data;
            originalTeamValue.value = res.data;
        })
        .catch((err) => {});
};
fetchTeamMembers();

// fetch pms settings
const fetchSettings = async () => {
    await clientApi(authStore.authToken)
        .get("/api/pms-settings/all")
        .then((res) => {
            settingStore.setPmsSettings(res.data);
        });
};
fetchSettings();
</script>
