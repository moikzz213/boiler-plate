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

    // Manager routes
    {
        path: "/manager/teams",
        component: () => import("../pages/manager/team/Teams.vue"),
        name: "Teams",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "manager"],
            title: "Teams",
        },
    },
    {
        path: "/manager/teams/member/:id",
        component: () => import("../pages/manager/team/SingleTeamMember.vue"),
        name: "SingleTeamMember",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "manager"],
            title: "Team Member",
        },
    },

    // hr routes
    {
        path: "/hr/employees",
        component: () => import("../pages/hr/employees/Employees.vue"),
        name: "Employees",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Employees",
        },
    },
    {
        path: "/hr/employees/:ecode",
        component: () => import("../pages/hr/employees/SingleEmployee.vue"),
        name: "SingleEmployee",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "normal",
        },
    },
    {
        path: "/hr/custom/kpi",
        component: () => import("../pages/hr/kpi/HrCustomKpi.vue"),
        name: "HrCustomKpi",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "KPI List",
        },
    },
    {
        path: "/hr/custom/kpi/page/:page",
        component: () => import("../pages/hr/kpi/HrCustomKpi.vue"),
        name: "PaginatedHrCustomKpi",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "KPI List",
        },
    },
    {
        path: "/hr/master/:type",
        component: () => import("../pages/hr/kpi/HrMasterKpi.vue"),
        name: "HrMasterKpi",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "KPI List",
        },
    },
    {
        path: "/hr/master/:type/page/:page",
        component: () => import("../pages/hr/kpi/HrMasterKpi.vue"),
        name: "PaginatedHrMasterKpi",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "KPI List",
        },
    },

    {
        path: "/hr/settings/pms",
        component: () => import("../pages/hr/settings/Pms.vue"),
        name: "Pms",
        meta: {
            requiresAuth: true,
            role: ["app_admin","hr_admin","hrbp"],
            title: "Performance Settings",
        },
    },
    {
        path: "/hr/settings/pms/page/:page",
        component: () => import("../pages/hr/settings/Pms.vue"),
        name: "PaginatedPms",
        meta: {
            requiresAuth: true,
            role: ["app_admin","hr_admin","hrbp"],
            title: "Performance Settings",
        },
    },
    {
        path: "/hr/settings/pms/:id",
        component: () => import("../pages/hr/settings/SinglePms.vue"),
        name: "SinglePms",
        meta: {
            requiresAuth: true,
            role: ["app_admin","hr_admin","hrbp"],
            title: "Performance Settings",
        },
    },
    {
        path: "/hr/settings/pms/new",
        component: () => import("../pages/hr/settings/NewPms.vue"),
        name: "NewPms",
        meta: {
            requiresAuth: true,
            role: ["app_admin","hr_admin","hrbp"],
            title: "Performance Settings",
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
