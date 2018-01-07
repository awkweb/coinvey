import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Claim from '@/pages/claim';
import ClaimSuccess from '@/pages/claim/claim-success';
import Home from '@/pages/home';
import HomeIndex from '@/pages/home/home-index';
import HomeFaq from '@/pages/home/home-faq';
import HomeHow from '@/pages/home/home-how';
import NotFound from '@/pages/not-found';
import Send from '@/pages/send';
import SendInfo from '@/pages/send/send-info';
import SendPayment from '@/pages/send/send-payment';
import SendReview from '@/pages/send/send-review';
import SendSuccess from '@/pages/send/send-success';

Vue.use(Router);
Vue.use(Meta);


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '', name: 'HomeIndex', component: HomeIndex },
        { path: 'faq', name: 'HomeFaq', component: HomeFaq },
        { path: 'how', name: 'HomeHow', component: HomeHow },
      ],
    },
    { path: '/claim/:hash', name: 'Claim', component: Claim },
    { path: '/claim/:hash/success', name: 'ClaimSuccess', component: ClaimSuccess },
    {
      path: '/send/:coinId',
      component: Send,
      children: [
        { path: '', name: 'SendInfo', component: SendInfo },
        { path: 'pay', name: 'SendPayment', component: SendPayment },
        { path: 'review', name: 'SendReview', component: SendReview },
      ],
    },
    { path: '/send/:coinId/success', name: 'SendSuccess', component: SendSuccess },
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

router.beforeEach((to, from, next) => {
  const SEND_ROUTE_NAMES = [
    'Send',
    'SendInfo',
    'SendPayment',
    'SendReview',
  ];
  if (Object.keys(to.params).length > 0 && SEND_ROUTE_NAMES.includes(to.name)) {
    const COIN_IDS = [
      'btc',
      'eth',
      'ltc',
    ];
    if ('coinId' in to.params && COIN_IDS.includes(to.params.coinId)) {
      next();
    } else {
      next({ name: 'HomeIndex' });
    }
  } else {
    next();
  }
});

export default router;
