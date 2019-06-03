import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var navBar = [{
		'name': 'HomeView',
		'index': '1',
		'title': '首页'
	}
]
const store = new Vuex.Store({
	state: {
		// 存储token
		Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
		nav: navBar
	},
	mutations: {
		// 修改token，并将token存入localStorage
		changeLogin(state, user) {
			state.Authorization = user.Authorization;
			localStorage.setItem('Authorization', user.Authorization);
		}
	}
});

export default store;