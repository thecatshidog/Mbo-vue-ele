import Vue from 'vue';
import Router from 'vue-router';

import goods from '@/pages/Goods/index.vue';
import ratings from '@/pages/Ratings/index.vue';
import seller from '@/pages/Seller/index.vue';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: './goods',
}, {
  path: '/goods',
  component: goods,
}, {
  path: '/seller',
  component: seller,
}, {
  path: '/ratings',
  component: ratings,
}];

export default new Router({
  linkActiveClass: 'active',
  routes,
});
