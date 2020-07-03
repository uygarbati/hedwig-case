import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import firebase from 'firebase/app'
import './assets/style/app.scss'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCppGfF5mnwnZgAFfpf6xJlRMzfVeItXzI",
  authDomain: "dummy-frontend-project.firebaseapp.com",
  databaseURL: "https://dummy-frontend-project.firebaseio.com",
  projectId: "dummy-frontend-project",
  storageBucket: "dummy-frontend-project.appspot.com",
  messagingSenderId: "909596530093",
  appId: "1:909596530093:web:427d61d903a65e4141fd24"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
