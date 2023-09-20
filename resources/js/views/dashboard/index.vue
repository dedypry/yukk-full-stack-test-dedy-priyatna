<script setup>
import { useAuthUserStore } from "../../store/AuthStore";
const store = useAuthUserStore();
</script>

<template>
    <VCard>
        <VCardText>
            <h3>Hi {{ store.user.name }}</h3>
            <br />
            Welcome Back to Dashboar Transaction
            <br />
            select menu transaction for the begin
        </VCardText>
    </VCard>
</template>
