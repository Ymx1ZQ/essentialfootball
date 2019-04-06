import './styles.scss'
import Vue from 'vue'
import Router from 'vue-router'
import App from './app.vue'
import BootstrapVue from 'bootstrap-vue'
import {routes} from './routes'

Vue.use(BootstrapVue)
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: '',
    routes
});

const VueApp = new Vue({
	el: '#app',
	template: '<app/>',
	components: {
		App
	},
	router: router
});