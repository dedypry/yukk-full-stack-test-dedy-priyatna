<script setup>
import { useUserTransactionStore } from "../../../store/UserTransaction";

const store = useUserTransactionStore();
</script>

<template>
    <VDialog v-model="store.filterDialog" persistent width="500" height="800">
        <VCard>
            <VCardTitle>
                <span class="text-h5">Filter</span>
            </VCardTitle>
            <VCardText>
                <VForm>
                    <VRow>
                        <VCol cols="12">
                            <VTextField
                                label="Date From"
                                type="date"
                                v-model="store.date_from"
                                append-inner-icon="mdi-close"
                                @click:append-inner="store.date_from = ''"
                            />
                        </VCol>
                        <VCol cols="12">
                            <VTextField
                                label="Date To"
                                type="date"
                                v-model="store.date_to"
                                append-inner-icon="mdi-close"
                                @click:append-inner="store.date_to = ''"
                            />
                        </VCol>
                        <VCol cols="12">
                            <VSelect
                                label="Type"
                                :items="['transaction', 'topup']"
                                v-model="store.type"
                            ></VSelect>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn color="secondary" @click="store.filterDialog = false"
                    >Close</VBtn
                >
                <VBtn @click="store.clearFilter" color="warning"
                    >Clear Filter</VBtn
                >
                <VBtn @click="store.getTransaction, (store.page = 1)"
                    >Filter</VBtn
                >
            </VCardActions>
        </VCard>
    </VDialog>
</template>
