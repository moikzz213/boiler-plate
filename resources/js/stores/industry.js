import { defineStore } from "pinia";
// import axios from "axios";
import { clientApi } from "../services/clientApi";
export const useIndustryStore = defineStore("industry", {
    state: () => ({
        industry_list: [],
    }),
    getters: {
        industries: (state) => state.industry_list,
        active_industries: (state) => state.industry_list.filter(i => i.status === 'active'),
    },
    actions: {
        async getIndustries(token) {
            await clientApi(token)
                .get("/api/industries")
                .then((res) => {
                    this.industry_list = res.data;
                });
        },
    },
});
