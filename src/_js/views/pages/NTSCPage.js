import Backbone from 'backbone';
import { View } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';
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

    onInitialized: function () {
        this.listenTo(Scroll, 'scroll', this._scrollHandler);
    },

    titleVisible: function () {
        TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
        TweenLite.from(this.ui.title, 0.6, {y: '20%', delay: 0.1, ease: Circ.easeOut});
        TweenLite.to(this.ui.subtitle, 0.8, {opacity: 1, delay: 0.8});

        TweenLite.to(this.ui.intro, 0.8, {opacity: 1, delay: 1.2});
    },

    introVisible: function () {
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
    },

    _scrollHandler: function () {
        // if (Scroll.Y >= offsetTop(this.el)) {
        //     Backbone.history.navigate('/ntsc', { trigger: false });
        // } else {
        //     Backbone.history.navigate('/', { trigger: false });
        // }
    }
})

export default NTSCPage;
