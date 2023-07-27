<template>
    <v-dialog
        v-model="kpiAction.dialog"
        width="100%"
        :max-width="`${kpiAction.is_review == true ? '1240' : '900'} `"
        persistent
    >
        <v-card class="rounded-lg">
            <v-row class="ma-0 pa-0">
                <div
                    :class="`v-col-12 ${
                        kpiAction.is_review == true ? 'v-col-md-8' : ''
                    } px-4`"
                >
                    <v-row>
                        <div class="v-col-12">{{ kpiAction.title }}</div>
                        <div class="v-col-12 v-col-md-6 py-0">
                            <v-autocomplete
                                v-model="industry"
                                :items="industryList"
                                item-title="title"
                                item-value="title"
                                hide-details
                                return-object
                                v-if="kpiAction.action == 'add'"
                                variant="outlined"
                                density="compact"
                                label="Select Industry*"
                            >
                            </v-autocomplete>
                            <v-text-field
                                v-else
                                readonly
                                v-model="industry"
                                hide-details
                                variant="outlined"
                                density="compact"
                                label="Select Industry*"
                                class="bg-grey-lighten-4 mb-3"
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-6 py-0">
                            <v-autocomplete
                                v-model="selectedKPI"
                                :items="updatedKpiList"
                                item-title="title"
                                item-value="id"
                                variant="outlined"
                                v-if="kpiAction.action == 'add'"
                                density="compact"
                                label="Select KPI*"
                            >
                                <template v-slot:selection="{ props, item }">
                                    <span v-bind="props">
                                        {{
                                            item?.title.substring(0, 35) + "..."
                                        }}
                                    </span>
                                </template>

                                <template v-slot:item="{ props, item }">
                                    <v-list-item
                                        :style="`${
                                            item.raw.profile_ecode
                                                ? 'background-color:#2196F3; color:#fff;'
                                                : ''
                                        } `"
                                        v-bind="props"
                                        :title="item?.raw?.title"
                                    ></v-list-item>
                                </template>
                            </v-autocomplete>
                            <v-text-field
                                v-else
                                readonly
                                v-model="selectedKPI"
                                hide-details
                                variant="outlined"
                                density="compact"
                                label="Select KPI*"
                                class="bg-grey-lighten-4 mb-3"
                            ></v-text-field>
                        </div>

                        <div class="v-col-12 v-col-md-3 py-0 mb-2">
                            <v-select
                                v-if="!isDisabled && !kpiAction.is_review"
                                v-model="kpiData.target_type"
                                :items="targetTypeList"
                                label="Target Type*"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                            <v-text-field
                                v-else
                                readonly
                                v-model="kpiData.target_type"
                                hide-details
                                variant="outlined"
                                density="compact"
                                label="Target Type*"
                                class="bg-grey-lighten-4 mb-3"
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-3 py-0 mb-2">
                            <v-text-field
                                :readonly="isDisabled || kpiAction.is_review"
                                :rules="rulesNumberOnly"
                                type="number"
                                :class="`${
                                    isDisabled || kpiAction.is_review
                                        ? 'bg-grey-lighten-4 mb-3'
                                        : ''
                                }`"
                                hide-details
                                v-model="kpiData.target"
                                label="Target*"
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-3 py-0 mb-2">
                            <v-select
                                v-if="!isDisabled && !kpiAction.is_review"
                                v-model="kpiData.measures"
                                :items="measuresList"
                                label="Measures*"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                            <v-text-field
                                v-else
                                readonly
                                v-model="kpiData.measures"
                                hide-details
                                variant="outlined"
                                density="compact"
                                label="Measures*"
                                class="bg-grey-lighten-4 mb-3"
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-3 py-0 mb-2">
                            <v-select
                                v-if="!isDisabled && !kpiAction.is_review"
                                v-model="kpiData.weightage"
                                :items="kpiWeightageList"
                                label="KPI's Weightage (%)*"
                                variant="outlined"
                                density="compact"
                            ></v-select>
                            <v-text-field
                                v-else
                                readonly
                                v-model="kpiData.weightage"
                                hide-details
                                variant="outlined"
                                density="compact"
                                label="KPI's Weightage (%)*"
                                class="bg-grey-lighten-4 mb-3"
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 py-0">
                            <v-row class="mx-0 mb-3">
                                <v-col
                                    class="pa-3 bg-grey-lighten-4"
                                    style="
                                        border: 1px solid #b1b1b1;
                                        border-radius: 5px;
                                        min-height: 70px;
                                    "
                                    v-html="kpiData.evaluation_pattern"
                                >
                                </v-col>
                            </v-row>
                        </div>
                        <div class="v-col-12 pt-0">
                            <v-divider class="mx-auto"></v-divider>
                        </div>
                        <div class="v-col-12 py-0">
                            <v-textarea
                                auto-grow
                                v-model="kpiData.definition"
                                :readonly="
                                    isDisabled ||
                                    kpiAction.action == 'edit' ||
                                    kpiAction.is_review
                                "
                                label="KPI Definition*"
                                variant="outlined"
                                rows="2"
                            ></v-textarea>
                        </div>
                        <div class="v-col-12 py-0">
                            <v-textarea
                                auto-grow
                                v-model="kpiData.formula"
                                class="bg-grey-lighten-4 mb-4"
                                hide-details
                                readonly
                                label="Calculation Formula*"
                                variant="outlined"
                                rows="2"
                            ></v-textarea>
                        </div>
                        <div class="v-col-12 py-0">
                            <v-textarea
                                auto-grow
                                v-model="kpiData.subordinate_measures"
                                class="bg-grey-lighten-4 mb-4"
                                hide-details
                                readonly
                                label="Subordinate Measures*"
                                variant="outlined"
                                rows="2"
                            ></v-textarea>
                        </div>
                        <div class="v-col-12 py-0 hidden hide" hidden>
                            <v-textarea
                                auto-grow
                                v-model="kpiData.calculation_example"
                                class="bg-grey-lighten-4 mb-4"
                                hide-details
                                readonly
                                label="KPI Calculation Example*"
                                variant="outlined"
                                rows="2"
                            ></v-textarea>
                        </div>
                        <div class="v-col-12 py-0">
                            <v-divider class="mx-auto"></v-divider>
                        </div>
                        <div
                            v-if="!kpiAction.is_review"
                            class="v-col-12 d-flex justify-end"
                        >
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="cancelKPI"
                                >Cancel</v-btn
                            >
                            <v-btn
                                :loading="saveLoading"
                                :disabled="requiredFields.length < 6"
                                color="secondary"
                                class="ml-2 px-8"
                                @click="saveKpi"
                                >save</v-btn
                            >
                        </div>
                    </v-row>
                </div>
                <div
                    v-if="kpiAction.is_review"
                    class="v-col-12 v-col-md-4 bg-grey-lighten-4"
                >
                    <v-row class="px-3" v-if="!finalReview.isFinal">
                        <div class="v-col-12 px-1">{{ "Review" }}</div>
                        <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
                            {{
                                kpiAction.is_regular
                                    ? "Mid-year Achievement"
                                    : "First Review Achievement"
                            }}
                        </div>
                        <div class="v-col-12 v-col-md-12 py-0 px-1">
                            <v-text-field
                                type="number"
                                :readonly="
                                    finalReview.isFinal ||
                                    kpiAction.action == 'readonly'
                                "
                                hide-details
                                :class="`${
                                    finalReview.isFinal ||
                                    kpiAction.action == 'readonly'
                                        ? 'bg-grey-lighten-2'
                                        : ''
                                } mb-4`"
                                v-model="kpiData.achievement_midyear"
                                label="Achievement*"
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-6 py-0 px-1">
                            <v-text-field
                                readonly
                                v-model="mid_target_variation"
                                label="Target Variation"
                                :class="`${
                                    mid_target_variation &&
                                    parseFloat(mid_target_variation) >= 0
                                        ? 'text-success'
                                        : 'text-red'
                                } bg-grey-lighten-2`"
                                hide-details
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-6 py-0 px-1 mb-3">
                            <v-text-field
                                readonly
                                v-model="mid_remainder_target"
                                label="Remainder Annual Target"
                                class="bg-grey-lighten-2"
                                hide-details
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 v-col-md-12 py-0 px-1">
                            <v-text-field
                                type="number"
                                :readonly="
                                    finalReview.isFinal ||
                                    kpiAction.action == 'readonly'
                                "
                                hide-details
                                :class="`${
                                    finalReview.isFinal ||
                                    kpiAction.action == 'readonly'
                                        ? 'bg-grey-lighten-2'
                                        : ''
                                } mb-4`"
                                v-model="kpiData.revised_annual_target"
                                label="Revised Annual Target"
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                    </v-row>
                    <!--  -->

                    <v-row
                        class="px-3"
                        v-if="
                            finalReview.isFinal ||
                            kpiAction.action == 'readonly'
                        "
                    >
                        <div class="v-col-12 py-0 px-1 mt-3 mb-3 text-body-2">
                            {{
                                kpiAction.is_regular
                                    ? "Year-End Achievement"
                                    : "Final Review Achievement"
                            }}
                        </div>
                        <div class="v-col-12 v-col-md-12 py-0 px-1">
                            <v-text-field
                                type="number"
                                v-if="kpiAction.action != 'readonly'"
                                readonly
                                hide-details
                                class="bg-grey-lighten-2 mb-4"
                                v-model="kpiData.revised_annual_target"
                                label="Revised Annual Target"
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 py-0 px-1">
                            <v-text-field
                                v-model="kpiData.achievement_yearend"
                                :readonly="kpiAction.action == 'readonly'"
                                hide-details
                                :class="`${
                                    kpiAction.action == 'readonly'
                                        ? 'bg-grey-lighten-2'
                                        : ''
                                } mb-4`"
                                label="Total Achievement*"
                                variant="outlined"
                                density="compact"
                                persistent-hint
                            ></v-text-field>
                        </div>
                        <div class="v-col-12 py-0 px-1 text-center mb-3">
                            <h3
                                :class="`${
                                    end_rating_title &&
                                    end_rating_title == 'Poor'
                                        ? 'text-red'
                                        : 'text-success'
                                }`"
                            >
                                {{ end_rating_title }}
                            </h3>
                        </div>
                    </v-row>
                    <v-row>
                        <div class="v-col-12 d-flex justify-end">
                            <v-btn
                                class="bg-grey-lighten-2 text-primary"
                                variant="text"
                                @click="kpiAction.dialog = false"
                                >Cancel</v-btn
                            >
                            <v-btn
                                :loading="saveLoading"
                                v-if="
                                    kpiAction.action != 'readonly' &&
                                    props.submitButton &&
                                    finalReview.saveBtn
                                "
                                color="secondary"
                                class="ml-2"
                                @click="submitReview"
                                >Save</v-btn
                            >
                        </div>
                    </v-row>
                </div>
            </v-row>
        </v-card>
    </v-dialog>
    <SnackBar :options="sbOptions" />
</template>

<script setup>
import { ref, watch, computed } from "vue";
import SnackBar from "@/components/SnackBar.vue";
const props = defineProps({
    createdKpiTitle: {
        type: Array,
        default: [],
    },
    kpiOptions: {
        type: Object,
        default: null,
    },
    submitButton: {
        type: Boolean,
        default: true,
    },
    industryList: {
        type: Object,
        default: null,
    },
    remainWeightage: {
        type: Number,
        default: 70,
    },
    measuresList: {
        type: Object,
        default: null,
    },
    finalReview: {
        type: Boolean,
        default: false,
    },
});
const sbOptions = ref({});
const kpiEmit = defineEmits(["savedResponse"]);

const targetTypeList = ref(["min", "max"]);
const measuresList = ref([]);
const kpiWeightageList = ref(["5%", "10%", "15%", "20%", "25%", "30%"]);
const oldWeightage = ref(null);
const kpiAction = ref({});

const kpiData = ref({ measures: null });
const kpiList = ref([]);
const updatedKpiList = computed(() =>
    kpiList.value.filter((kpi) => !props.createdKpiTitle.includes(kpi.title))
);
const listIndustries = ref([]);
const industry = ref("");

const selectedKPI = ref("");
const mid_target_variation = ref("");
const mid_remainder_target = ref("");
const end_rating_title = ref("");
const industryTitle = ref("");
const saveLoading = ref(false);
const isDisabled = ref(true);

const requiredFields = ref([]);

const saveKpi = () => {
    saveLoading.value = true;
    kpiAction.value.data = kpiData.value;
    kpiAction.value.industryTitle = industryTitle.value;
    setTimeout(() => {
        saveLoading.value = false;
        kpiAction.value.dialog = false;
        kpiEmit("savedResponse", kpiAction.value);
    }, 1200);

    industry.value = props.kpiOptions.data.industry;
};

const cancelKPI = () => {
    kpiAction.value.dialog = false;
    if (
        kpiAction.value.action == "edit" ||
        kpiAction.value.action == "review"
    ) {
        industry.value = props.kpiOptions.data.industry;
        selectedKPI.value = props.kpiOptions.data.title;
    }
};

const submitReview = () => {
    if (props.finalReview.isFinal) {
        kpiAction.value.state = "final";
    } else {
        kpiAction.value.state = "mid";
    }

    saveKpi();
};

const midYearFunction = (newVal) => {
    mid_remainder_target.value = "";
    mid_target_variation.value = "";
    let getMidYearTarget = kpiData.value.target / 2;

    if (newVal.data.achievement_midyear) {
        if (kpiData.value.target_type == "max") {
            mid_target_variation.value = (
                getMidYearTarget - newVal.data.achievement_midyear
            ).toFixed(2);
        } else {
            mid_target_variation.value = (
                newVal.data.achievement_midyear - getMidYearTarget
            ).toFixed(2);
        }

        if (!kpiData.value.measures.includes("%")) {
            mid_remainder_target.value =
                kpiData.value.target - newVal.data.achievement_midyear;
        } else {
            mid_remainder_target.value = kpiData.value.target;
            mid_target_variation.value =
                kpiData.value.target - newVal.data.achievement_midyear;
        }
    }
};

const yearEndFunction = (newVal) => {
    let annualTarget = newVal.data.target;
    if (newVal.data.revised_annual_target) {
        annualTarget = newVal.data.revised_annual_target;
    }
    let targetAchievement = 0;
    if (newVal.data.achievement_yearend) {
        if (kpiData.value.target_type == "max") {
            targetAchievement = parseFloat(
                annualTarget / newVal.data.achievement_yearend
            ).toFixed(2);
        } else {
            targetAchievement = parseFloat(
                newVal.data.achievement_yearend / annualTarget
            ).toFixed(2);
        }

        if (targetAchievement >= 100) {
            end_rating_title.value = "Extremely Excellent";
        } else if (targetAchievement >= 90 && targetAchievement <= 99.99) {
            end_rating_title.value = "Excellent";
        } else if (targetAchievement >= 70 && targetAchievement <= 89.99) {
            end_rating_title.value = "Very Good";
        } else if (targetAchievement >= 50 && targetAchievement <= 69.99) {
            end_rating_title.value = "Good";
        } else if (targetAchievement >= 35 && targetAchievement <= 49.99) {
            end_rating_title.value = "Satisfactory";
        } else {
            end_rating_title.value = "Poor";
        }
    }
};

watch(
    () => props.kpiOptions,
    (newVal) => {
        saveLoading.value = false;
        listIndustries.value = props.industryList;
        kpiData.value = Object.assign({}, newVal.data);
        kpiAction.value = Object.assign({}, newVal);
        midYearFunction(newVal);
        yearEndFunction(newVal);

        if (
            kpiAction.value.action == "edit" ||
            kpiAction.value.action == "review" ||
            kpiAction.value.action == "readonly"
        ) {
            industry.value = newVal.data.industry;
            selectedKPI.value = newVal.data.title;
            oldWeightage.value = newVal.data.weightage;
            isDisabled.value = false;
        } else {
            industry.value = null;
            selectedKPI.value = null;
            oldWeightage.value = null;
            isDisabled.value = true;
        }
    }
);

const rulesNumberOnly = ref([(v) => v || !isNaN(v)]);
// watch(
//   () => kpiData.value.target,
//   (newVal) => {
   
//       if(isNaN(newVal) || !newVal){
//         console.log('isNaN',newVal);
//         return '';
//       }
//       console.log('!isNaN',newVal);
//       return newVal;
//   });

watch(
    () => kpiData.value.achievement_midyear,
    (newVal) => {
        mid_remainder_target.value = "";
        mid_target_variation.value = "";
        let getMidYearTarget = kpiData.value.target / 2;
        let percentage = "";

        if (kpiData.value.measures.includes("%")) {
            percentage = "%";
        }

        if (newVal) {
            if (kpiData.value.target_type == "max") {
                mid_target_variation.value =
                    (getMidYearTarget - newVal).toFixed(2) + percentage;
            } else {
                mid_target_variation.value =
                    (newVal - getMidYearTarget).toFixed(2) + percentage;
            }

            if (!kpiData.value.measures.includes("%")) {
                mid_remainder_target.value = kpiData.value.target - newVal;
            } else {
                mid_remainder_target.value = kpiData.value.target;
                mid_target_variation.value = kpiData.value.target - newVal;
            }
        }
    }
);

watch(
    () => kpiData.value.achievement_yearend,
    (newVal) => {
        end_rating_title.value = "";
        let annualTarget = kpiData.value.target;
        if (kpiData.value.revised_annual_target) {
            annualTarget = kpiData.value.revised_annual_target;
        }
        let targetAchievement = 0;
        if (newVal) {
            if (kpiData.value.target_type == "max") {
                targetAchievement = ((annualTarget / newVal) * 100).toFixed(2);
            } else {
                targetAchievement = ((newVal / annualTarget) * 100).toFixed(2);
            }

            if (targetAchievement >= 100) {
                end_rating_title.value = "Extremely Excellent"; // 6
            } else if (targetAchievement >= 90 && targetAchievement <= 99.99) {
                end_rating_title.value = "Excellent"; // 5
            } else if (targetAchievement >= 70 && targetAchievement <= 89.99) {
                end_rating_title.value = "Very Good"; // 4
            } else if (targetAchievement >= 50 && targetAchievement <= 69.99) {
                end_rating_title.value = "Good"; // 3
            } else if (targetAchievement >= 35 && targetAchievement <= 49.99) {
                end_rating_title.value = "Satisfactory"; // 2
            } else {
                end_rating_title.value = "Poor"; // 1
            }
        }
    }
);
watch(
    () => industry.value,
    (newVal) => {
        kpiList.value = [];
        measuresList.value = props.measuresList;
        if (kpiAction.value.action == "add") {
            isDisabled.value = true;
            kpiData.value = {};
            selectedKPI.value = null;
            if (newVal) {
                requiredFields.value.push("industry");

                removeDuplicateFromArray();
                industryTitle.value = newVal.title;
                listIndustries.value.map((el) => {
                    if (el.id == newVal.id) {
                        kpiList.value = el.kpis;
                    }
                });
            }
        } else {
            requiredFields.value.push("industry");
            isDisabled.value = false;
        }
    }
);
watch(
    () => selectedKPI.value,
    (newVal) => {
        if (kpiAction.value.action == "add") {
            kpiData.value = {};
            let newData = kpiList.value.filter((el) => {
                return el.id == newVal;
            });
            if (newData && newData.length > 0) {
                kpiData.value = newData[0];
                isDisabled.value = false;
                requiredFields.value.push("kpi");
                removeDuplicateFromArray();
            }
        } else {
            requiredFields.value.push("kpi");
        }
    }
);

watch(
    () => kpiData.value.weightage,
    (newVal) => {
        let isValid = false;
        sbOptions.value = {
            status: false,
            type: "info",
            text: "",
        };
        if (!isNaN(newVal) || newVal == undefined || newVal == null) {
            isValid = false;
        } else {
            if (kpiAction.value.action == "add") {
                if (parseInt(newVal) > props.remainWeightage) {
                    isValid = false;
                    sbOptions.value = {
                        status: true,
                        type: "error",
                        text: "Weightage is over the limit!11",
                    };
                } else {
                    isValid = true;
                }
            } else {
                let deduceWeightage =
                    parseInt(props.remainWeightage) +
                    parseInt(oldWeightage.value) -
                    parseInt(newVal);

                if (parseInt(deduceWeightage) < 0) {
                    isValid = false;
                    sbOptions.value = {
                        status: true,
                        type: "error",
                        text: "Weightage is over the limit!",
                    };
                } else {
                    if (oldWeightage.value > parseInt(newVal)) {
                        isValid = true;
                    } else {
                        if (parseInt(deduceWeightage) >= 0) {
                            isValid = true;
                        } else {
                            isValid = false;
                        }
                    }
                }
            }
        }
        if (isValid) {
            requiredFields.value.push("weightage");
            removeDuplicateFromArray();
        } else {
            removeFromArray("weightage");
        }
    }
);

const removeDuplicateFromArray = () => {
    requiredFields.value = requiredFields.value.filter(
        (item, index) => requiredFields.value.indexOf(item) === index
    );
};

const removeFromArray = (value) => {
    const index = requiredFields.value.indexOf(value);
    if (index > -1) {
        // only splice array when item is found
        requiredFields.value.splice(index, 1); // 2nd parameter means remove one item only
    }
};

watch(
    () => kpiData.value.target,
    (newVal) => {
        if (newVal) {
            requiredFields.value.push("target");
            removeDuplicateFromArray();
        } else {
            removeFromArray("target");
        }
    }
);
watch(
    () => kpiData.value.measures,
    (newVal) => {
        if (newVal) {
            requiredFields.value.push("measures");
            removeDuplicateFromArray();
        } else {
            removeFromArray("measures");
        }
    }
);
watch(
    () => kpiData.value.target_type,
    (newVal) => {
        requiredFields.value.push("target_type");
        removeDuplicateFromArray();
        if (newVal == "min") {
            kpiData.value.evaluation_pattern =
                '<span style="color:green">Positive Ranking = Exceeding the Target</span> <br/><span style="color:red">Negative Ranking = Falling short of the Target</span>';
        } else if (newVal == "max") {
            kpiData.value.evaluation_pattern =
                '<span style="color:green">Positive Ranking = Falling short of the Target</span> <br/><span style="color:red">Negative Ranking = Exceeding the Target</span>';
        } else {
            removeFromArray("target_type");
            kpiData.value.evaluation_pattern = "";
        }
    }
);
</script>
