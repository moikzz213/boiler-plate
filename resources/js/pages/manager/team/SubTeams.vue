<template>
    <v-row  >
        <div class="v-col-12 ml-3">
            <div
                class="d-flex"
                v-for="sub1 in user.teams"
                :key="sub1.id"
            >
                <div style="width: 2%" class="my-auto">
                    <div @click="showSubTeamFn(sub1)" style="width:2%;  position: absolute;" class=""><v-btn :color="`${sub1.sign && sub1.sign == '-' ? 'grey' :'primary'}`" class="pr-4" size="x-small" v-if="sub1.teams && sub1.teams.length > 0">{{ sub1.sign ? sub1.sign : '+' }}</v-btn></div>
                </div>
                <div style="width: 97%">
                    <div
                        v-if="sub1.is_regular == false"
                        class=""
                        style="
                            color: white;
                            font-size: 8px;
                            line-height: 8px;
                            margin-left: 15px;
                            padding: 4px 10px;
                            display: inline-block;
                            border-top-left-radius: 8px;
                            border-top-right-radius: 8px;
                            text-transform: uppercase;
                            background-color: #2196f3;
                        "
                    >
                        Probation Employee
                    </div>
                    <v-card
                        width="100%"
                        class="mb-1 elevation-0"
                        >
                        <!-- @click="() => openMember(sub1,true)" -->
                        <v-card-text>
                            <v-row>
                                <div class="v-col-12 v-col-md-3">
                                    <EmployeeCard :profile="sub1" />
                                </div>
                                <div class="v-col-12 v-col-md-8">
                                    <KpiProgress
                                        :density="'compact'"
                                        :selected-employee="sub1"
                                    />
                                </div>
                                <div
                                    class="v-col-12 v-col-md-1 d-flex justify-end align-center"
                                >
                                    <div
                                        v-if="
                                            (settingStore.pmsSettings &&
                                                settingStore.pmsSettings
                                                    .state !=
                                                    'yearend') ||
                                            (sub1.reviews &&
                                                sub1.reviews.length >
                                                    0 &&
                                                sub1.reviews[0].type ==
                                                    'probation' &&
                                                sub1.reviews[0].state !=
                                                    'final_review')
                                        "
                                    >
                                        <div>
                                            {{
                                                ratingOrWeightage(sub1)
                                            }}
                                            / 100
                                        </div>
                                        <div
                                            class="text-caption text-grey"
                                        >
                                            Total KPI
                                        </div>
                                    </div>
                                </div>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </div>
    </v-row>
</template>

<script setup> 
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { useSettingStore } from "@/stores/settings";
import { useAuthStore } from "@/stores/auth";
const settingStore = useSettingStore();
const kpiEmit = defineEmits(['ratingOrWeightage']); 
const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
     
}); 


const ratingOrWeightage = (user) => {
    kpiEmit('ratingOrWeightage', user);
};
 
const showSubTeamFn = (user) => { 
    console.log(user);
    if(user.sign){
        if( user.sign == '+'){
            user.sign = '-';
        }else{
            user.sign = '+';
        }
       
    }else{
        user.sign = '-';
    } 
}
</script>
