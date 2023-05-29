import { defineStore } from "pinia";

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
        globalKeyStatus: null
    }),
    getters: {
        authProfile: (state) => state.profile,
        authToken: (state) => state.token,
        authRole: (state) => state.role,
        authGlobalKeyStatus: (state) => state.globalKeyStatus,
        authIsLoggedIn: (state) => state.is_logged_in,
    },
    actions: {
        async setCredentials(res) {
            // set profile into user
            this.profile = res.profile;

            // set token
            this.token = res.client.key;
            this.globalKeyStatus = res.globalKeyStatus;
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
        async setProfile(profile) {
            this.profile = profile;
        },
    },
    persist: true,
});
