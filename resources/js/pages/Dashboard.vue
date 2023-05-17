<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6 mb-3">My KPI</div>
        <v-card class="rounded-lg">
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
import { computed, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import KpiContent from "@/components/kpi/KpiContent.vue";

// dynamic components
const KpiProgress = defineAsyncComponent(() =>
  import("../components/kpi/KpiProgress.vue")
);
const KpiProgressProbation = defineAsyncComponent(() =>
  import("../components/kpi/KpiProgressProbation.vue")
);

// authenticated user object
const authStore = useAuthStore();
const authUser = computed(() => {
  return authStore.user ? authStore.user : null;
});
</script>
