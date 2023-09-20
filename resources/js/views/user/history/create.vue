<script setup>
import { useUserTransactionStore } from "../../../store/UserTransaction";

const store = useUserTransactionStore();
</script>

<template>
    <VDialog v-model="store.createDialog" persistent width="500">
        <VCard>
            <VCardTitle>
                <span class="text-h5">Create Transaction</span>
            </VCardTitle>
            <VCardText>
                <VForm>
                    <VRow>
                        <VCol cols="12">
                            <VSelect
                                label="Type"
                                :items="['transaction', 'topup']"
                                v-model="store.form.type"
                            ></VSelect>
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Amount"
                                type="number"
                                v-model="store.form.amount"
                            ></VTextField>
                        </VCol>
                        <VCol cols="12">
                            <VTextarea
                                label="Notes"
                                v-model="store.form.notes"
                            ></VTextarea>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn color="secondary" @click="store.createDialog = false"
                    >Close</VBtn
                >
                <VBtn @click="store.storeTransaction">Submit</VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
