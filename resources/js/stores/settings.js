import { defineStore } from "pinia";
// import axios from "axios";
export const useSettingStore = defineStore("setting", {
    state: () => ({
        page_loading: {
            status: true,
            msg: "",
        },
        is_from_login: false,
        pms_settings: null,
    }),
    getters: {
        isFromLogin: (state) => state.is_from_login,
        isPageLoading: (state) => state.page_loading,
        pmsSettings: (state) => state.pms_settings,
    },
    actions: {
        async setPmsSettings(res) {
            this.pms_settings = Object.assign({}, res);
        },
        async setPageLoading(status, msg) {
            this.page_loading = {
                ...this.page_loading,
                ...{
                    status: status,
                    msg: msg ? msg : "checking account",
                },
            };
        },
        async setIsFromLogin(status) {
            this.is_from_login = status;
        },
    },
});
