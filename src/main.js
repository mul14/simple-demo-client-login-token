import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Authorization'] = Cookies.get('token')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


new Vue({
  render: h => h(App)
}).$mount('#app')
