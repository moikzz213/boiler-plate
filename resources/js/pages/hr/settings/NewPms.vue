<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Setup" />
    <v-row class="my-5">
      <div class="v-col-12">
        <v-card class="rounded-lg">
          <v-card-title class="text-primary mb-3"> New Performance Setting </v-card-title>
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
