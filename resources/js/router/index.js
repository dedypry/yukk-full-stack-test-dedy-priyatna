import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '../store/AuthStore'

import pages from './pages'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: pages,
})

function haveToken () {
    const auth = useAuthUserStore()

    return !!(auth.token)
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authOnly) && !haveToken()) {
        next({
            name: "login",
        })
    } else if (to.matched.some(record => record.meta.guestOnly) && haveToken()) {
        next({
            name: 'dashboard',
        })
    } else {
        next()
    }
})

export default router
