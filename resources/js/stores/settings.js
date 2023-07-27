import { defineStore } from "pinia";
// import axios from "axios";
export const useSettingStore = defineStore("setting", {
    state: () => ({
        page_loading: {
            status: true,
            msg: "",
        },
        is_from_login: false,
        pms_settings: [],
        all_settings: []
    }),
    getters: {
        isFromLogin: (state) => state.is_from_login,
        pageLoading: (state) => state.page_loading,
        pmsSettings: (state) => state.pms_settings,
        allSettings: (state) => state.all_settings,
    },
    actions: {
        filteredSetting(company_id) {

            let filteredArray = this.pms_settings.filter(ps => ps.company_id == company_id);
            if (filteredArray && filteredArray.length > 0) {
                return filteredArray[0];
            }
            return false;

        },
        filterAllSettings(company_id, year) {

            let filteredArray = this.all_settings.filter(ps => ps.company_id == company_id && ps.year == year);
            if (filteredArray && filteredArray.length > 0) {
                return filteredArray[0];
            }
            return false;

        },
        async setAllSettings(res) {
            this.all_settings = Object.assign([], res);
        },
        async setPmsSettings(res) {
            this.pms_settings = Object.assign([], res);
        },
        async setPageLoading(status, msg = null) {
            let text = msg ? msg : "checking account";
            this.page_loading = {
                ...this.page_loading,
                ...{
                    status: status,
                    msg: text,
                },
            };
        },
        async setIsFromLogin(status) {
            this.is_from_login = status;
        },
    },
});
