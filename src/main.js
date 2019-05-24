import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '../src/router/router.js'

Vue.use(ElementUI,{router:router});

var app=new Vue({
    el:'#app',
    router,
    template: '<App/>',
    components: { App }
});
