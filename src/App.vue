<template>
  <main class="main">
    <Header />
    <div class="main-container ">
      <Balance :getBalance="getBalance" />
      <IncomeExpense :getIncome="getIncome" :getExpense="getExpense" />
      <TransactionHistory :transactionList="transactionList" @deleteTransaction='handleDelete' />
      <AddNewTransactions @addNewTransaction="handleSubmit" />
    </div>
  </main>
</template>

<script setup>
// include components
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/IncomeExpense.vue';
import TransactionHistory from './components/TransactionHistory.vue'
import AddNewTransactions from './components/AddNewTransactions.vue'

// include toastify
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// include firebase
import { collection, getDocs, query, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from './firebase/init.js'

// include vue hook
import { ref, computed, onMounted } from 'vue';

// Global State
// transactionList
const transactionList = ref([])

// Store data to firebase fireStore
const saveTransaction = async (text, amount, uniqID) => {

  // access collection in firestore name transactions
  const colRef = collection(db, 'transactions')
  // access doccument and set ID via uniqID
  const docRef = doc(colRef, String(uniqID))

  // object data bluprint
  const transaction = {
    id: String(uniqID),
    text: text,
    amount: amount,
    date: getCurrentDate()
  }

  // set data in doccument
  await setDoc(docRef, transaction)
}
// Get Date
const getCurrentDate = () => {
  let date = new Date()
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // Months are zero-based, so we add 1
  let day = date.getDate();
  let currentDate = `${year}-${month}-${day}`
  return currentDate
}
// Get data from firebase fireStore
const getTransactions = async () => {
  const querySnap = await getDocs(query(collection(db, 'transactions')))

  // clear existing data in transactionList
  transactionList.value = []

  // push new data to transactionList
  querySnap.forEach((doc) => {
    transactionList.value.push(doc.data())
  })
}
onMounted(() => {
  getTransactions();
})
// Delete data from firebase fireStore
const deleteTransaction = async (id) => {
  await deleteDoc(doc(db, 'transactions', String(id)))
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
const handleSubmit = async (text, amount) => {
  if (!text || !amount) {
    toast.error('Please fill all filed', {
      autoClose: 2000
    })
  } else {
    await saveTransaction(text, amount, randomID())
    toast.success('New transaction is add', {
      autoClose: 2000
    })
  }
  await getTransactions()
}

// randomID
const randomID = () => {
  return Math.floor(Math.random() * 1000000)
}

// delete selected transaction
const handleDelete = async (id) => {
  toast.success('Delete transaction', {
    autoClose: 2000
  })
  await deleteTransaction(id)
  await getTransactions()
}


</script>