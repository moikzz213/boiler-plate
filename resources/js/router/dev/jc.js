export const jc = [
    {
        path: "/print/kpi/:year/:ecode",
        component: () => import("../../pages/Print.vue"),
        
        name: "print",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp","normal", "manager"],
            title: "Key Performance",
        },
    },
];
