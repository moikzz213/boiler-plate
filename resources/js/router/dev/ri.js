export const ri = [ 
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
    
];
