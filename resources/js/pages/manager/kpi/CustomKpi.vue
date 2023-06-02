<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6">My Custom KPI</div>
      </div>
      <div class="v-col-12">
        <v-card class="mb-3 rounded-lg">
          <v-card-title class="d-flex align-center">
            <v-btn
              size="small"
              icon
              @click="addKPI"
              color="white"
              :loading="kpiForm.loading"
              class="text-capitalize mr-3"
            >
              <v-icon :icon="mdiPlus"></v-icon>
            </v-btn>
            <div class="text-primary text-capitalize">KPI List</div>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Title</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in kpiList" :key="item.id">
                <td>{{ item.title }}</td>
                <td>
                  <div class="d-flex align-center justify-end">
                    <v-icon
                      size="small"
                      @click="() => openKPI(item)"
                      :icon="mdiPencil"
                      class="mx-1"
                    />
                    <v-icon
                      size="small"
                      @click="() => removeKPI(item.id)"
                      :icon="mdiTrashCan"
                      class="mx-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card v-if="kpiList && kpiList.length == 0">
            <v-card-text class="text-center"> No records found </v-card-text>
          </v-card>
        </v-card>
        <v-pagination
          v-if="totalPageCount > 1"
          v-model="currentPage"
          class="my-4"
          :length="totalPageCount"
          variant="elevated"
          active-color="primary"
          density="comfortable"
        ></v-pagination>
      </div>
    </v-row>
    <CustomKpiDialog :kpi-options="kpiOptions" @save="saveCustomKpiRes" />
    <SnackBar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import CustomKpiDialog from "@/components/CustomKpiDialog.vue";
import SnackBar from "@/components/SnackBar.vue";

const authStore = useAuthStore();
const sbOptions = ref({});
const router = useRouter();
const route = useRoute();

// kpi
const kpiOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const kpiForm = ref({
  data: {},
  loading: false,
  dialog: false,
});
const kpiList = ref([]);
const totalPageCount = ref(0);
const currentPage = ref(route.params ? route.params.page : 1);
const getCustomKpi = async (page) => {
    console.log("getCustomKpi", page);
  await clientApi(authStore.authToken)
    .get(
      "/api/manager/my-custom-kpi/list/" + authStore.authProfile.ecode + "/?page=" + page
    )
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      kpiList.value = res.data.data;
    })
    .catch((err) => {
      console.log("getCustomKpi", err.response);
    });
};
getCustomKpi(currentPage.value);
const addKPI = () => {
  kpiOptions.value = {
    ...kpiOptions.value,
    ...{
      title: "Add New KPI ",
      data: {},
      dialog: true,
      loading: false,
      type: "kpi",
      action: "add",
      is_review: false,
    },
  };
};
const openKPI = (item) => {
  kpiOptions.value = {
    ...kpiOptions.value,
    ...{
      title: "Edit KPI ",
      data: Object.assign({}, item),
      loading: false,
      dialog: true,
      type: "kpi",
      action: "edit",
      is_review: false,
    },
  };
};
const saveCustomKpiRes = (emitResponse) => {
  if (emitResponse.action == "create") {
  }
  saveCustomKpi(emitResponse.data);
};

const saveCustomKpi = async (kpi) => {
  let data = Object.assign({}, kpi);
  data.profile_ecode = authStore.authProfile.ecode;
  await clientApi(authStore.authToken)
    .post("/api/manager/my-custom-kpi/save", data)
    .then((res) => {
      getCustomKpi().then(() => {
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
        kpiOptions.value = {
          ...kpiOptions.value,
          ...{
            dialog: false,
            loading: false,
          },
        };
      });
    })
    .catch((err) => {
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while saving Custom KPI",
      };
      kpiOptions.value = {
        ...kpiOptions.value,
        ...{
          loading: false,
        },
      };
      console.log("getCustomKpi", err.response);
    });
};
watch(currentPage, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router
      .push({
        name: "PaginatedManagerCustomKPI",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getCustomKpi(currentPage.value);
  }
});

// remove custom KPI
const removeKPI = () => {
  console.log("open remove kpi in a dialog");
};
</script>
