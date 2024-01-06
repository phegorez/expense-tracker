<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <p id="money-plus" class="money plus">+฿{{getIncome}}</p>
        </div>
        <div>
            <h4>Expense</h4>
            <p id="money-minus" class="money minus">-฿{{getExpense}}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    getIncome: {
        type: Function,
        req:true
    },
    getExpense: {
        type:Function,
        req:true
    }
})
</script>