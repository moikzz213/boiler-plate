<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-4">
        <v-text-field
          v-model="search.employee"
          variant="outlined"
          density="compact"
          class="bg-white"
          hide-details
          label="Search Employee"
        >
        </v-text-field>
      </div>
      <div class="v-col-12">
        <div class="text-h6 mb-3">My KPI</div>
        <v-card max-width="1200">
          <v-card-text>
            <KpiProgress v-if="authUser && authUser.is_regular == true" />
            <KpiProgressProbation v-else />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
    <KpiContent :selected-employee="authUser.user" />
  </v-container>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";

// dynamic components
const KpiProgress = defineAsyncComponent(() =>
  import("../../../components/kpi/KpiProgress.vue")
);
const KpiProgressProbation = defineAsyncComponent(() =>
  import("../../../components/kpi/KpiProgressProbation.vue")
);

// authenticated user object
const authStore = useAuthStore();
const authUser = computed(() => {
  return authStore.user ? authStore.user : null;
});

// select employee
const search = ref({
  employee: "",
});
const selectedEmployee = ref({});
// search.data.employee
</script>
