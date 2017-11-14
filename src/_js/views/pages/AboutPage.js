import { View } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import Size from '../../lib/Size';
import { offsetTop } from '../../utils/DOM';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const AboutPage = View.extend({

    ui: {
        title: '.js-page-title',
        subtitle: '.js-page-subtitle'
    },

    initialize: function (options) {
        Object.assign(this, ScrollAwareView);
        this.initScrollUI();
    },

    titleVisible: function () {
        TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
        TweenLite.from(this.ui.title, 0.6, {y: '20%', delay: 0.1, ease: Circ.easeOut});
        TweenLite.to(this.ui.subtitle, 0.8, {opacity: 1, delay: 0.8});
    },

    transitionOut(callback) {
        TweenLite.to(this.el.children, 0.3, {opacity: 0, onComplete: callback})
    }
})

export default AboutPage;
