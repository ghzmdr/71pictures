import { View } from '../../lib/View';
import { TweenLite } from 'gsap';

export default View.extend({

    ui: {
        image: '.js-image',
        title: '.js-title',
        excerpt: '.js-excerpt'
    },

    onClose: function () {
        if (this._transitionInTimline) this._transitionInTimline.kill();
        if (this._transitionOutTimline) this._transitionOutTimline.kill();
    },

    transitionOut: function() {
        if (!this._transitionOutTimline) this._createTransitionOutTimline();
        return this._transitionOutTimline;
    },

    transitionIn: function() {
        if (!this._transitionInTimline) this._createTransitionInTimline();
        return this._transitionInTimline;
    },

    _createTransitionInTimline: function () {
        this._transitionInTimline = new TimelineLite({delay: 0.4});

        this._transitionInTimline.set(this.el, {zIndex: 1, autoAlpha: 1});

        this._transitionInTimline.fromTo(this.el, 0.7, {x:'-100%', ease: Power2.easeinOut, force3D: true}, {x:'0%'});
        this._transitionInTimline.to(this.ui.image, 0.4, {scale: 1, ease: Power2.easeInOut});

        // this._transitionInTimline.from(this.ui.title, 0.4, {y:'2rem'}, 0.9);
        // this._transitionInTimline.from(this.ui.title, 0.35, {opacity: 0}, 0.95);

        // this._transitionInTimline.from(this.ui.excerpt, 0.5, {opacity: 0}, 0.8);
    },

    _createTransitionOutTimline: function () {
        this._transitionOutTimline = new TimelineLite();

        this._transitionOutTimline.set(this.el, {zIndex: 0});

        this._transitionOutTimline.to(this.ui.image, 0.4, {scale: 0.9, ease: Power2.easeInOut});
        this._transitionOutTimline.to(this.el, 0.7, {x:'100%', ease: Power2.easeinOut, force3D: true});

        // this._transitionOutTimline.to(this.ui.title, 0.4, {y:'-2rem'}, 0.9);
        // this._transitionOutTimline.to(this.ui.title, 0.35, {opacity: 0}, 0.95);

        // this._transitionOutTimline.to(this.ui.excerpt, 0.5, {opacity: 0}, 0.8);
    }

});
