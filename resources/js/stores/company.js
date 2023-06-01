import { defineStore } from "pinia";
// import axios from "axios";
import { clientApi } from "../services/clientApi";
export const useCompanyStore = defineStore("company", {
    state: () => ({
        company_list: [],
    }),
    getters: {
        companies: (state) => state.company_list,
    },
    actions: {
        async getCompanies(token) {
            await clientApi(token)
                .get("/api/companies")
                .then((res) => {
                    this.company_list = res.data;
                });
        },
    },
});
