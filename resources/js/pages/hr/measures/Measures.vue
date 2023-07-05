<template>
  <v-container class="pb-16">
    <PageHeader title="Measures" />
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
            <div class="text-primary text-capitalize">Measures</div>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Title</th>
                <th class="text-center text-capitalize">Status</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="measures && measures.length > 0">
              <tr v-for="item in measures" :key="item.id">
                <td>{{ item.title }}</td>
                <td class="text-center">
                  <v-btn
                    size="small"
                    @click="() => remove(item)"
                    :color="item.status == 'active' ? 'success' : 'error'"
                    class="mx-1 rounded-xl"
                  >
                    {{ item.status }}
                  </v-btn>
                </td>
                <td>
                  <div class="d-flex align-center justify-end">
                    <v-icon
                      size="small"
                      @click="() => edit(item)"
                      :icon="mdiPencil"
                      class="mx-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-card v-if="measures && measures.length == 0">
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
      </div>
    </v-row>
    <v-dialog v-model="measureForm.dialog" width="100%" max-width="480px" persistent>
      <v-card class="rounded-lg">
        <v-row class="ma-0 pa-0">
          <div :class="`v-col-12 px-4`">
            <v-row>
              <div class="v-col-12">{{ measureForm.title }} {{}}</div>
              <div class="v-col-12 py-0">
                <v-text-field
                  v-model="measureForm.data.title"
                  label="Measure*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </div>
              <div class="v-col-12 d-flex justify-end">
                <v-btn color="primary" variant="text" @click="measureForm.dialog = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  :loading="measureForm.loading"
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
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import PageHeader from "@/components/PageHeader.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import SnackBar from "@/components/SnackBar.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const sbOptions = ref({});

// measures
const measures = ref([]);
const measureForm = ref({
  title: "",
  data: {},
  loading: false,
  dialog: false,
  action: "add",
});
const totalPageCount = ref(0);
const currentPage = ref(route.params && route.params.page ? route.params.page : 1);
const getData = async (page) => {
  await clientApi(authStore.authToken)
    .get("/api/hr/measures?page=" + page)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      measures.value = res.data.data;
    })
    .catch((err) => {
      console.log("measures", err);
    });
};
const save = async () => {
  let data = {
    profile_id: authStore.authProfile.id,
    id: measureForm.value.action == "edit" ? measureForm.value.data.id : null,
    title: measureForm.value.data.title,
  };
  measureForm.value.loading = true;
  await clientApi(authStore.authToken)
    .post("/api/hr/measure/save", data)
    .then((res) => {
      getData(currentPage.value).then(() => {
        measureForm.value.loading = false;
        measureForm.value.dialog = false;
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      measureForm.value.loading = false;
      console.log("measures", err);
      sbOptions.value = {
        status: true,
        type: "error",
        text: "Error while saving measure",
      };
    });
};
const add = () => {
  measureForm.value = {
    ...measureForm.value,
    ...{
      title: "Add Measure",
      data: {},
      dialog: true,
      action: "add",
    },
  };
};
const edit = (item) => {
  measureForm.value = {
    ...measureForm.value,
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
        name: "PaginatedMeasures",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getData(currentPage.value);
  }
});
onMounted(() => {
  getData(currentPage.value);
});

// remove measure
const confOptions = ref({});
const toRemove = ref({});
const remove = (item) => {
  toRemove.value = Object.assign({}, item);
  toRemove.value.new_status = toRemove.value.status == "active" ? "inactive" : "active";
  confOptions.value = {
    dialog: true,
    title: "Confirm",
    text:
      "Please confirm that you want to update the status of " +
      item.title +
      " to " +
      toRemove.value.new_status +
      ".",
    btnColor: toRemove.value.new_status == "active" ? "success" : "error",
    btnTitle: toRemove.value.new_status,
  };
};
const confirmRemove = async () => {
  let data = {
    status: toRemove.value.new_status,
    profile_id: authStore.authProfile.id,
  };
  await clientApi(authStore.authToken)
    .post("/api/hr/measure/update-status/" + toRemove.value.id, data)
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
