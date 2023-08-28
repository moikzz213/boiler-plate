<template>
  <div>
    <v-row>
       
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
          <v-card-text v-if="pmsData != null">
            <BarGraphStacked :data="pmsData" />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import VueDatePicker from "@vuepic/vue-datepicker";
import BarGraphStacked from "@/components/charts/BarGraphStacked.vue";
const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
});
const authStore = useAuthStore();
const pmsData = ref(null);

// current state
const currentState = ref( "setting" );
 
watch(
  () => currentState.value,
  () => {
    getData();
  }
);

// get data
const year = ref(2023);
const getData = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/graph/pms/state/" + currentState.value + "?year="+year.value+"&comp="+authStore.authProfile.hrbp_email)
    .then((res) => {
      pmsData.value = res.data.data;
      console.log("pmsData.value", pmsData.value);
    })
    .catch((err) => {
      console.log("getData error", err.response);
    });
};
getData(); 

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
  year.value = filter.value.data.year;
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
