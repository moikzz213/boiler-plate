export const ri = [
    // {
    //     path: "/hr/industries",
    //     component: () => import("../../pages/hr/industries/Industries.vue"),
    //     // component: Dashboard,
    //     name: "Industries",
    //     meta: {
    //         requiresAuth: true,
    //         role: ["app_admin", "hr_admin", "hrbp"],
    //         title: "Industries",
    //     },
    // },
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
    // {
    //     path: "/hr/measures",
    //     component: () => import("../../pages/hr/measures/Measures.vue"),
    //     // component: Dashboard,
    //     name: "Measures",
    //     meta: {
    //         requiresAuth: true,
    //         role: ["app_admin", "hr_admin", "hrbp"],
    //         title: "Measures",
    //     },
    // },
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
        path: "/hr/weightage",
        component: () => import("../../pages/hr/weightage/Weightage.vue"),
        // component: Dashboard,
        name: "Weightage",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Weightage",
        },
    },
];
