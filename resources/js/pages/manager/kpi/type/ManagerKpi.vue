<template>
  <div class="v-col-12">
    <v-card class="mb-3 rounded-lg" :loading="loadingKpiList">
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
            <th class="text-left text-capitalize">Industry</th>
            <th class="text-right text-capitalize">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in kpiList" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.industry && item.industry.title }}</td>
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
                  @click="() => removeKPI(item)"
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
      :total-visible="8"
      variant="elevated"
      active-color="primary"
      density="comfortable"
    ></v-pagination>
    <CustomKpiDialog :kpi-options="kpiOptions" @save="saveCustomKpi" />
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
    <SnackBar :options="sbOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { clientApi } from "@/services/clientApi";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import CustomKpiDialog from "@/components/CustomKpiDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
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
const loadingKpiList = ref(false);
const totalPageCount = ref(0);
const currentPage = ref(1);
currentPage.value = route.params && route.params.page ? route.params.page : 1;
const getCustomKpi = async (page) => {
  loadingKpiList.value = true;
  await clientApi(authStore.authToken)
    .get("/api/manager/custom/kpi/list/" + authStore.authProfile.ecode + "/?page=" + page)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      kpiList.value = res.data.data;
      loadingKpiList.value = false;
    })
    .catch((err) => {
      console.log("getCustomKpi", err.response);
      loadingKpiList.value = false;
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
const saveCustomKpi = async (kpi) => {
  let data = Object.assign({}, kpi);
  if (kpiOptions.value.action == "add") {
    data.profile_ecode = authStore.authProfile.ecode;
  }
  data.type = route.params.type;
  await clientApi(authStore.authToken)
    .post("/api/manager/my-custom-kpi/save", data)
    .then((res) => {
      getCustomKpi(currentPage.value).then(() => {
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
const confOptions = ref({});
const toRemove = ref({});
const removeKPI = (item) => {
  toRemove.value = Object.assign({}, item);
  confOptions.value = {
    dialog: true,
    title: "Confirm Remove",
    text: "Please confirm that you want to remove " + item.title + ".",
    btnColor: "error",
    btnTitle: "Confirm",
  };
};
const confirmRemove = async () => {
  await clientApi(authStore.authToken)
    .post("/api/manager/my-custom-kpi/remove/" + toRemove.value.id)
    .then((res) => {
      getCustomKpi(currentPage.value).then(() => {
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while removing data",
      };
    });
};
const confirmResponse = (v) => {
  confOptions.value = {
    ...confOptions.value,
    ...{
      loading: true,
    },
  };
  confirmRemove()
    .then((res) => {
      confOptions.value = {
        ...confOptions.value,
        ...{
          dialog: false,
          loading: false,
        },
      };
    })
    .catch((err) => {
      confOptions.value = {
        ...confOptions.value,
        ...{
          loading: false,
        },
      };
    });
};
</script>
