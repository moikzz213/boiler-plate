<template>
  <v-container class="pb-16">
    <PageHeader title="KPI" />
    <v-row class="my-5">
      <div class="v-col-12">
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
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="kpis && kpis.length > 0">
              <tr v-for="item in kpis" :key="item.id">
                <td>{{ item.title }}</td>
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
          variant="elevated"
          active-color="primary"
          density="comfortable"
        ></v-pagination>
      </div>
    </v-row>
    <v-dialog v-model="kpiForm.dialog" width="100%" max-width="480px" persistent>
      <v-card class="rounded-lg">
        <v-row class="ma-0 pa-0">
          <div :class="`v-col-12 px-4`">
            <v-row>
              <div class="v-col-12">{{ kpiForm.title }} {{}}</div>
              <div class="v-col-12 py-0">
                <v-text-field
                  v-model="kpiForm.data.title"
                  label="Industry*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </div>
              <div class="v-col-12 d-flex justify-end">
                <v-btn color="primary" variant="text" @click="kpiForm.dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  :loading="kpiForm.loading"
                  class="ml-2 px-8"
                  @click="save"
                  >save</v-btn
                >
              </div>
            </v-row>
          </div>
        </v-row>
      </v-card>
    </v-dialog>
    <ConfirmDialog :options="confOptions" @confirm="confirmResponse" />
    <SnackBar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SnackBar from "@/components/SnackBar.vue";

const router = useRouter();
const route = useRoute();
const sbOptions = ref({});

// kpis
const kpis = ref([]);
const kpiForm = ref({
  title: "",
  data: {},
  loading: false,
  dialog: false,
  action: "add",
});
const totalPageCount = ref(0);
const currentPage = ref(route.params ? route.params.page : 1);
const getData = async (page) => {
  await clientApi
    .get("/api/hr/kpis?page=" + page)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      kpis.value = res.data.data;
    })
    .catch((err) => {
      console.log("kpis", err);
    });
};
const save = async () => {
  let data = {
    id: kpiForm.value.action == "edit" ? kpiForm.value.data.id : null,
    title: kpiForm.value.data.title,
  };
  kpiForm.value.loading = true;
  await clientApi
    .post("/api/hr/kpi/save", data)
    .then((res) => {
      getData(currentPage.value).then(() => {
        kpiForm.value.loading = false;
        kpiForm.value.dialog = false;
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      kpiForm.value.loading = false;
      console.log("kpis", err);
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while saving kpi",
      };
    });
};
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
      title: "Edit " + item.title,
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
        name: "PaginatedKPI",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getData(currentPage.value);
  }
});
onMounted(() => {
  getData(1);
});

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
  await clientApi
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
