import { View } from '../../lib/View';
import { TweenLite } from 'gsap';

const AboutPage = View.extend({

    transitionIn: function() {
        TweenLite.fromTo(this.el, 0.4, {autoAlpha: 1}, {autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {opacity: 0, onComplete: cb})
    }

})

export default AboutPage;
