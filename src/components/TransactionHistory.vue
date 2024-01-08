<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li :class="list.amount < 0 ? 'minus' : 'plus'" v-for="list in transactionList" :key="list.id">
      {{ list.text }} <span>{{ list.amount + ' ฿' }}</span><button class="delete-btn mobile"
        @click="deleteTransaction(list.id)">x</button>
    </li>

  </ul>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

// define props from global state
const props = defineProps({
  transactionList: {
    type: Array,
    req: true
  }
})

// let isModalshow = ref(false)

// const showModal = () => {
//   isModalshow = !isModalshow
// }

// defind emits to send custom event
const emit = defineEmits(['deleteTransaction'])

const deleteTransaction = (id) => {
  emit('deleteTransaction', id)
}
</script>