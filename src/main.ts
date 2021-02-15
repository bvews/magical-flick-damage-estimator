import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import MagicalFlickDamageEstimator from './MagicalFlickDamageEstimator.vue';

Vue.use(VueCompositionApi);
Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(MagicalFlickDamageEstimator),
}).$mount('#app');




