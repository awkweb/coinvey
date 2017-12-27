import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import Checkout from '@/pages/checkout';
import CheckoutInfo from '@/pages/checkout/checkout-info';
import CheckoutPayment from '@/pages/checkout/checkout-payment';
import CheckoutReview from '@/pages/checkout/checkout-review';
import Success from '@/pages/success';
import NotFound from '@/pages/not-found';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    {
      path: '/:coinId',
      component: Checkout,
      children: [
        { path: '', name: 'CheckoutInfo', component: CheckoutInfo },
        { path: 'pay', name: 'CheckoutPayment', component: CheckoutPayment },
        { path: 'review', name: 'CheckoutReview', component: CheckoutReview },
      ],
    },
    { path: '/success', name: 'Success', component: Success },
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
