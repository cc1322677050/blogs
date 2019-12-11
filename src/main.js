// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/index.scss'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/permission' // permission control

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(ElementUI, {locale})
//导入markdown组件
Vue.use(mavonEditor);
Vue.config.productionTip = false
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
