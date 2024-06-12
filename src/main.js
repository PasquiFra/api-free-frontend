import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'

//Import router
import { router } from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
