import Vue from 'vue'
import taskApp from './App.vue'
import axios from 'axios'

// Vue.use(axios)


new Vue({
  el: '#taskApp',
  render: h => h(taskApp)
})
