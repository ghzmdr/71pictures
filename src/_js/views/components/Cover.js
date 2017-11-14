import { View } from '../../lib/View';
import { bindAll } from 'underscore';
import { TweenLite, TimelineLite } from 'gsap';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';

import logoAnimation from '../../animations/logo';

const Cover = View.extend({

    ui: {
        logo: '.js-logo',
        image: '.js-image',
        logoLetters: '.js-logo-letter',
        logoPieces: '.js-logo-piece'
    },

    onInitialized: function () {
        this.transitionIn();

        this.listenTo(Scroll, 'scroll', this._scrollHandler);
        this.listenTo(Size, 'resize', this._resizeHandler);
        this._setProgressFromScroll();

    },

    transitionIn: function () {

        logoAnimation(this.ui.logoPieces, this.ui.logoLetters);

    },

    _setProgressFromScroll: function () {
        if (!this._parallaxTimeline) this._createParallaxTimeline();
        var progress = Math.min(Math.max(Scroll.Y / Size.innerHeight(), 0), 1);
        this._parallaxTimeline.progress(progress);

    },

    _createParallaxTimeline: function () {
        if (this._parallaxTimeline) this._killParallaxTimeline();

        const logoTimeline = logoAnimation(this.ui.logoPieces, this.ui.logoLetters);

        this._parallaxTimeline = new TimelineLite({paused: true});
        this._parallaxTimeline.fromTo(this.ui.image, logoTimeline.totalDuration(), {y: 0}, {y: Size.innerHeight() * -0.1, ease: Power2.easeOut}, 0);
        this._parallaxTimeline.add(logoTimeline.reverse(), 0);
        this._parallaxTimeline.fromTo(this.ui.logo, logoTimeline.totalDuration(), {y: '0%'}, {y: Size.innerHeight() * -0.2, ease: Power2.easeOut}, 0)
   },

    _killParallaxTimeline: function () {
        this._parallaxTimeline.stop();
        this._parallaxTimeline.kill();
        this._parallaxTimeline = null;
    },

    _resizeHandler: function () {
        this._createParallaxTimeline();
        this._setProgressFromScroll();
    },

    _scrollHandler: function (e) {
        this._setProgressFromScroll();
    }
})

export default Cover;
