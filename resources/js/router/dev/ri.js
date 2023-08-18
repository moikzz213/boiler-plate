export const ri = [
    {
        path: "/hr/industries",
        component: () => import("../../pages/hr/industries/Industries.vue"),
        name: "Industries",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Industries",
        },
    },
    {
        path: "/hr/industries/page/:page",
        component: () => import("../../pages/hr/industries/Industries.vue"),
        name: "PaginatedIndustries",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Industries",
        },
    },
    {
        path: "/hr/measures",
        component: () => import("../../pages/hr/measures/Measures.vue"),
        name: "Measures",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Measures",
        },
    },
    {
        path: "/hr/measures/page/:page",
        component: () => import("../../pages/hr/measures/Measures.vue"),
        name: "PaginatedMeasures",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Measures",
        },
    },
    {
        path: "/hr/weightages",
        component: () => import("../../pages/hr/weightage/Weightages.vue"),
        name: "Weightages",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Weightage",
        },
    },
    {
        path: "/hr/weightages/page/:page",
        component: () => import("../../pages/hr/weightage/Weightages.vue"),
        name: "PaginatedWeightages",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Weightages",
        },
    },
    {
        path: "/hr/companies",
        component: () => import("../../pages/hr/companies/Companies.vue"),
        name: "Companies",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Companies",
        },
    },
    {
        path: "/hr/companies/page/:page",
        component: () => import("../../pages/hr/companies/Companies.vue"),
        name: "PaginatedCompanies",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin"],
            title: "Companies",
        },
    },
    {
        path: "/hr/reports",
        component: () => import("../../pages/hr/reports/Reports.vue"),
        name: "Reports",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Reports",
        },
    },
    {
        path: "/manager/custom/:type",
        component: () => import("../../pages/manager/kpi/CustomKpi.vue"),
        name: "ManagerCustomKPI",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "manager"],
            title: "Custom KPIs",
        },
    },
    {
        path: "/manager/custom/:type/page/:page",
        component: () => import("../../pages/manager/kpi/CustomKpi.vue"),
        name: "PaginatedManagerCustomKPI",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "manager"],
            title: "Custom KPIs",
        },
    },

    {
        path: "/hr/employees/page/:page",
        component: () => import("../../pages/hr/employees/Employees.vue"),
        name: "PaginatedEmployees",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Employees",
        },
    },

    // superadmin
    {
        path: "/admin/app-users",
        component: () => import("../../pages/hr/employees/Employees.vue"),
        name: "AppUsers",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Employees",
        },
    },
];
