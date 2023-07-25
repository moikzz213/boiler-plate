export const jc = [
    {
        path: "/print/kpi/:year/:ecode",
        component: () => import("../../pages/Print.vue"), 
        name: "print",
        meta: {
            requiresAuth: true, 
            title: "Performance Review",
        },
    },
    {
        path: "/hr/reports",
        component: () => import("../../pages/hr/reports/Report.vue"),
        name: "reports",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Reports",
        },
    },
];
