import Vue from "vue";
import "bootstrap"
import App from "./App.vue";
import router from "./router";
import {store} from "./store/store";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component("fa", FontAwesomeIcon)


new Vue({
  store: store,
  router,
  render: (h) => h(App),
}).$mount("#app");

// TODO: add popup after user get redirected to edit videos 
