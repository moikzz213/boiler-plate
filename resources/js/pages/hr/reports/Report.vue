<template>
    <v-container class="pb-16">
        <v-row class="mt-5">
            <div class="v-col-12 v-col-md-2">
                <VueDatePicker
                    v-model="year"
                    year-picker
                    class="pms-date-picker"
                />
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
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-left">Entity</th>
                                    <th class="text-center">Status</th>
                                    <th class="text-center">Locked</th>
                                    <th class="text-center">Open</th>
                                    <th class="text-center">InProgress</th>
                                    <th class="text-center">InReview</th>
                                    <th class="text-center">Submitted</th>
                                </tr>
                            </thead>
                            <tbody v-if="companiesObj.length > 0">
                                <tr
                                    v-for="(item, index) in companiesObj"
                                    :key="item.id"
                                >
                                    <td class="text-center">
                                        {{ (index += 1) }}
                                    </td>
                                    <td class="text-left">{{ item.title }}</td>
                                    <td
                                        class="text-center text-capitalize py-2"
                                    >
                                        <span
                                            :class="`${
                                                item.state == 'no-setting'
                                                    ? 'text-error'
                                                    : 'text-info'
                                            }`"
                                            >{{
                                                item.state == "no-setting"
                                                    ? "( No Setting )"
                                                    : "( " +
                                                      item.state +
                                                      " - " +
                                                      item.status +
                                                      " )"
                                            }}</span
                                        >
                                    </td>
                                    <td
                                        class="text-center cursor-pointer"
                                        @click="
                                            viewEmployee(
                                                item.employees.locked,
                                                item.title
                                                ,'locked'
                                            )
                                        "
                                    >
                                        {{ item.lock }}
                                    </td>
                                    <td
                                        class="text-center cursor-pointer"
                                        @click="
                                            viewEmployee(
                                                item.employees.open,
                                                item.title
                                                ,'open'
                                            )
                                        "
                                    >
                                        {{ item.open }}
                                    </td>
                                    <td
                                        class="text-center cursor-pointer"
                                        @click="
                                            viewEmployee(
                                                item.employees.inprogress,
                                                item.title,
                                                'inprogress'
                                            )
                                        "
                                    >
                                        {{ item.inprogress }}
                                    </td>
                                    <td
                                        class="text-center cursor-pointer"
                                        @click="
                                            viewEmployee(
                                                item.employees.inreview,
                                                item.title,
                                                'inreview'
                                            )
                                        "
                                    >
                                        {{ item.inreview }}
                                    </td>
                                    <td
                                        class="text-center cursor-pointer"
                                        @click="
                                            viewEmployee(
                                                item.employees.submitted,
                                                item.title,
                                                'submitted'
                                            )
                                        "
                                    >
                                        {{ item.submitted }}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="8" class="text-center">
                                        No record found.
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </div>
        </v-row>

        <div class="text-center">
            <v-dialog v-model="isViewList" width="auto">
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon  dark @click="isViewList = false">
                            <v-icon size="16" :icon="mdiClose"></v-icon>
                        </v-btn> 
                        <v-spacer></v-spacer>
                        <div class="text-uppercase">{{ dialogTitle }} - ( {{ listEmployeeReport.statusReview }} )</div>
                        <v-spacer></v-spacer>
                        <DownloadExcel 
                        v-if="listEmployeeReport.length > 0"
                            :fetch="donwloadLeads"
                            :fields="json_field"
                            worksheet="Report"
                            name="PMS-Report.csv"
                            type="csv"
                            disabled
                            class="mr-3"
                            >
                            <v-btn  
                                color="green" icon
                                :disabled="Object.keys(listEmployeeReport).length == 0 ? true : false"
                               dark
                            >
                             <v-icon size="32" :icon="mdiDownload"></v-icon>
                            </v-btn>
                            </DownloadExcel>
                    </v-toolbar>  
                    <v-card-text>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Emp.ID</th>
                                    <th>Emp.Name</th>
                                    <th>Manager</th>
                                    <th>Job Title</th> 
                                    <th>Department</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody
                                v-if="
                                    listEmployeeReport &&
                                    listEmployeeReport.length > 0
                                "
                            >
                                <tr
                                    v-for="(item, index) in listEmployeeReport"
                                    :key="item.id"
                                >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.ecode }}</td>
                                    <td>{{ item.display_name }}</td>
                                    <td>
                                        {{
                                            item.managed_by
                                                ? item.managed_by.display_name
                                                : ""
                                        }}
                                    </td>
                                    <td>{{ item.designation }}</td> 
                                    <td>{{ item.department }}</td>
                                    <td>{{ item.email }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" block @click="isViewList = false"
                            >Close</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useSettingStore } from "@/stores/settings";
import { mdiClose, mdiDownload} from "@mdi/js";
import DownloadExcel from "vue-json-excel3";
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

const isViewList = ref(false);
const dialogTitle = ref("");
const listEmployeeReport = ref([]);
const viewEmployee = (data, company, status) => {
    isViewList.value = true;
    dialogTitle.value = company;
    listEmployeeReport.value = data;
    listEmployeeReport.value.statusReview = status;
    
};

const downloading = ref(false);
const donwloadLeads = async () => {
    return listEmployeeReport.value;
}

const json_field = ref({
    EmpID: "ecode",
    EmpName: "display_name",
    Manager: {
        field: "managed_by.display_name",
        callback: (value) => {
        return `${value}`;
        },
    },
    JobTitle: "designation", 
    Company: {
        field: "company.title",
        callback: (value) => {
        return `${value}`;
        },
    },
    Department: "department", 
    Email: "email",
    Status: 'statusReview'
}); 

const startDownload = () => {
    downloading.value = true;
}
const finishDownload = () => {
      downloading.value = false; 
}
// employees
const employees = ref([]);

const companies = ref([]);
const companiesObj = ref([]);
const getEmployees = async () => {
    let endpoint =
        "/api/reports/business-entity/kpi-employees?&filter[is_regular]=" +
        filter.value.data.is_regular +
        "&year=" +
        year.value +
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
            o.open = "-";
            o.inprogress = "-";
            o.inreview = "-";
            o.submitted = "-";
            o.employees = {
                open: [],
                locked: [],
                inprogress: [],
                inreview: [],
                submitted: [],
            };

            employees.value.map((j) => {
                if (j.company_id == o.id) {
                    if (j.reviews.length > 0) {
                        if (
                            j.reviews[0].status &&
                            (j.reviews[0].status == "locked" ||
                                j.reviews[0].status == "closed")
                        ) {
                            o.lock = !isNaN(o.lock) ? o.lock : 0;
                            o.lock = parseInt(o.lock) + 1;
                            o.employees.locked.push(j);
                        } else if (
                            j.reviews[0].status &&
                            j.reviews[0].status == "open"
                        ) {
                            o.open = !isNaN(o.open) ? o.open : 0;
                            o.open = parseInt(o.open) + 1;
                            o.employees.open.push(j);
                        } else if (
                            j.reviews[0].status &&
                            j.reviews[0].status == "inprogress"
                        ) {
                            o.inprogress = !isNaN(o.inprogress)
                                ? o.inprogress
                                : 0;
                            o.inprogress = parseInt(o.inprogress) + 1;
                            o.employees.inprogress.push(j);
                        } else if (
                            j.reviews[0].status &&
                            j.reviews[0].status == "inreview"
                        ) {
                            o.inreview = !isNaN(o.inreview) ? o.inreview : 0;
                            o.inreview = parseInt(o.inreview) + 1;
                            o.employees.inreview.push(j);
                        } else if (
                            j.reviews[0].status &&
                            j.reviews[0].status == "submitted"
                        ) {
                            o.submitted = !isNaN(o.submitted) ? o.submitted : 0;
                            o.submitted = parseInt(o.submitted) + 1;
                            o.employees.submitted.push(j);
                        }
                    } else if (o.state == "no-setting") {
                        o.lock = !isNaN(o.lock) ? o.lock : 0;
                        o.lock = parseInt(o.lock) + 1;
                        o.employees.locked.push(j);
                    } else {
                        if (o.status == "closed" || o.status == "locked") {
                            o.lock = !isNaN(o.lock) ? o.lock : 0;
                            o.lock = parseInt(o.lock) + 1;
                            o.employees.locked.push(j);
                        } else {
                            o.open = !isNaN(o.open) ? o.open : 0;
                            o.open = parseInt(o.open) + 1;
                            o.employees.open.push(j);
                        }
                    }
                }
            });
        });
    }
    companiesObj.value.sort((a, b) => {
        return a.sort - b.sort;
    });

    console.log(companiesObj.value);
};
</script>
<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
