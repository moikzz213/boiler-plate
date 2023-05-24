<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Setup" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-card class="rounded-lg">
          <v-card-title class="d-flex align-center pb-6">
            <div class="text-primary text-capitalize text-h5">
              Updated Performance Setting
            </div>
          </v-card-title>
          <v-card-text>
            <PmsForm :pmsSetting="singleSetting" />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import PmsForm from "@/pages/hr/settings/PmsForm.vue";

// PMS
const singleSetting = ref({});
const getSingleSetting = async () => {
  //   await clientApi
  //     .get("/hr/employees/paginated")
  //     .then((res) => {
  //       pmsList.value = res.data.data;
  //     })
  //     .catch((err) => {
  //       console.log("getEmployees", err);
  //     });
};
getSingleSetting();
</script>
