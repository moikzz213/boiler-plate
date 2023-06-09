<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Settings" />
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-3">
        <v-autocomplete
          v-model="filter.company_id"
          :items="companyStore.companies"
          item-title="title"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          :label="loadingCompany ? 'Loading...' : 'Select Company'"
          :loading="loadingCompany"
          @focus="selectCompany"
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{
                item.raw.title && item.raw.title.length > 30
                  ? item.raw.title.substring(0, 30) + "..."
                  : item.raw.title
              }}
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-3">
        <VueDatePicker v-model="filter.year" year-picker class="pms-date-picker" />
      </div>
      <div class="v-col-12 v-col-md-2">
        <v-btn
          block
          @click="filterPms"
          height="40px"
          color="primary"
          class="text-capitalize"
          >Filter</v-btn
        >
      </div>
      <div class="v-col-12">
        <v-card class="mb-3 rounded-lg" :loading="loadingPms">
          <v-card-title class="d-flex align-center py-3">
            <v-btn @click="addPms" size="35" class="rounded-xl elevation-2 mr-2">
              <v-icon size="small" :icon="mdiPlus"></v-icon>
            </v-btn>
            <div class="text-primary text-capitalize">PMS Settings</div>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Company</th>
                <th class="text-left text-capitalize">Year</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="pmsList && pmsList.length > 0">
              <tr v-for="item in pmsList" :key="item.id">
                <td>{{ item.company.title }}</td>
                <td>{{ item.year }}</td>
                <td>
                  <div class="d-flex align-center justify-end">
                    <v-icon
                      size="small"
                      @click="() => openSettings(item.id)"
                      :icon="mdiPencil"
                      class="mx-1"
                    />
                    <v-icon
                      size="small"
                      @click="() => removePms(item)"
                      :icon="mdiTrashCan"
                      class="mx-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card v-if="pmsList && pmsList.length == 0" class="elevation-0">
            <v-card-text class="text-center"> No records found </v-card-text>
          </v-card>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import VueDatePicker from "@vuepic/vue-datepicker";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/company";

const authStore = useAuthStore();
const router = useRouter();

// PMS List
const loadingPms = ref(false);
const pmsList = ref([]);
const getPmsSettings = async () => {
  loadingPms.value = true;
  await clientApi(authStore.authToken)
    .get("/api/hr/settings/pms/paginated")
    .then((res) => {
      pmsList.value = res.data.data;
      loadingPms.value = false;
    })
    .catch((err) => {
      loadingPms.value = false;
      console.log("getEmployees", err);
    });
};
getPmsSettings();

const addPms = () => {
  router
    .push({
      name: "NewPms",
    })
    .catch((err) => {});
};
const openSettings = (theID) => {
  router
    .push({
      name: "SinglePms",
      params: {
        id: theID,
      },
    })
    .catch((err) => {});
};
const removePms = () => {
  console.log("open remove kpi in a dialog");
};

// companies
const companyStore = useCompanyStore();
const loadingCompany = ref(false);
const selectCompany = () => {
  if (companyStore.companies.length == 0) {
    loadingCompany.value = true;
    companyStore.getCompanies(authStore.authToken).then(() => {
      loadingCompany.value = false;
    });
  }
};

// filter
const filter = ref({
  company_id: null,
  year: new Date().getFullYear(),
});
const filterPms = () => {
  console.log("filter", filter.value);
};
</script>
