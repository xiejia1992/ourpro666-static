import Vue from 'vue';
import Router from 'vue-router';

import PagesView from '../views/pagesView.vue';
import HomeView from '../views/homeView.vue';
import SwitcherView from '../views/switcherView.vue';

import LoginView from '../views/loginView.vue';

Vue.use(Router)

export default new Router({
 	routes:[
 		{
 			path:'/',
		 	redirect: '/pages/'
 		},
 		{
 			path:'/pages',
 			component:PagesView,
 			children:[
 				{
 					path:'',
 					redirect:'/pages/home'
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
 			path:'/login',
 			name:'LoginView',
 			component:LoginView
 		},
 		{
	      path: '*',
	      redirect: '/pages/'
	    }
 		
 	]
})

