import { defineStore } from "pinia";
import axios from "axios";
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authClient", {
    state: () => ({
        profile: null,
        token: null,
        role: [], // superadmin, app_admin, normal, hr_admin, hrbp, manager
        is_logged_in: false,
    }),
    getters: {
        authProfile: (state) => state.profile,
        authToken: (state) => state.token,
        authRole: (state) => state.role,
        authIsLoggedIn: (state) => state.is_logged_in,
    },
    actions: {
        async setCredentials(res) {
            // set profile into user
            this.profile = res.profile;

            // set token
            this.token = res.client.key;

            // set role
            this.role = [];
            this.role.push(res.profile.role);

            // set is manager, to remove
            if (res.profile.teams && res.profile.teams.length > 0) {
                this.role.push("manager");
            }

            // set is logged_in
            if (res.profile && res.client.key) {
                this.is_logged_in = true;
            }
        },
        async saveClientKey(data) {
            let ckData = {
                key: data.token,
                user_ecode: data.user.ecode,
            };
            const response = await axios.post("/client/savekey", ckData);
            if (response) {
                this.setCredentials(response.data);
            }
            return response;
        },
        async logout() {
            this.user = null;
            this.token = null;
            this.is_logged_in = false;
        },
        async setUser(user) {
            this.user = user;
        },
        async setToken(token) {
            this.token = token;
        },
        async setLoggedIn() {
            this.is_logged_in = true;
        },
        async setProfile(profile) {
            this.profile = profile;
        },
    },
    persist: true,
});
