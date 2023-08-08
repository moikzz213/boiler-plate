<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12 pb-0">
        <div class="text-h6">My Custom KPI</div>
      </div>
      <div class="v-col-12 pb-0">
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
      <ManagerKpi v-if="currentType == 'kpi'" />
      <ManagerEcd v-if="currentType == 'ecd'" />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ManagerKpi from "./type/ManagerKpi.vue";
import ManagerEcd from "./type/ManagerEcd.vue";
const router = useRouter();
const route = useRoute();

// table tab
const currentType = ref(route.params.type);
const selectType = (type) => {
  
  if (currentType.value !== type) {
     
    currentType.value = type;
    router
      .push({
        name: "ManagerCustomKPI",
        params: {
          type: currentType.value,
        },
      })
      .catch((err) => {});
  }
};
</script>
