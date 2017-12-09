import Size from 'lib/Size';
import { View } from 'lib/View';
import { TweenLite } from 'gsap';

import FlexibleContent from 'views/components/FlexibleContent';

const VisualsPage = View.extend({

    components: {
        content: {type: FlexibleContent, selector: '.js-flexible-content'}
    },

    transitionIn: function() {
        TweenLite.fromTo(this.el, 0.4, {autoAlpha: 1}, {autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {opacity: 0, onComplete: cb})
    }


})

export default VisualsPage;
