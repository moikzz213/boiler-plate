<template>
  <div class="v-col-12 pb-0">
    <v-card class="rounded-lg">
      <v-card-text>
        <v-row>
          <div class="v-col-12 pb-0 d-flex justify-space-between">
            <div>
              <div class="text-grey text-caption">Training</div>
              <div class="text-primary text-body-1">
                {{ ecd.title }}
              </div>
            </div>
            <div v-if="authStore.authUser.role == 'manager'">
              <v-btn color="primary" class="rounded-xl px-5" size="small">review</v-btn>
              <v-btn
                @click="() => editKPI(kpi)"
                density="compact"
                size="30"
                color="primary"
                class="rounded-xl elevation-2 ml-1"
                ><v-icon size="small" :icon="mdiPencil"></v-icon
              ></v-btn>
              <v-btn
                @click="() => removeKPI(kpi)"
                density="compact"
                size="30"
                color="primary"
                class="rounded-xl elevation-2 ml-1"
                ><v-icon size="small" :icon="mdiTrashCan"></v-icon
              ></v-btn>
            </div>
          </div>
          <div class="v-col-3">
            <div class="text-grey text-caption">{{ "KPI's Weightage(%)" }}</div>
            <div class="text-primary text-body-1">
              {{ ecd.weightage }}
            </div>
          </div>
          <div class="v-col-3">
            <div class="text-grey text-caption">Type</div>
            <div class="text-primary text-body-1">
              {{ ecd.type }}
            </div>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { mdiPrinter, mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
const authStore = useAuthStore();
const props = defineProps({
  type: {
    type: String,
    default: "kpi",
  },
  item: {
    type: Object,
    default: null,
  },
});
</script>
