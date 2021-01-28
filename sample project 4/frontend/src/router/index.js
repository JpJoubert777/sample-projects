import Vue from 'vue'
import VueRouter from 'vue-router'
import Secret from '../views/Secret.vue'
import Register from '../views/Register.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [

  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/secret',
    name: 'secret',
    component: Secret,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=> {
  const requiresAuth = to.matched.some(record=>record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated){
    next("/login");
  } else {
    next();
  }
})
export default router
