import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import Add from '@/components/Add.vue';
import Update from '@/components/Update.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/update/:id',
      name: 'update',
      component: Update
    }
  ]
})

export default router
