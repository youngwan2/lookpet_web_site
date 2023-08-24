import { createApp } from 'vue'
import App from './App.vue'
import VueCryptojs from 'vue-cryptojs' // 프론트에서의 암호화
import router from './router'

const app = createApp(App)
app.use(router)
app.use(VueCryptojs)
app.mount('#app')
