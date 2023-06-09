<template>
  <div>
    <v-dialog v-model="importData.dialog" width="600" persistent>
      <template v-slot:activator="{ props }">
        <v-btn :color="importData.btnColor" v-bind="props">
          {{ importData.btnTitle }}
          <v-icon :icon="mdiTrayArrowUp" class="ml-3"></v-icon>
        </v-btn>
      </template>
      <v-card class="rounded-lg" :loading="importData.loading">
        <v-card-title>{{ importData.cardTitle }}</v-card-title>
        <v-card-text>
          <v-file-input
            v-model="inputFile"
            :rules="rules"
            accept="text/csv"
            variant="outlined"
            density="compact"
            :prepend-icon="mdiPaperclip"
            label="Upload .csv file"
          ></v-file-input>
          <div class="text-body-2 text-primary">
            Note: This import function will ignore the data that already exist.
          </div>
        </v-card-text>
        <div class="pa-3 d-flex justify-end">
          <v-btn
            class="bg-grey-lighten-3 mr-3"
            variant="text"
            color="primary"
            @click="importData.dialog = false"
            >Close</v-btn
          >
          <v-btn color="primary" :loading="importData.loading" @click="importCSV"
            >Import</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { mdiPaperclip, mdiTrayArrowUp } from "@mdi/js";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import * as papa from "papaparse";

const authStore = useAuthStore();
const emit = defineEmits("imported");
const props = defineProps({
  options: {
    type: Object,
    default: null,
  },
});
const importData = ref({
  dialog: false,
  btnTitle: "Import",
  btnColor: "primary",
  loading: false,
  cardTitle: "Import",
  endpoint: "",
});
importData.value = { ...importData.value, ...props.options };

const inputFile = ref(null);
const rules = ref([
  (value) => {
    return (
      !value ||
      !value.length ||
      value[0].size < 2000000 ||
      "File size should be less than 2 MB."
    );
  },
]);
const importCSV = () => {
  importData.value.loading = true;
  papa.parse(inputFile.value[0], {
    header: true,
    transformHeader: function (text) {
      return text.replace(/\s+/g, "_").toLowerCase().trim();
    },
    complete: parseComplete,
  });
};
const parseComplete = async (results, file) => {
  // Remove 1st row header
  // delete results.data[0];

  // Filter Empty Rows
  let resultsArray = results.data.filter(function (el) {
    let firstKey = Object.keys(el)[0].toString(); // get the first property and check
    return el != null && el[firstKey] != "";
  });

  // set data
  let data = {
    import_data: JSON.stringify(resultsArray),
  };

  console.log("importData.value", importData.value);
  // save result to database
  await clientApi(authStore.authToken)
    .post(importData.value.endpoint, data)
    .then((res) => {
      emit("imported", {
        status: true,
        message: res.data.message,
      });
    })
    .catch((err) => {
      console.log("import error", err);
      importData.value.loading = false;
      emit("imported", {
        status: false,
        message: "Error while importing data",
      });
    });
};

watch(
  () => props.options,
  (newVal) => {
    importData.value = { ...importData.value, ...newVal };
    console.log("importData.value", importData.value);
  }
);
</script>
