import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import firebase from "firebase/app"


Vue.use(firebase) 
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

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
    console.log(user);
    if (!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App)
        }).$mount('#app')
      
    }
  })

