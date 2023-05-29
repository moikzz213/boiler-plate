<template>
    <v-container class="pb-16">
      <v-row class="my-5">
        <div class="v-col-12">
          <div class="text-h6 mb-3 text-center">PERFORMANCE REVIEW {{ year }}</div>
          <v-card max-width="1200">
            <v-card-text>
              <!-- authStore.authProfile -->
            </v-card-text>
          </v-card>
        </div>
      </v-row>
    
      <!-- selectedProfileKpi -->
    </v-container>
  </template>
  
  <script setup>
  import {  ref } from "vue"; 
  import { useAuthStore } from "@/stores/auth";
  import { clientApi } from "@/services/clientApi";

  const year = ref(new Date().getFullYear());
  // authenticated user object
  const authStore = useAuthStore();
  const selectedProfileKpi = ref(authStore.authProfile); 
 
  </script>
<style>
.v-navigation-drawer, header, .v-toolbar__content { display: none !important;}
main, .v-main, .v-container, .v-container .v-row.my-5{ padding-top: 0px; padding-left:0px; padding-right:0; padding-bottom: 0; }
.v-container .v-row.my-5{ margin: 0 !important;}
.v-theme--mel{max-width: 100% !important;}
</style>