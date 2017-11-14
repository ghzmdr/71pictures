import { Model } from 'backbone';

const ApplicationStrore = Model.extend({
    defaults: {
        isMenuVisible: false
    },

    initialize: function () {
        this.on('change', () => console.log('[ApplicationStore]{change} : ', this.attributes));
    }
})


export default new ApplicationStrore();
