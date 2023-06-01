import { defineStore } from "pinia";
// import axios from "axios";
export const useSettingStore = defineStore("setting", {
    state: () => ({
        page_loading: {
            status: true,
            msg: "",
        },
        is_from_login: false,
<<<<<<< HEAD
        settings: null,
    }),
    getters: {
        isFromLogin: (state) => state.is_from_login,
        isPageLoading: (state) => state.page_loading,
        pmsSettings: (state) => state.settings,
    },
    actions: {
        async setSettings(res) {},
        async setPageLoading(status, msg) {
=======
        pms_settings: null,
    }),
    getters: {
        isFromLogin: (state) => state.is_from_login,
        pageLoading: (state) => state.page_loading,
        pmsSettings: (state) => state.pms_settings,
    },
    actions: {
        async setPmsSettings(res) {
            this.pms_settings = Object.assign({}, res);
        },
        async setPageLoading(status, msg = null) {
            let text = msg ? msg : "checking account";
>>>>>>> c186c0ed2a007cb409f63ee1ca519a4011b3e13d
            this.page_loading = {
                ...this.page_loading,
                ...{
                    status: status,
<<<<<<< HEAD
                    msg: msg ? msg : "checking account",
=======
                    msg: text,
>>>>>>> c186c0ed2a007cb409f63ee1ca519a4011b3e13d
                },
            };
        },
        async setIsFromLogin(status) {
            this.is_from_login = status;
        },
    },
});
