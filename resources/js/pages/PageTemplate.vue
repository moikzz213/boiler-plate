<template>
  <v-container class="pb-16">
    <PageHeader title="Page Template" />
    <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6 mb-3">Page Template</div>
      </div>
      <div class="v-col-12">This is the content area.</div>
    </v-row>
  </v-container>
</template>

<script setup>
import PageHeader from "@/components/pageHeader.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
</script>
