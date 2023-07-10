<template>
  <v-container>
    <PageHeader title="Setup Employee Email Notifications - Regular - Probation" />
    <v-row class="mt-2">
     
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Days interval reminder</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-text-field hide-details class="ma-0" v-model="default_reminder_days" variant="outlined" density="compact" :label="`Reminder Every ${default_reminder_days} days`"></v-text-field>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('default_reminder_days',default_reminder_days)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      
      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Setting: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_setting_open" rows="3" variant="outlined" density="compact" label="KPI Setting: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_setting_open',kpi_setting_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Setting: Review</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_setting_review" rows="3" variant="outlined" density="compact" label="KPI Setting: Review"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_setting_review',kpi_setting_review)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>

      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Setting: Submit</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_setting_submit" rows="3" variant="outlined" density="compact" label="KPI Setting: Submit"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_setting_submit',kpi_setting_submit)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>

      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Mid Year: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_mid_open" rows="3" variant="outlined" density="compact" label="KPI Mid Year: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_mid_open',kpi_mid_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>

      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Mid Year: Submit</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_mid_submit" rows="3" variant="outlined" density="compact" label="KPI Mid Year: Submit"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_mid_submit',kpi_mid_submit)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>

      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Year End: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_final_open" rows="3" variant="outlined" density="compact" label="KPI Year End: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_final_open',kpi_final_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider> 
      <div class="v-col-md-3 v-col-sm-12  my-0 ">KPI Year End: Submit</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="kpi_final_submit" rows="3" variant="outlined" density="compact" label="KPI Year End: Submit"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('kpi_final_submit',kpi_final_submit)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider class="mt-3"></v-divider>
       <div class="mx-auto my-2 text-uppercase"> Probation Notification Message</div>
      <v-divider class="mb-3"></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation Setting: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_setting_open" rows="3" variant="outlined" density="compact" label="Probation Setting: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_setting_open',probation_setting_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>

      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation Setting: Submit</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_setting_submitted" rows="3" variant="outlined" density="compact" label="Probation Setting: Submit"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_setting_submitted',probation_setting_submitted)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation First Review: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_mid_open" rows="3" variant="outlined" density="compact" label="Probation First Review: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_mid_open',probation_mid_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation First Review: Submit</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_mid_submit" rows="3" variant="outlined" density="compact" label="Probation First Review: Submit"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_mid_submit',probation_mid_submit)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation Final Review: Open</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_final_open" rows="3" variant="outlined" density="compact" label="Probation Final Review: Open"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_final_open',probation_final_open)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation Final Notification</div>
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
          <v-textarea hide-details class="ma-0" v-model="probation_final_notification" rows="3" variant="outlined" density="compact" label="Probation Final Notification - Day before the final review date"></v-textarea>
          <div class="btn-parent my-auto"><v-btn size="small" @click="saveNotification('probation_final_notification',probation_final_notification)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
        </div>
      <v-divider></v-divider>
      <div class="v-col-md-3 v-col-sm-12  my-0 ">Probation Final Review: Submit</div> 
      <div class="v-col-md-9 v-col-sm-12 d-flex parent-div">
            <v-textarea hide-details class="ma-0" v-model="probation_final_submit" rows="3" variant="outlined" density="compact" label="Probation Final Review: Submit"></v-textarea>
            <div class="btn-parent my-auto"><v-btn  size="small" @click="saveNotification('probation_final_submit',probation_final_submit)" class="ml-2 save-btn" color="primary">Save</v-btn></div>
          </div> 
      <v-divider></v-divider>
      <div class="v-col-md-12 mb-5"></div>
    </v-row>
    <SnackBar :options="sbOptions" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { clientApi } from "@/services/clientApi";
import { useAuthStore } from "@/stores/auth";
import SnackBar from "@/components/SnackBar.vue";
const authStore = useAuthStore();
const default_reminder_days = ref(3);
const kpi_setting_open = ref("");
const kpi_setting_review = ref("");
const kpi_setting_submit = ref("");
const kpi_mid_open = ref("");
const kpi_mid_submit = ref("");
const kpi_final_open = ref("");
const kpi_final_submit = ref("");
const probation_setting_open = ref("");
const probation_setting_submitted = ref("");
const probation_mid_open = ref("");
const probation_mid_submit = ref("");
const probation_final_open = ref("");
const probation_final_submit = ref(""); 
const probation_final_notification = ref("");
const hover = ref(false);

const sbOptions = ref({});
const saveNotification = (key,value) => {
  clientApi(authStore.authToken)
  .post("/api/save/setting/notifications", { meta_key: key, meta_value: value})
  .then((res) => {  
    sbOptions.value = {
          status: true,
          type: "success",
          text: 'Data has been updated.',
        };
  });
};

const fetchNotifications = async () => {
  clientApi(authStore.authToken)
        .get("/api/fetch/setting/notifications")
        .then((res) => {  
            if(res.data && res.data.length > 12){ 
                default_reminder_days.value = res.data[14].meta_value;
                kpi_setting_open.value = res.data[0].meta_value;
                kpi_setting_review.value = res.data[1].meta_value;
                kpi_setting_submit.value = res.data[2].meta_value;
                kpi_mid_open.value = res.data[3].meta_value;
                kpi_mid_submit.value = res.data[4].meta_value;
                kpi_final_open.value = res.data[5].meta_value;
                kpi_final_submit.value = res.data[6].meta_value;
                probation_setting_open.value = res.data[7].meta_value;
                probation_setting_submitted.value = res.data[8].meta_value;
                probation_mid_open.value = res.data[9].meta_value;
                probation_mid_submit.value = res.data[10].meta_value;
                probation_final_open.value = res.data[11].meta_value;
                probation_final_submit.value = res.data[12].meta_value;
                probation_final_notification.value = res.data[13].meta_value;
            }
        })
        .catch((err) => {});
};

fetchNotifications();
</script>
<style>
.btn-parent{ min-width:80px;} 
.btn-parent .save-btn { display:none; }
.parent-div:hover .save-btn { display:block; }
</style>