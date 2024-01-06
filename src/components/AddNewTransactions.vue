<template>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="submitTransaction">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" id="text" placeholder="Enter text..." v-model="text" />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br />
                (negative - expense, positive - income)</label>
            <input type="number" id="amount" placeholder="Enter amount..." v-model="amount" />
        </div>
        <button class="btn">Add transaction</button>
    </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const emit = defineEmits(['addNewTransaction'])

const text = ref('')
const amount = ref('')


const submitTransaction = () => {
    emit('addNewTransaction', text.value, parseFloat(amount.value))
    text.value = ''
    amount.value = ''
}
</script>