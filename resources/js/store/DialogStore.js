import { defineStore } from "pinia";

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        dialogShow: false
    })
})
