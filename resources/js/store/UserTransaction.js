import { defineStore } from "pinia";
import http from "../plugins/axios";
import { confirm, notify, notifyError } from "../plugins/mixin";
import { useDialogStore } from "./DialogStore";

export const useUserTransactionStore = defineStore('userTransaction', {
    state: () => ({
        transaction: {},
        createDialog: false,
        form: {},
        balance: 0,
        dialog: useDialogStore(),
        date_from: '',
        date_to: '',
        type: '',
        perPage: 10,
        page: 1,
        filterDialog: false,
        search: ""
    }),
    actions: {
        async getTransaction () {
            let query = ''
            if (this.date_from) {
                query += `date_from=${this.date_from}&`
            }
            if (this.date_to) {
                query += `date_to=${this.date_to}&`
            }
            if (this.type) {
                query += `type=${this.type}&`
            }
            if (this.search) {
                query += `search=${this.search}&`
            }
            if (this.page) {
                query += `page=${this.page}&`
            }
            if (this.perPage) {
                query += `perPage=${this.perPage}&`
            }
            this.dialog.dialogShow = true
            await http.get(`transaction?${query}`)
                .then(({ data }) => {
                    this.transaction = data.data
                    this.balance = data.balance.amount
                })
                .catch(err => notifyError(err))
            this.dialog.dialogShow = false
        },
        async storeTransaction () {
            this.dialog.dialogShow = true
            await http.post('transaction', this.form)
                .then(({ data }) => {
                    this.getTransaction()
                    notify(data.message)
                    this.createDialog = false
                    this.form = {}
                })
                .catch((err) => notifyError(err))
            this.dialog.dialogShow = false
        },
        async currentBalance (data) {
            data.forEach((e) => {
                if (e.type == 'topup') {
                    this.balance += e.amount;
                } else {
                    this.balance -= e.amount;
                }
            })
        },
        async getBalance () {
            await http.get('transaction/balance', this.form)
                .then(({ data }) => {
                    this.balance = data.data.amount;
                })
                .catch((err) => notifyError(err))
        },

        deleteTransaction (id) {
            confirm(async () => {
                this.dialog.dialogShow = true
                await http.delete(`transaction/${id}`)
                    .then(({ data }) => {
                        notify(data.message)
                        this.getTransaction()
                    })
                    .catch((err) => notifyError(err))
                this.dialog.dialogShow = false
            })
        },

        clearFilter () {
            this.date_from = ""
            this.date_to = ""
            this.type = ""
            this.search = ""

            this.getTransaction()
        },
    },
})
