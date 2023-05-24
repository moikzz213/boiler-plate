import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore("authClient", {
    state: () => ({
        user: null,
        profile: null,
        token: null,
        role: ["manager", "hr_admin"],
        is_logged_in: false,
        is_app_admin: false,
        is_hr_admin: false,
        is_manager: false,
        is_hrbp: false,
    }),
    getters: {
        authUser: (state) => state.user,
        authProfile: (state) => state.profile,
        authToken: (state) => state.token,
        authIsLoggedIn: (state) => state.is_logged_in,
        authIsManager: (state) => state.is_manager,
    },
    actions: {
        async setCredentials(res) {
            // set user
            this.user = res.user;

            // set token
            this.token = res.token;

            // set is manager, to remove
            this.is_manager =
                res.user.teams && res.user.teams.length > 0 ? true : false;

            // set role to manager if user have teams
            if (this.is_manager == true) {
                this.user = {
                    ...this.user,
                    ...{
                        role: "manager",
                    },
                };
            }
            // set is logged_in
            if (res.user && res.token) {
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
