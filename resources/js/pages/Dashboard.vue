<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div
        v-if="
          selectedProfileKpi &&
          (selectedProfileKpi.role == 'hr_admin' ||
            selectedProfileKpi.role == 'app_admin')
        "
        class="v-col-12"
      >
        <Graph />
      </div>
      <div class="v-col-12">
        <div class="text-h6 mb-3">My KPI</div>
        <v-card max-width="1200">
          <v-card-text>
            <KpiProgress :selected-employee="authStore.authProfile" />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent
      :selected-employee="selectedProfileKpi"
      @yearchange="selectedYearResponse"
      :submit-button="false"
    />
  </v-container>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";
import { clientApi } from "@/services/clientApi";
// dynamic components
const KpiProgress = defineAsyncComponent(() =>
  import("../components/kpi/KpiProgress.vue")
);
const Graph = defineAsyncComponent(() => import("../components/Graph.vue"));

// authenticated user object
const authStore = useAuthStore();
const selectedProfileKpi = ref(authStore.authProfile);
console.log(selectedProfileKpi.value);
const selectedYearResponse = (v) => {
  getKPI(v);
};
const getKPI = async (year) => {
  await clientApi(authStore.authToken)
    .get("/api/dashboard/my-kpi/" + selectedProfileKpi.value.id + "/" + year)
    .then((res) => {
      if (res.data.result == null) {
        selectedProfileKpi.value = {
          ...selectedProfileKpi.value,
          ...{
            reviews: [],
          },
        };
      } else {
        selectedProfileKpi.value = {
          ...selectedProfileKpi.value,
          ...{
            reviews: [res.data.result],
          },
        };
      }
    })
    .catch((err) => {});
};
</script>
