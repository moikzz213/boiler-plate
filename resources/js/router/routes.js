// import Dashboard from "../pages/admin/Dashboard.vue";
// import Users from "../admin//Users.vue";
// import Large from "../admin//Large.vue";
export const routes = [
    /**
     * Auth
     * https://medium.com/@ripoche.b/create-a-spa-with-role-based-authentication-with-laravel-and-vue-js-ac4b260b882f
     *
     * Auth with sanctum
     * https://techvblogs.com/blog/spa-authentication-laravel-9-sanctum-vue3-vite
     */

    {
        path: "/",
        component: () => import("../pages/Dashboard.vue"),
        name: "Home",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "normal", "manager", "hr_admin", "hrbp"],
            title: "Home",
        },
    },

    /**
     * Auth Login
     */
    {
        path: "/login",
        component: () => import("../auth/Login.vue"),
        name: "Login",
        meta: {
            requiresAuth: false,
            title: "Login",
        },
    },

     /**
     * Reset Password
     */
     {
        path: "/reset-password",
        component: () => import("../auth/ResetPasswordMail.vue"),
        name: "ResetPasswordMail",
        meta: {
            requiresAuth: false,
            title: "ResetPasswordMail",
        },
    },

    {
        path: "/link/reset-password/employee-ecode",
        component: () => import("../auth/ResetPassword.vue"),
        name: "ResetPassword",
        meta: {
            requiresAuth: false,
            title: "ResetPassword",
        },
    }, 

    // All users
    {
        path: "/dashboard",
        component: () => import("../pages/Dashboard.vue"),
        name: "Dashboard",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "normal", "manager", "hr_admin", "hrbp"],
            title: "Dashboard",
        },
    },
    {
        path: "/account",
        component: () => import("../pages/account/Account.vue"),
        name: "Account",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "manager", "normal", "hr_admin", "hrbp"],
            title: "Account",
        },
    }, 
      
    // Admin routes
    {
        path: "/admin/users",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "Users",
        meta: {
            requiresAuth: true,
            role: ["app_admin"],
            title: "Users",
        },
    },
    {
        path: "/admin/users/page/:page",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "PaginatedUsers",
        meta: {
            requiresAuth: true,
            role: ["app_admin"],
            title: "Users",
        },
    },
    {
        path: "/admin/users/:ecode",
        component: () => import("../pages/admin/users/EditUser.vue"),
        name: "EditUser",
        meta: {
            requiresAuth: true,
            role: ["app_admin"],
            title: "Edit User",
        },
    },
    {
        path: "/admin/logs",
        component: () => import("../pages/admin/Logs.vue"),
        name: "Logs",
        meta: {
            requiresAuth: true,
            role: ["app_admin"],
            title: "Logs",
        },
    },
    {
        path: "/admin/notifications",
        component: () => import("../pages/admin/Notifications.vue"),
        name: "Notifictions",
        meta: {
            requiresAuth: true,
            role: ["app_admin"],
            title: "Notifictions",
        },
    },

    // unauthorized
    {
        path: "/unauthorized",
        component: () => import("../pages/Unauthorized.vue"),
        name: "Unauthorized",
        meta: {
            requiresAuth: true,
            title: "Unauthorized",
        },
    },

    // employee routes
];
