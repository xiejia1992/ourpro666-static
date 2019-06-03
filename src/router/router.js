import Vue from 'vue';
import Router from 'vue-router';

import PagesView from '../views/pagesView.vue';
import HomeView from '../views/homeView.vue';
import SwitcherView from '../views/switcherView.vue';

import LoginView from '../views/loginView.vue';
import RegisterView from '../views/registerView.vue';
import ForgetView from '../views/forgetView.vue';
import ResetpassView from '../views/resetpassView.vue';
console.log(RegisterView)
Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			redirect: '/pages/'
		},
		{
			path: '/pages',
			component: PagesView,
			children: [{
					path: '',
					redirect: '/pages/home'
				},
				{
					path: 'home',
					name: 'HomeView',
					component: HomeView
				},
				{
					path: 'switch',
					name: 'SwitcherView',
					component: SwitcherView
				},

			]
		},
		{
			path: '/login',
			name: 'LoginView',
			component: LoginView
		},
		{
			path: '/register',
			name: 'RegisterView',
			component: RegisterView
		},
		{
			path: '/forget',
			name: 'ForgetView',
			component: ForgetView
		},
		{
			path: '/resetpass',
			name: 'ResetpassView',
			component: ResetpassView
		},
		{
			path: '*',
			redirect: '/pages/'
		}

	]
});
/*router.beforeEach((to, from, next) => {
	if(to.path === '/login') {
		next();
	} else if(to.path === '/register') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');

		if(token === 'null' || token === '') {
			next('/login');
		} else {
			next();
		}
	}
});*/
export default router;