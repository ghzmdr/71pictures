import { View } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import Size from '../../lib/Size';
import { offsetTop } from '../../utils/DOM';
import { TweenLite } from 'gsap';
import Carousel from '../components/Carousel';
import ParallaxPoster from '../components/ParallaxPoster';

const NTSCPage = View.extend({

    ui: {
        title: '.js-page-title',
        subtitle: '.js-page-subtitle',
        intro: '.js-ntsc-intro',
        poster: '.js-parallax-poster',
        carousel: '.js-carousel'
    },

    components: {

        carousel: {selector: '.js-carousel', type: Carousel},
        parallaxPoster: {selector: '.js-parallax-poster', type: ParallaxPoster}

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

    introVisible: function () {
        var delay = 0.8;
        Array.from(this.ui.intro.children).forEach((item, index) => {
            delay += index * 0.2;
            TweenLite.to(item, 0.8, {opacity: 1, delay});
        })
    },

    posterVisible: function (poster) {

        TweenLite.to(this.ui.poster, 1, {opacity: 1, delay: 0.5});
        TweenLite.from(this.ui.poster, 1, {y: '30%', delay: 0.45, ease: Circ.easeOut});

    },

    carouselVisible: function(carousel) {
        TweenLite.to(carousel, 0.8, {opacity: 1, delay: 0.3});
    },

    transitionOut(callback) {
        TweenLite.to(this.el.children, 0.3, {opacity: 0, onComplete: callback})
    }
})

export default NTSCPage;
