<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Setup" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-card class="rounded-lg">
          <v-card-title class="d-flex align-center pb-6">
            <div class="text-primary text-capitalize text-h5">New Performance Setting</div>
          </v-card-title>
          <v-card-text>
            <PmsForm />
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PmsForm from "@/pages/hr/settings/PmsForm.vue";
</script>
