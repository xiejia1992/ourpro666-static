import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '../src/router/router.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
import rules from '../src/common/rules.js';
import store from '../src/store/store.js';
import '../src/css/common.css';


Vue.prototype.$rules = rules;
Vue.prototype.$ajax = axios;
Vue.prototype.$ajax.interceptors.request.use(
	config => {
		if(localStorage.getItem('Authorization')) {
			config.headers.auth = localStorage.getItem('Authorization');
			//config.headers.auth = localStorage.getItem('Authorization');
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	});

Vue.use(ElementUI);
Vue.use(router);

var app = new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	},
	store: store
});