import { View } from 'lib/View';
import { TweenLite } from 'gsap';
import Showreel from 'views/components/showreel/Showreel';


const HomePage = View.extend({

    components: {
        showreel: {selector: '.js-showreel', type: Showreel}
    },

    transitionIn: function() {
        TweenLite.to(this.el, 0.4, {opacity: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {opacity: 0, onComplete: cb})
    }

})

export default HomePage;
