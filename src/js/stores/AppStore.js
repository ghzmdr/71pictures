import { Model } from 'backbone';

const AppStore = Model.extend({
    defaults: {
        isMenuVisible: false
    },

    initialize: function () {
        this.on('change', () => console.log('[ApplicationStore]{change} : ', this.attributes));
    }
})

const appStore = new AppStore();
export default appStore;
