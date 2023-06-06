<template>
    <v-card max-width="1200">
        <v-card-text>
            Bar Graph will show here for admin only
        </v-card-text> 
    </v-card>
</template>
  
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    profile: {
        type: Object,
        default: null,
    },
});

 
</script>
  