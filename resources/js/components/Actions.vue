<script setup>
import { defineProps } from "vue";

defineProps(["edit", "detail"]);
</script>

<template>
    <VMenu transition="scale-transition">
        <template v-slot:activator="{ props }">
            <VBtn
                icon="mdi-dots-vertical"
                v-bind="props"
                variant="text"
                color="secondary"
            >
            </VBtn>
        </template>
        <VCard min-width="200">
            <VList>
                <VListItem @click="() => this.$emit('edit')">
                    <template v-slot:prepend>
                        <VIcon icon="mdi-pencil"></VIcon>
                    </template>
                    <VListItemTitle>Edit</VListItemTitle>
                </VListItem>
            </VList>
            <VList>
                <VListItem @click="() => this.$emit('delete')">
                    <template v-slot:prepend>
                        <VIcon icon="mdi-delete"></VIcon>
                    </template>
                    <VListItemTitle>Delete</VListItemTitle>
                </VListItem>
            </VList>
        </VCard>
    </VMenu>
</template>
