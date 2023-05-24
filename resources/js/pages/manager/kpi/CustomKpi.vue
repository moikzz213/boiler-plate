<template>
  <v-container class="pb-16">
    <v-row class="my-5">
      <div class="v-col-12">
        <div class="text-h6">My Custom KPI</div>
      </div>
      <div class="v-col-12">
        <v-card v-if="kpiList.length > 0" class="mb-3 rounded-lg">
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
        </v-card>
        <v-card v-else>
          <v-card-text class="text-center"> No records found </v-card-text>
        </v-card>
      </div>
    </v-row>
    <CustomKpiDialog :kpi-options="kpiOptions" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { mdiPlus, mdiPencil, mdiTrashCan } from "@mdi/js";
import CustomKpiDialog from "@/components/CustomKpiDialog.vue";

// kpi
const kpiOptions = ref({
  title: "",
  dialog: false,
  data: {},
  type: "",
  action: "",
  is_review: false,
});
const kpiList = ref([
  {
    id: 1,
    title: "Test 1",
  },
  {
    id: 2,
    title: "Test 2",
  },
]);
const kpiForm = ref({
  data: {},
  loading: false,
  dialog: false,
});
const addKPI = () => {
  kpiOptions.value = {
    ...kpiOptions.value,
    ...{
      title: "Add New KPI ",
      data: {},
      dialog: true,
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
      dialog: true,
      type: "kpi",
      action: "edit",
      is_review: false,
    },
  };
  console.log("open kpi in a dialog");
};
const removeKPI = () => {
  console.log("open remove kpi in a dialog");
};
</script>
