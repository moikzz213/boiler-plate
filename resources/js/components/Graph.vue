<template>
  <v-card>
    <v-card-text v-if="pmsData != null">
      <BarGraphStacked :data="pmsData" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import BarGraphStacked from "@/components/charts/BarGraphStacked.vue";
const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
});
const authStore = useAuthStore();
const pmsData = ref(null);
const year = ref(2023);
const state = ref("setting");
const getData = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/graph/pms")
    .then((res) => {
      pmsData.value = res.data.data;
    })
    .catch((err) => {
      console.log("getData error", err.response);
    });
};
getData();
</script>
