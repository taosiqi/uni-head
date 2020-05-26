import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'CN',
    messages: {
        'CN': require('../../lang/cn'),
        'EN': require('../../lang/en')
    }
});
export default i18n