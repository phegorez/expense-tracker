import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Toastify from 'vue3-toastify'

const app = createApp(App).mount('#app')

app.use(Toastify, {
    autoClose: 3000,
});