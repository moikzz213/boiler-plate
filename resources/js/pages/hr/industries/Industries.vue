<template>
  <v-container class="pb-16">
    <PageHeader title="Industries" />
    <v-row class="my-5">
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
            <div class="text-primary text-capitalize">Industries</div>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Title</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody v-if="industries && industries.length > 0">
              <tr v-for="item in industries" :key="item.id">
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
          <v-card v-if="industries && industries.length == 0">
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
    <v-dialog v-model="industryForm.dialog" width="100%" max-width="480px" persistent>
      <v-card class="rounded-lg">
        <v-row class="ma-0 pa-0">
          <div :class="`v-col-12 px-4`">
            <v-row>
              <div class="v-col-12">{{ industryForm.title }} {{}}</div>
              <div class="v-col-12 py-0">
                <v-text-field
                  v-model="industryForm.data.title"
                  label="Industry*"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </div>
              <div class="v-col-12 d-flex justify-end">
                <v-btn @click="industryForm.dialog = false" color="primary" variant="text"
                  >Cancel</v-btn
                >
                <v-btn
                  color="primary"
                  :loading="industryForm.loading"
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
import ImportData from "@/components/import/ImportData.vue";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const sbOptions = ref({});

// import
const importOptions = ref({
  cardTitle: "Import Industries",
  endpoint: "/api/import/industries",
  templateFile: "import-template-industries.csv",
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

// Industries
const industries = ref([]);
const industryForm = ref({
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
    .get("/api/hr/industries?page=" + page)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      industries.value = res.data.data;
    })
    .catch((err) => {
      console.log("industries", err);
    });
};
const save = async () => {
  let data = {
    profile_id: authStore.authProfile.id,
    id: industryForm.value.action == "edit" ? industryForm.value.data.id : null,
    title: industryForm.value.data.title,
  };
  industryForm.value.loading = true;
  await clientApi(authStore.authToken)
    .post("/api/hr/industry/save", data)
    .then((res) => {
      getData(currentPage.value).then(() => {
        industryForm.value.loading = false;
        industryForm.value.dialog = false;
        sbOptions.value = {
          status: true,
          type: "success",
          text: res.data.message,
        };
      });
    })
    .catch((err) => {
      industryForm.value.loading = false;
      console.log("industries", err);
      if (err.response.data.message.includes("Duplicate entry") == true) {
        sbOptions.value = {
          status: true,
          type: "error",
          text: data.title + " already exist",
        };
      } else {
        sbOptions.value = {
          status: true,
          type: "error",
          text: "Error while saving industry",
        };
      }
    });
};
const add = () => {
  industryForm.value = {
    ...industryForm.value,
    ...{
      title: "Add Industry",
      data: {},
      dialog: true,
      action: "add",
    },
  };
};
const edit = (item) => {
  industryForm.value = {
    ...industryForm.value,
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
        name: "PaginatedIndustries",
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
    .post("/api/hr/industry/remove/" + toRemove.value.id)
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
