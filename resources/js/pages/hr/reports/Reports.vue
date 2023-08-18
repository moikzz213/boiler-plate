<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6">Reports</div>
      </div>
      <div class="v-col-12 v-col-md-4">
        <v-autocomplete
          v-model="filter.data.company_id"
          :items="companyStore.active_companies"
          item-title="title"
          item-value="id"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          :label="loadingCompany ? 'Loading...' : 'Select Company'"
          :loading="loadingCompany"
          clearable
          @focus="loadCompnaies"
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{
                item.raw.title && item.raw.title.length > 20
                  ? item.raw.title.substring(0, 20) + "..."
                  : item.raw.title
              }}
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-4">
        <VueDatePicker v-model="filter.data.year" year-picker class="pms-date-picker" />
      </div>
      <div class="v-col-12 v-col-md-3">
        <div class="d-flex justify-space-between">
          <v-btn
            @click="resetFilter"
            height="40px"
            variant="text"
            color="primary"
            class="bg-grey-lighten-2 text-capitalize"
            :loading="filter.loadingReset"
            style="width: 48%"
            >Reset</v-btn
          >
          <v-btn
            @click="runFilter"
            height="40px"
            color="secondary"
            class="text-capitalize"
            :loading="filter.loadingFilter"
            style="width: 48%"
            >filter</v-btn
          >
        </div>
      </div>
    </v-row>
    <v-row>
      <div class="v-col-12">
        <v-card>
          <v-card-text v-if="pmsData != null"> </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import PageHeader from "@/components/pageHeader.vue";
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import { useCompanyStore } from "@/stores/company";
import VueDatePicker from "@vuepic/vue-datepicker";

const authStore = useAuthStore();

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

// filter
const filter = ref({
  loadingReset: false,
  loadingFilter: false,
  data: {
    employee: null,
    company_id: null,
    year: new Date().getFullYear(),
    is_regular: 1,
  },
});
const runFilter = async () => {
  filter.value.loadingFilter = true;
  getData()
    .then(() => {
      filter.value.loadingFilter = false;
    })
    .catch((err) => {
      filter.value.loadingFilter = false;
    });
};
const resetFilter = async () => {
  filter.value.data = {
    employee: null,
    company_id: null,
    is_regular: 1,
  };
  filter.value.loadingReset = true;
  getData()
    .then(() => {
      filter.value.loadingReset = false;
    })
    .catch((err) => {
      filter.value.loadingReset = false;
    });
};
</script>
