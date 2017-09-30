// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'normalize.css/normalize.css'
import 'zui/dist/css/zui.min.css'
import 'element-ui/lib/theme-default/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/assets/iconfont/iconfont'
import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'


// import Multiselect from 'vue-multiselect'
import IconSvg from '@/components/Icon-svg/index.vue'
import { getToken } from '@/utils/auth'
import $ from 'jquery'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('icon-svg', IconSvg)
// Vue.component('Multiselect', Multiselect)

const whiteList = ['/login', '/test', '/register'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // console.log(store.getters)
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          let menus = res.data
          let roles = store.state.user.roles
          store.dispatch('GenerateRoutesByMenus', roles).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to });
          })
        }).catch( error => {
          next('/');
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
