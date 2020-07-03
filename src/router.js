import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Dashboard from './views/Dashboard'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router)

const routes =  [
  {
    path: '*',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth : true }
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/signin");
  } else {
    next()
  }
});

export default router
