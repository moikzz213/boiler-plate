<template>
  <v-row class="">
    <div class="v-col-12 v-col-md-4">
      <div class="text-body-1 mb-3 text-center text-primary">{{ "KPI & Annual Target Setting" }}</div>
      <div class="d-flex justify-center">
        <v-chip size="small" class="mx-1 bg-grey-darken-1 text-white">Open</v-chip>
        <v-chip size="small" class="mx-1 bg-grey-darken-1 text-white">In Progress</v-chip>
        <v-chip size="small" class="mx-1 bg-secondary">In Review</v-chip>
        <v-chip size="small" class="mx-1">Submitted</v-chip>
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div class="text-body-1 mb-3 text-center text-primary">
        {{ "First Probation Review" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip size="small" class="mx-1">Open</v-chip>
        <v-chip size="small" class="mx-1">In Progress</v-chip>
        <v-chip size="small" class="mx-1">In Review</v-chip>
        <v-chip size="small" class="mx-1">Submitted</v-chip>
      </div>
    </div>
    <div class="v-col-12 v-col-md-4">
      <div class="text-body-1 mb-3 text-center text-primary">
        {{ "Final Probation Review" }}
      </div>
      <div class="d-flex justify-center">
        <v-chip size="small" class="mx-1">Open</v-chip>
        <v-chip size="small" class="mx-1">In Progress</v-chip>
        <v-chip size="small" class="mx-1">In Review</v-chip>
        <v-chip size="small" class="mx-1">Submitted</v-chip>
      </div>
    </div>
  </v-row>
</template>
