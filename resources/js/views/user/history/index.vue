<script setup>
import { ref, watch } from "vue";
import { useUserTransactionStore } from "../../../store/UserTransaction";
import CreateDialog from "./create.vue";
import { formatDate, formatNumber } from "../../../plugins/mixin";
import Actions from "@/components/Actions.vue";
import Filter from "./filter.vue";

const store = useUserTransactionStore();

store.getTransaction();

watch(
    () => store.search,
    (val) => {
        if (!val) {
            store.getTransaction();
        }
    }
);
watch(
    () => store.page,
    (val) => {
        if (val) {
            store.getTransaction();
        }
    }
);
watch(
    () => store.perPage,
    (val) => {
        if (val) {
            store.getTransaction();
        }
    }
);

function editForm(data) {
    store.form = data;
    store.createDialog = true;
}
</script>

<template>
    <VCard :title="`Current Balance ${formatNumber(store.balance)}`">
        <VCardTitle>
            <VRow class="d-flex justify-space-between mb-3">
                <VCol cols="12" md="2">
                    <VSelect
                        label="perPage"
                        :items="[10, 20, 50, 100]"
                        density="compact"
                        v-model="store.perPage"
                    />
                </VCol>
                <VCol cols="12" md="8" class="d-flex justify-space-between">
                    <VTextField
                        label="Search"
                        density="compact"
                        append-inner-icon="mdi-magnify"
                        @click:append-inner="
                            store.getTransaction, (store.page = 1)
                        "
                        v-model="store.search"
                    />
                    <VBtn
                        @click="store.filterDialog = !store.filterDialog"
                        class="mx-3"
                        color="warning"
                        >Filter</VBtn
                    >
                    <VBtn @click="store.createDialog = !store.createDialog"
                        >Create Transaction</VBtn
                    >
                </VCol>
            </VRow>
        </VCardTitle>
        <VCardText>
            <VTable>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Notes</th>
                        <th>Transaction Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in store.transaction.data" :key="i">
                        <td>{{ item.type }}</td>
                        <td
                            :class="
                                item.type != 'topup'
                                    ? 'text-danger'
                                    : 'text-success'
                            "
                        >
                            {{ formatNumber(item.amount) }}
                        </td>
                        <td>{{ item.notes }}</td>
                        <td>{{ formatDate(item.created_at) }}</td>
                        <td>
                            <Actions
                                @delete="store.deleteTransaction(item.id)"
                                @edit="editForm(item)"
                            />
                        </td>
                    </tr>
                </tbody>
            </VTable>

            <div class="text-center">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="8">
                            <v-container class="max-width">
                                <v-pagination
                                    v-model="store.page"
                                    class="my-4"
                                    :length="store.transaction.last_page"
                                    rounded="circle"
                                ></v-pagination>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </VCardText>
    </VCard>
    <CreateDialog />
    <Filter />
</template>

<style>
.text-danger {
    color: red;
}
.text-success {
    color: green;
}
</style>
