import { View } from '../../lib/View';
import { TweenLite } from 'gsap';

export default View.extend({

    events: {
        'click': function () {
            this.trigger('click');
        }
    },

    activate: function () {
        TweenLite.to(this.el, 0.3, {scale: 1.3});
    },

    deactivate: function () {
        TweenLite.to(this.el, 0.3, {scale: 1});
    }

});
