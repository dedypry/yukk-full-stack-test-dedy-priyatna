export default [
    { path: '/', redirect: '/dashboard' },
    {
        path: '/',
        component: () => import('../layouts/default.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/dashboard/index.vue'),
                meta: {
                    authOnly: true
                }
            },
            {
                path: 'transaction',
                name: 'transaction',
                component: () => import('../views/user/history/index.vue'),
                meta: {
                    authOnly: true
                }
            },
        ],
    },
    {
        path: '/',
        component: () => import('../layouts/blank.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/login.vue'),
                meta: {
                    guestOnly: true
                }
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('../views/auth/register.vue'),
                meta: {
                    guestOnly: true
                }
            },
            {
                path: '/:pathMatch(.*)*',
                component: () => import('../views/[...all].vue'),
            },
        ],
    },
]
