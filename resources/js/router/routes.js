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
        component: () => import("../pages/Home.vue"),
        name: "Home",
        meta: {
            requiresAuth: true,
            role: ["superadmin", "employee", "manager"],
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

    // All users
    {
        path: "/dashboard",
        component: () => import("../pages/Dashboard.vue"),
        name: "Dashboard",
        meta: {
            requiresAuth: true,
            role: ["superadmin", "employee", "manager"],
            title: "Dashboard",
        },
    },
    {
        path: "/account",
        component: () => import("../pages/account/Account.vue"),
        name: "Account",
        meta: {
            requiresAuth: true,
            role: ["superadmin", "employee", "manager"],
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
            role: ["manager", "superadmin"],
            title: "Teams",
        },
    },
    {
        path: "/manager/teams/member/:id",
        component: () => import("../pages/manager/team/SingleTeamMember.vue"),
        name: "SingleTeamMember",
        meta: {
            requiresAuth: true,
            role: ["manager", "superadmin"],
            title: "Team Member",
        },
    },
    {
        path: "/manager/kpi",
        component: () => import("../pages/manager/kpi/CustomKpi.vue"),
        name: "ManagerCustomKPI",
        meta: {
            requiresAuth: true,
            role: ["manager", "superadmin"],
            title: "Custom KPIs",
        },
    },

    // hr routes
    {
        path: "/hr/employees",
        component: () => import("../pages/hr/employees/Employees.vue"),
        // component: Dashboard,
        name: "Employees",
        meta: {
            requiresAuth: true,
            role: ["hradmin", "hrbp", "superadmin"],
            title: "Employees",
        },
    },
    {
        path: "/hr/employees/:ecode",
        component: () => import("../pages/hr/employees/SingleEmployee.vue"),
        // component: Dashboard,
        name: "SingleEmployee",
        meta: {
            requiresAuth: true,
            role: ["hradmin", "hrbp", "superadmin"],
            title: "Employee",
        },
    },

    // Admin routes
    {
        path: "/admin",
        component: () => import("../pages/admin/Dashboard.vue"),
        // component: Dashboard,
        name: "AdminRoot",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Dashboard",
        },
    },
    {
        path: "/admin/users",
        component: () => import("../pages/admin/users/Users.vue"),
        name: "Users",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Users",
        },
    },
    {
        path: "/admin/users/:id",
        component: () => import("../pages/admin/users/EditUser.vue"),
        name: "EditUser",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Edit User",
        },
    },
    {
        path: "/admin/logs",
        component: () => import("../pages/admin/Logs.vue"),
        name: "Logs",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Logs",
        },
    },
    {
        path: "/admin/departments",
        component: () => import("../pages/admin/Departments.vue"),
        name: "Departments",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Departments",
        },
    },
    {
        path: "/admin/companies",
        component: () => import("../pages/admin/Companies.vue"),
        name: "Companies",
        meta: {
            requiresAuth: true,
            role: ["superadmin"],
            title: "Companies",
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
