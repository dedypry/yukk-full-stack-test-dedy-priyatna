<script setup>
import { useDialogStore } from "./store/DialogStore";
const store = useDialogStore();
</script>

<template>
    <VApp>
        <RouterView />
        <v-dialog
            v-model="store.dialogShow"
            :scrim="false"
            persistent
            width="auto"
        >
            <v-card color="primary">
                <v-card-text>
                    Please Wait
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </VApp>
</template>
