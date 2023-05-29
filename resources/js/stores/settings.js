import { defineStore } from "pinia";
import axios from "axios";
export const useSettingStore = defineStore("setting", {
    state: () => ({
        is_loading: false,
        settings: null,
    }),
    getters: {
        isLoading: (state) => state.is_loading,
        pmsSettings: (state) => state.settings,
    },
    actions: {
        async setSettings(res) {},
        async setLoadingOn() {
            this.is_loading = true;
        },
        async setLoadingOff() {
            this.is_loading = false;
        },
    },
});
