<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Setup" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-card :loading="loadingSetting" class="rounded-lg">
          <v-card-title class="text-primary mb-3">
            Updated Performance Setting - <span class="text-secondary">{{ stateFn(singleSetting.state)}} ( {{ singleSetting?.status?.toUpperCase() }} )</span></v-card-title
          > 
          <v-card-text>
            <PmsForm :pms="singleSetting" />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { clientApi } from "@/services/clientApi";
import PageHeader from "@/components/PageHeader.vue";
import PmsForm from "@/pages/hr/settings/PmsForm.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const authStore = useAuthStore();

// PMS
const singleSetting = ref({});
const loadingSetting = ref(false);
const getSingleSetting = async () => {
  loadingSetting.value = true;
  await clientApi(authStore.authToken)
    .get("/api/hr/pms-setting/" + route.params.id)
    .then((res) => {
      singleSetting.value = Object.assign({}, res.data);
      loadingSetting.value = false;
    })
    .catch((err) => {
      loadingSetting.value = false;
    });
};
const stateFn = (v) => {
  if(v == 'midyear'){
    return 'MID-YEAR';
  }else if(v == 'yearend'){
    return 'YEAR-END';
  }else{
    return v;
  }
}
getSingleSetting();
</script>
