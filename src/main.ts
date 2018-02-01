// import request from './utils/request';
import 'normalize.css';
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import './styles/index.scss';
import setRem from './utils/rem';

setRem();

// Vue.use(request, axios);

new Vue({
  el: '#app',
  components: {
    App,
  },
  router,
  render: h => h(App),
});
