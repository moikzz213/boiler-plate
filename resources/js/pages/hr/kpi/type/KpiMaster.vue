<template>
  <div class="v-col-12">
    <ImportData :options="importOptions" @imported="importResponse" class="mb-3" />
    <v-card class="rounded-lg">
      <v-card-title class="d-flex align-center">
        <v-btn
          @click="add"
          density="compact"
          size="35"
          class="rounded-xl elevation-2 mr-2"
          ><v-icon size="small" :icon="mdiPlus"></v-icon
        ></v-btn>
        <div class="text-primary text-capitalize">KPI Master List</div>
      </v-card-title>
      <v-table>
        <thead>
          <tr>
            <th class="text-left text-capitalize">Title</th>
            <th class="text-left text-capitalize">Industry</th>
            <th class="text-right text-capitalize">Actions</th>
          </tr>
        </thead>
        <tbody v-if="kpis && kpis.length > 0">
          <tr v-for="item in kpis" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.industry && item.industry.title }}</td>
            <td>
              <div class="d-flex align-center justify-end">
                <v-icon
                  size="small"
                  @click="() => edit(item)"
                  :icon="mdiPencil"
                  class="mx-1"
                />
                <v-icon
                  size="small"
                  @click="() => remove(item)"
                  :icon="mdiTrashCan"
                  class="mx-1"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-card v-if="kpis && kpis.length == 0">
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
    <CustomKpiDialog :kpi-options="kpiForm" :is-hr="true" @save="saveKpiMaster" />
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
    <SnackBar :options="sbOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SnackBar from "@/components/SnackBar.vue";
import CustomKpiDialog from "@/components/CustomKpiDialog.vue";
import ImportData from "@/components/import/ImportData.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const sbOptions = ref({});

// import
const importOptions = ref({
  btnTitle: "Import KPI",
  cardTitle: "Import KPI",
  endpoint: "/api/import/kpi",
  templateFile: "import-template-kpi.csv",
  conditionArray: ["industry"],
});
const importResponse = (v) => {
  if (v.status == true) {
    getData(1).then(() => {
      sbOptions.value = {
        status: true,
        type: "success",
        text: v.message,
      };
      importOptions.value = {
        ...importOptions.value,
        ...{
          loading: false,
          dialog: false,
        },
      };
    });
  } else {
    sbOptions.value = {
      status: true,
      type: "error",
      text: v.message,
    };
  }
};

// kpis
const kpis = ref([]);
const kpiForm = ref({
  title: "",
  data: {},
  loading: false,
  dialog: false,
  type: "kpi",
  action: "view",
});
const totalPageCount = ref(0);
const currentPage = ref(1);
currentPage.value = route.params && route.params.page ? route.params.page : 1;
const getData = async (page) => {
  await clientApi(authStore.authToken)
    .get("/api/hr/kpi/type/kpi?page=" + page)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      kpis.value = res.data.data;
    })
    .catch((err) => {
      console.log("kpis", err);
    });
};
getData(currentPage.value);
const add = () => {
  kpiForm.value = {
    ...kpiForm.value,
    ...{
      title: "Add KPI",
      data: {},
      dialog: true,
      action: "add",
    },
  };
};
const edit = (item) => {
  kpiForm.value = {
    ...kpiForm.value,
    ...{
      title: item.title,
      data: Object.assign({}, item),
      dialog: true,
      action: "edit",
    },
  };
};
watch(currentPage, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router
      .push({
        name: "PaginatedHrMasterKpi",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getData(currentPage.value);
  }
});

// save kpi
const saveKpiMaster = async () => {
  kpiForm.value.data.type = route.params.type;
  await clientApi(authStore.authToken)
    .post("/api/hr/master-kpi/save", kpiForm.value.data)
    .then((res) => {
      getData(currentPage.value).then(() => {
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
        kpiForm.value = {
          ...kpiForm.value,
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
        text: "Error while trying to save KPI",
      };
      kpiForm.value = {
        ...kpiForm.value,
        ...{
          dialog: false,
          loading: false,
        },
      };
    });
};

// remove industry
const confOptions = ref({});
const toRemove = ref({});
const remove = (item) => {
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
    .post("/api/hr/kpi/remove/" + toRemove.value.id)
    .then((res) => {
      getData(currentPage.value).then(() => {
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
