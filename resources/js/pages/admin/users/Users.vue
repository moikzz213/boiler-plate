<template>
  <v-container>
    <PageHeader title="Users" />
    <v-row class="mb-3">
      <div class="v-col-12">
        <v-card :loading="users.loading">
          <v-card-title class="pt-3">
            <v-row class="pa-0">
              <div class="v-col-12 v-col-md-6 text-primary text-capitalize">
                Users {{ "(" + totalResult + ")" }}
              </div>
              <div class="v-col-12 v-col-md-6">
                <v-text-field
                  v-model="keywords"
                  label="Search"
                  variant="outlined"
                  density="compact"
                  hide-details
                  :append-inner-icon="keywords !== '' ? mdiClose : null"
                  @click:append-inner="resetSearchResult"
                >
                </v-text-field>
              </div>
            </v-row>
          </v-card-title>
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-capitalize">Username</th>
                <th class="text-left text-capitalize">Email</th>
                <th class="text-left text-capitalize">Role</th>
                <th class="text-left text-capitalize">Status</th>
                <th class="text-right text-capitalize">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in users.data" :key="item.id">
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role == 'app_admin' ? 'Super admin' : (item.role == 'hr_admin' ? 'HR Admin' : item.role) }}</td>
                <td>
                  <v-chip
                    class="text-uppercase"
                    size="small"
                    :color="`${
                      item.status.toLowerCase() == 'active' ? 'success' : 'error'
                    }`"
                    >{{ item.status }}</v-chip
                  >
                </td>
                <td>
                  <div class="d-flex align-center justify-end">
                    <v-icon
                      size="small"
                      @click="() => editUser(item.ecode)"
                      :icon="mdiPencil"
                      class="mx-1"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-sheet v-if="users.data.length == 0" class="pa-3 text-center w-100"
            >No records found</v-sheet
          >
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
  </v-container>
</template>

<script setup>
import { ref, watch } from "vue";
import { mdiPencil, mdiClose } from "@mdi/js";
import { useRouter, useRoute } from "vue-router";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import PageHeader from "@/components/pageHeader.vue";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// users
const users = ref({
  loading: false,
  data: [],
});
const totalPageCount = ref(0);
const totalResult = ref(0);
const currentPage = ref(route.params && route.params.page ? route.params.page : 1);
const getAllUsers = async (keywords, page) => {
  let endpoint = "/api/admin/user/all?&filter[employee]=" + keywords;
  endpoint += "&page=" + page;
  users.value.loading = true;
  await clientApi(authStore.authToken)
    .get(endpoint)
    .then((res) => {
      totalPageCount.value = res.data.last_page;
      currentPage.value = res.data.current_page;
      totalResult.value = res.data.total;
      users.value.data = res.data.data;
      users.value.loading = false;
    })
    .catch((err) => {
      users.value.loading = false;
      console.log(err);
    });
};
watch(currentPage, (newValue, oldValue) => {
  if (newValue != oldValue) {
    router
      .push({
        name: "PaginatedUsers",
        params: {
          page: currentPage.value,
        },
      })
      .catch((err) => {});
    getAllUsers(keywords.value, currentPage.value);
  }
});
getAllUsers(null, currentPage.value);

// search
const keywords = ref("");
watch(keywords, (newValue, oldValue) => {
  if (newValue != oldValue && newValue.length > 3) {
    getAllUsers(keywords.value, 1);
  }
});

// reset
const resetSearchResult = () => {
  getAllUsers(null, 1).then(() => {
    keywords.value = "";
  });
};

// edit user
const editUser = (item) => {
  router
    .push({
      name: "EditUser",
      params: {
        ecode: item,
      },
    })
    .catch(() => {});
};
</script>
