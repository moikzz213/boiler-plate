<template> 
    <div class="text-center">
      <v-dialog
        v-model="isViewList"
        width="auto"
      >
         
        <v-card>
            <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="isViewList = false"
          >
          <v-icon size="16"   :icon="mdiClose"></v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <div> {{ dialogTitle }}</div>
          <v-spacer></v-spacer>
        </v-toolbar>
          
          <v-card-text>
            <v-table density="compact">
                <thead>
                <tr>
                   <th>#</th>
                   <th>Emp.ID</th>
                   <th>Emp.Name</th>
                   <th>Manager</th>
                   <th>Job Title</th>
                   <th>Department</th>
                   <th>Email</th>
                </tr>
                </thead>
                <tbody v-if="listEmployeeReport && listEmployeeReport.length > 0">
                <tr
                    v-for="(item,index) in listEmployeeReport"
                    :key="item.id"
                >
                    <td>{{ index+1 }}</td>
                    <td>{{ item.ecode }}</td>
                    <td>{{ item.display_name }}</td>
                    <td>{{ item.managed_by ? item.managed_by.display_name : '' }}</td>
                    <td>{{ item.designation }}</td>
                    <td>{{ item.department }}</td>
                    <td>{{ item.email }}</td> 
                </tr>
                </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="isViewList = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> 
  </template>
  <script>
  import {  mdiClose } from "@mdi/js";
    export default {
      data () {
        return {
          dialog: false,
        }
      },
    }
  </script>