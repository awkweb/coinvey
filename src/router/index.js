import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Checkout from '@/pages/checkout';
import NotFound from '@/pages/not-found';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/:coinId', name: 'Checkout', component: Checkout },
    { path: '*', name: 'NotFound', component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    let nextPosition;
    if (savedPosition) {
      nextPosition = savedPosition;
    } else {
      nextPosition = { x: 0, y: 0 };
    }
    return nextPosition;
  },
});

export default router;
