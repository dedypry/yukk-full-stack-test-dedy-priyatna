import { defineStore } from "pinia";
import http from "../plugins/axios";
import { notify, notifyError } from "../plugins/mixin";
import router from "../router";

export const useAuthUserStore = defineStore('authStore', {
    state: () => ({
        token: '',
        user: {},
        loading: false
    }),
    actions: {
        async login (form) {
            this.loading = true;
            await http.post('login', form)
                .then(({ data }) => {
                    this.user = data.data.user;
                    this.token = data.data.token;
                    router.push({ name: 'dashboard' })
                    notify(data.message)
                })
                .catch(err => notifyError(err))

            this.loading = false
        },
        async register (form) {
            this.loading = true;
            await http.post('register', form)
                .then(({ data }) => {
                    this.user = data.data.user;
                    this.token = data.data.token;
                    router.push({ name: 'dashboard' })
                    notify(data.message)
                })
                .catch(err => notifyError(err))

            this.loading = false
        },
        async logout () {
            this.loading = true;
            await http.post('logout')
                .then(({ data }) => {
                    this.user = {};
                    this.token = '';
                    notify(data.message)
                    router.push({ name: 'login' })
                })
                .catch(err => notifyError(err))

            this.loading = false
        },
    },
    persist: true
})
