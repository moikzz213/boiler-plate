<template>
  <v-container class="pb-16">
    <PageHeader title="KPI Master List" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-btn
          size="x-large"
          :color="`${currentType == 'kpi' ? 'secondary' : ''}`"
          :readonly="`${currentType == 'kpi' ? true : false}`"
          class="px-12 mr-3"
          @click="() => selectType('kpi')"
        >
          KPI
        </v-btn>
        <v-btn
          size="x-large"
          :color="`${currentType == 'ecd' ? 'secondary' : ''}`"
          :readonly="`${currentType == 'ecd' ? true : false}`"
          class="px-12"
          @click="() => selectType('ecd')"
        >
          ECD
        </v-btn>
      </div>
      <KpiMaster v-show="currentType == 'kpi'" />
      <EcdMaster v-show="currentType == 'ecd'" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import KpiMaster from "./type/KpiMaster.vue";
import EcdMaster from "./type/EcdMaster.vue";
// table tab
const router = useRouter();
const currentType = ref("kpi");
const selectType = (type) => {
  if (currentType.value !== type) {
    currentType.value = type;
    router
      .push({
        name: "HrMasterKpi",
        params: {
          type: currentType.value,
        },
      })
      .catch((err) => {});
  }
};
</script>
