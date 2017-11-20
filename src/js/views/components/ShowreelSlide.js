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
        this._transitionInTimline = new TimelineLite();

        this._transitionInTimline.set(this.el, {zIndex: 1, autoAlpha: 1});

        this._transitionInTimline.add(() => this.el.classList.add('is-masked'));
        this._transitionInTimline.fromTo(this.el, 0.7, {autoAlpha: 0, ease: Power2.easeinOut, force3D: true}, {autoAlpha: 1, x:'0%'});
        this._transitionInTimline.add(() => this.el.classList.remove('is-masked'));

        // this._transitionInTimline.from(this.ui.title, 0.4, {y:'2rem'}, 0.9);
        // this._transitionInTimline.from(this.ui.title, 0.35, {opacity: 0}, 0.95);

        // this._transitionInTimline.from(this.ui.excerpt, 0.5, {opacity: 0}, 0.8);
    },

    _createTransitionOutTimline: function () {
        this._transitionOutTimline = new TimelineLite();

        this._transitionOutTimline.set(this.el, {zIndex: 0});

        this._transitionOutTimline.add(() => this.el.classList.add('is-masked'));
        this._transitionOutTimline.to(this.el, 0.7, {autoAlpha: 0, ease: Power2.easeinOut, force3D: true}, 0.4);

        // this._transitionOutTimline.to(this.ui.title, 0.4, {y:'-2rem'}, 0.9);
        // this._transitionOutTimline.to(this.ui.title, 0.35, {opacity: 0}, 0.95);

        // this._transitionOutTimline.to(this.ui.excerpt, 0.5, {opacity: 0}, 0.8);
    }

});
