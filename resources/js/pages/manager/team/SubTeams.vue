<template>
    <div>
        <v-row
            class="v-col-12 py-0 my-0 ml-3"
            v-for="sub1 in userTeam.teams"
            :key="sub1.id"
        >
            <div class="d-flex align-center w-100">
                <div style="width: 25px">
                    <v-btn
                        @click="showSubTeamFn(sub1)"
                        class=""
                        color="primary"
                        size="25"
                        v-if="sub1.teams && sub1.teams.length > 0"
                        >{{ sub1.sign ? sub1.sign : "+" }}</v-btn
                    >
                </div>

                <div style="width: 100%">
                    <v-card width="100%" class="mb-1 elevation-0">
                        <!-- @click="() => openMember(sub1,true)" -->
                        <v-card-text style="position: relative">
                            <div
                                v-if="sub1.is_regular == false"
                                class="mb-2"
                                style="
                                    color: white;
                                    font-size: 8px;
                                    line-height: 8px;
                                    padding: 4px 10px;
                                    display: inline-block;
                                    text-transform: uppercase;
                                    background-color: #2196f3;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                "
                            >
                                Probation Employee
                            </div>
                            <v-row>
                                <div
                                    :class="`v-col-12 ${
                                        sub1.is_regular == false ? 'pt-6' : ''
                                    } v-col-md-3`"
                                >
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
                                                    .state != 'yearend') ||
                                            (sub1.reviews &&
                                                sub1.reviews.length > 0 &&
                                                sub1.reviews[0].type ==
                                                    'probation' &&
                                                sub1.reviews[0].state !=
                                                    'final_review')
                                        "
                                    >
                                        <div>
                                            {{ ratingOrWeightage(sub1) }}
                                            / 100
                                        </div>
                                        <div class="text-caption text-grey">
                                            Total KPI
                                        </div>
                                    </div>
                                </div>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
            <!-- Sub Team here -->
            <SubTeam
                class="w-100"
                :user="sub1"
                v-if="sub1.teams && sub1.teams.length > 0 && sub1.sign == '-'"
            />
            <!-- End Sub Team -->
        </v-row>
    </div>
</template>

<script setup>
import { ref } from "vue";
import KpiProgress from "@/components/kpi/KpiProgress.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { useSettingStore } from "@/stores/settings";
import SubTeam from "./SubTeams.vue";
const settingStore = useSettingStore();

const props = defineProps({
    user: {
        type: Object,
        default: null,
    },
});

const ratingOrWeightage = (user) => {
    let sum = 0;
    if (user.reviews && user.reviews.length > 0 && user.reviews[0].key_review) {
        user.reviews[0].key_review.map((o, i) => {
            sum += o.weightage;
        });
    }
    return sum;
};

const userTeam = ref(props.user);

const count = ref(0);
const showSubTeamFn = (user) => {
    if (user.sign) {
        if (user.sign == "+") {
            user.sign = "-";
            count.value += 1;
            //  userTeam.value = user;
        } else {
            user.sign = "+";
            signDefault(user);
        }
    } else {
        user.sign = "-";
        count.value += 1;
        //  userTeam.value = user;
    }
    console.log(userTeam.value);
};

const signDefault = (data) => {
    let datas = Object.assign([], data);

    datas.teams.map((o, i) => {
        o.sign = "+";
        if (o.teams && o.teams.length > 0) {
            signDefault(o);
        }
    });
};
</script>
