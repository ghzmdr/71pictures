import { View } from 'lib/View';
import { TweenLite } from 'gsap';

export default View.extend({

    onInitialized: function () {
        TweenLite.set(this.el, {autoAlpha: 0});
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

        this._transitionInTimline.set(this.el, {zIndex: 1});
        this._transitionInTimline.fromTo(this.el, 0.7, {autoAlpha: 0}, {autoAlpha: 1});

    },

    _createTransitionOutTimline: function () {
        this._transitionOutTimline = new TimelineLite();

        this._transitionOutTimline.set(this.el, {zIndex: 0});
        this._transitionOutTimline.to(this.el, 0.7, {autoAlpha: 0}, 0.4);
    }

});
