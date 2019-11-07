import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Api from '@/services/ApiService'
import VShowSlide from 'v-show-slide'

Vue.prototype.$api = Api
Vue.config.productionTip = false;

Vue.use(VShowSlide)

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
