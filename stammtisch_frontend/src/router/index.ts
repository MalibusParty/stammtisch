import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
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
    }
  ],
});

router.beforeEach(async(to, from) => {
  if ((!authState.loggedIn || authState.token === '')  && to.name !== 'login') {
    return { name: 'login' };
  }
});

export default router
