import './styles.scss'
import Vue from 'vue'
import App from './app.vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

const VueApp = new Vue({
	el: '#app',
	template: '<app/>',
	components: {
		App
	}
});