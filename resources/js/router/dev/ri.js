export const ri = [
    {
        path: "/hr/industries",
        component: () => import("../../pages/hr/industries/Industries.vue"),
        // component: Dashboard,
        name: "Industries",
        meta: {
            requiresAuth: true,
            role: ["app_admin", "hr_admin", "hrbp"],
            title: "Industries",
        },
    },
];
