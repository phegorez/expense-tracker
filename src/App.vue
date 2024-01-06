<template>
  <Header />
  <div class="container">
    <Balance :getBalance="getBalance" />
    <IncomeExpense :getIncome="getIncome" :getExpense="getExpense" />
    <TransactionHistory :transactionList="transactionList" @deleteTransaction='handleDelete' />
    <AddNewTransactions @addNewTransaction="handleSubmit" />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionHistory from './components/TransactionHistory.vue'
import AddNewTransactions from './components/AddNewTransactions.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// Firebase include
import { collection, addDoc, getDocs, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase/init.js'


// Global State
// transactionList
import { ref, computed, onMounted } from 'vue';
const transactionList = ref([])
const test = ref([])

// Store data to firebase fireStore
const saveTransaction = async (text, amount) => {
  const colRef = collection(db, 'transactions')
  const transaction = {
    id: randomID(),
    text: text,
    amount: amount
  }
  const docRef = await addDoc(colRef, transaction)
  test.value.push(docRef.id)
  console.log('Document was created with ID:', docRef.id);
}
// Get data from firebase fireStore
const getTransactions = async () => {
  const querySnap = await getDocs(query(collection(db, 'transactions')))

  querySnap.forEach((doc) => {
    transactionList.value.push(doc.data())
  })
}
onMounted(() => {
  getTransactions();
})
// Delete data from firebase fireStore
const deleteTransaction = async (id) => {
  await deleteDoc(doc(db, 'transactions', id))
}

// getBalance
const getBalance = computed(() => {
  return transactionList.value.reduce((acc, curr) => {
    return acc + curr.amount
  }, 0)
})

// getIncome
const getIncome = computed(() => {
  return transactionList.value
    .filter(transaction => {
      return transaction.amount > 0
    })
    .reduce((acc, curr) => {
      return acc + curr.amount
    }, 0)
})

// getExpense
const getExpense = computed(() => {
  return transactionList.value
    .filter(transaction => {
      return transaction.amount < 0
    })
    .reduce((acc, curr) => {
      return acc + curr.amount
    }, 0)
})

// submit new transaction
const handleSubmit = (text, amount) => {
  if (!text || !amount) {
    toast.error('Please fill all filed', {
      autoClose: 2000
    })
  } else {
    transactionList.value = [
      ...transactionList.value,
      {
        id: randomID(),
        text: text,
        amount: amount
      }
    ]
    toast.success('New transaction is add', {
      autoClose: 2000
    })
  }
  saveTransaction(text, amount)
}

// randomID
const randomID = () => {
  return Math.floor(Math.random() * 1000000)
}

// delete selected transaction
const handleDelete = (id) => {
  deleteTransaction(id)
}


</script>