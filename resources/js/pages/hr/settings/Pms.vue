<template>
  <v-container class="pb-16">
    <PageHeader title="PMS Settings" />
    <v-row class="my-5">
      <div class="v-col-12 v-col-md-3">
        <v-autocomplete
          v-model="filter.company"
          :items="companyList"
          variant="outlined"
          density="compact"
          class="bg-white"
          label="Select Company"
          hide-details
        >
          <template v-slot:selection="{ props, item }">
            <span v-bind="props">
              {{ item?.raw?.substring(0, 20) + "..." }}
            </span>
          </template>
        </v-autocomplete>
      </div>
      <div class="v-col-12 v-col-md-3">
        <VueDatePicker v-model="filter.year" year-picker class="pms-date-picker" />
      </div>
      <div class="v-col-12 v-col-md-2">
        <v-btn
          block
          @click="filterPms"
          height="40px"
          color="primary"
          class="text-capitalize"
          >Filter</v-btn
        >
      </div>
      <div class="v-col-12">
        <v-card class="mb-3 rounded-lg">
          <v-card-title class="d-flex align-center">
            <v-btn
              size="small"
              icon
              @click="addPms"
              color="white"
              class="text-capitalize mr-3"
            >
              <v-icon :icon="mdiPlus"></v-icon>
            </v-btn>
            <div class="text-primary text-capitalize">PMS Settings</div>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Company</th>
                <th class="text-left text-capitalize">Year</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="pmsList && pmsList.length > 0">
              <tr v-for="item in pmsList" :key="item.id">
                <td>{{ item.company }}</td>
                <td>{{ item.year }}</td>
                <td>
                  <div class="d-flex align-center justify-end">
                    <v-icon
                      size="small"
                      @click="() => openSettings(item.id)"
                      :icon="mdiPencil"
                      class="mx-1"
                    />
                    <v-icon
                      size="small"
                      @click="() => removePms(item)"
                      :icon="mdiTrashCan"
                      class="mx-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card v-if="pmsList && pmsList.length == 0" class="elevation-0">
            <v-card-text class="text-center"> No records found </v-card-text>
          </v-card>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import VueDatePicker from "@vuepic/vue-datepicker";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

// PMS
const pms = ref({
  title: "Add PMS Setting",
  dialog: true,
  data: {
    year: new Date().getFullYear(),
  },
  loading: false,
});
const pmsList = ref([]);
const getPmsSettings = async () => {
  await clientApi(authStore.authToken)
    .get("/api/hr/settings/pms/paginated")
    .then((res) => {
      pmsList.value = res.data.data;
    })
    .catch((err) => {
      console.log("getEmployees", err);
    });
};
onMounted(() => {
  getPmsSettings();
});

const addPms = () => {
  router
    .push({
      name: "NewPms",
    })
    .catch((err) => {});
};
const openSettings = (theID) => {
  router
    .push({
      name: "SinglePms",
      params: {
        id: theID,
      },
    })
    .catch((err) => {});
};
const removePms = () => {
  console.log("open remove kpi in a dialog");
};

// filter
const filter = ref({
  company: "Ghassan Aboud Group FZE",
  year: new Date().getFullYear(),
});
const companyList = ref([
  "Ghassan Aboud Group FZE",
  "Grandiose Supermarket",
  "Grandiose Catering",
  "Gallega",
]);
const filterPms = () => {
  console.log("filter", filter.value);
};
</script>
