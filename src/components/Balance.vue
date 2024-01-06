<template>
    <h4>Your Balance</h4>
    <h1 id="balance">฿{{getBalance}}</h1>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    getBalance: {
        type: Function,
        required: true
    }
})
</script>