<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Settings" />
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-4">
        <v-autocomplete
          v-model="filter.company_id"
          :items="companyStore.active_companies"
          item-title="title"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          clearable
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
          :loading="filter.loading"
          @click="runFilter"
          height="40px"
          color="secondary"
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
                    <!-- <v-icon
                      size="small"
                      @click="() => removePms(item)"
                      :icon="mdiTrashCan"
                      class="mx-1"
                    /> -->
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card v-if="pmsList && pmsList.length == 0" class="elevation-0">
            <v-card-text class="text-center"> No records found </v-card-text>
          </v-card>
        </v-card>
        <v-pagination
          v-if="totalPageCount > 1"
          v-model="currentPage"
          class="my-4"
          :length="totalPageCount"
          :total-visible="8"
          variant="elevated"
          active-color="primary"
          density="comfortable"
        ></v-pagination>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import { useCompanyStore } from "@/stores/company";
import VueDatePicker from "@vuepic/vue-datepicker";
import PageHeader from "@/components/PageHeader.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// filter
const filter = ref({
  loading: false,
  company_id: null,
  year: new Date().getFullYear(),
});

// PMS List
const loadingPms = ref(false);
const pmsList = ref([]);
const totalPageCount = ref(0);
const totalResult = ref(0);
const currentPage = ref(route.params && route.params.page ? route.params.page : 1);
const getPmsSettings = async (page) => {
  loadingPms.value = true;
  let endpoint =
    "/api/hr/pms-settings/pms?filter[company]=" +
    filter.value.company_id +
    "&filter[year]=" +
    filter.value.year;
  endpoint += "&page=" + page;
  await clientApi(authStore.authToken)
    .get(endpoint)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      totalResult.value = res.data.total;
      pmsList.value = res.data.data;
      loadingPms.value = false;
    })
    .catch((err) => {
      loadingPms.value = false;
      console.log("getEmployees", err);
    });
};
watch(currentPage, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router
      .push({
        name: "PaginatedPms",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getPmsSettings(currentPage.value);
  }
});
getPmsSettings(currentPage.value);

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
// const removePms = () => {
//   console.log("open remove kpi in a dialog");
// };
const runFilter = () => {
  filter.value.loading = true;
  getPmsSettings(1)
    .then(() => {
      filter.value.loading = false;
    })
    .catch((err) => {
      filter.value.loading = false;
    });
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
</script>
