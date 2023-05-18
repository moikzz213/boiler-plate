<template>
  <v-row class="">
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      >
        {{ "KPI & Annual Target Setting" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          class="bg-grey-darken-1 text-white"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          class="bg-grey-darken-1 text-white"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          class="bg-secondary"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Submitted</v-chip
        >
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      >
        {{ "Mid Year Review & Revised Target Setting" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Submitted</v-chip
        >
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div
        :class="`${
          props.density == 'compact' ? 'text-caption' : 'text-body-1'
        } mb-1 text-center d-flex align-center justify-center`"
        style="line-height: 1.2em; height: 30px"
      >
        {{ "Year End Review and Submission" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Open</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Progress</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >In Review</v-chip
        >
        <v-chip
          style="margin: 0 1px"
          :size="`${props.density == 'compact' ? 'x-small' : 'small'}`"
          >Submitted</v-chip
        >
      </div>
    </div>
  </v-row>
</template>
<script setup>
const props = defineProps({
  density: {
    type: String,
    default: "",
  },
});
</script>
