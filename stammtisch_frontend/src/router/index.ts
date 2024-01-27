import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import DrinksView from '@/views/DrinksView.vue';
import CreateView from '@/views/CreateView.vue';
import { useLogin } from '@/stores/loginStore';

const { authState } = useLogin();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/drinks',
      name: 'drinks',
      component: DrinksView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    }
  ],
});

router.beforeEach(async(to, from) => {
  if ((!authState.loggedIn || authState.token === '')  && to.name !== 'login') {
    return { name: 'login' };
  } else if (to.name === 'create' && authState.username !== 'febe94') {
    return { name: 'home' }
  }
});

export default router
