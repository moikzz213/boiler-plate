<template>
  <div>
    <div class="w-100 d-flex mb-3">
      <v-btn
        @click="() => selectState('setting')"
        :color="currentState == 'setting' ? 'secondary' : ''"
        class="mr-2"
        size="large"
        >Setting</v-btn
      >
      <v-btn
        @click="() => selectState('midyear')"
        :color="currentState == 'midyear' ? 'secondary' : ''"
        class="mr-2"
        size="large"
        >Mid-year</v-btn
      >
      <v-btn
        @click="() => selectState('yearend')"
        :color="currentState == 'yearend' ? 'secondary' : ''"
        class="mr-2"
        size="large"
        >Year-end</v-btn
      >
    </div>
    <v-card>
      <v-card-text v-if="pmsData != null">
        <BarGraphStacked :data="pmsData" />
      </v-card-text>
    </v-card>
  </div>
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

// current state
const currentState = ref(
  authStore.authProfile && authStore.authProfile.reviews.length > 0
    ? authStore.authProfile.reviews[0].state
    : "setting"
);
const selectState = (state) => {
  currentState.value = state;
};
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
    .get("/api/hr/graph/pms/state/" + currentState.value)
    .then((res) => {
      pmsData.value = res.data.data;
    })
    .catch((err) => {
      console.log("getData error", err.response);
    });
};
getData();
</script>
