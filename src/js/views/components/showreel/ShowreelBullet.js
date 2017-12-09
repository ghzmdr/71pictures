import { View } from 'lib/View';
import { TweenLite } from 'gsap';

export default View.extend({

    events: {
        'click': function () {
            this.trigger('click');
        }
    },

    big: function () {
        TweenLite.to(this.el, 0.3, {scale: 1.3});
        this.el.disabled = false;
    },

    normal: function () {
        TweenLite.to(this.el, 0.3, {scale: 1});
        this.el.disabled = false;
    },

    shrunk: function () {
        TweenLite.to(this.el, 0.3, {scale: 0.7});
        this.el.disabled = true;
    }

});
