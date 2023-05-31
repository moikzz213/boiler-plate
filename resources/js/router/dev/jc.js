export const jc = [
    {
        path: "/print/kpi/:year/:ecode",
        component: () => import("../../pages/Print.vue"), 
        name: "print",
        meta: {
            requiresAuth: false, 
            title: "Performance Review",
        },
    },
];
