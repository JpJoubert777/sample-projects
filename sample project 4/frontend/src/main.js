import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import firebase from "firebase/app"
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import IdleVue from "idle-vue";

Vue.use(VueMaterial);
Vue.use(firebase) 
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

  
const eventsHub = new Vue();

  Vue.use(IdleVue, {
    eventEmitter: eventsHub,
    store,
    idleTime: 900 * 1000 , // 15 minutes
    startAtIdle: false
  });



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCiXZGVA7NZPEl2zgepli6ghNGT_fbLl1I",
    authDomain: "sample-project-4-9e45a.firebaseapp.com",
    projectId: "sample-project-4-9e45a",
    storageBucket: "sample-project-4-9e45a.appspot.com",
    messagingSenderId: "1026275280658",
    appId: "1:1026275280658:web:180287474c27a0701ad5cb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let app;

  firebase.auth().onAuthStateChanged(user => {
    if (!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App)
        }).$mount('#app')
      
    }
  })

