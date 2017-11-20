import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template, bindAll } from 'lodash';

const Article = View.extend({

    ui: {
        image: '.js-image',
        title: '.js-title',
        copy: '.js-copy'
    },

    initialize: function (options) {
        bindAll(this, '_mouseInHandler', '_mouseOutHandler');

        var compiledTemplate = template(options.template);
        var html = compiledTemplate(options.model.attributes);
        var element = document.createElement('div');
        element.innerHTML = html;
        this.setElement(element.firstElementChild);
    },

    onClose: function () {
        console.log('onclose called');
        this.el.removeEventListener('mouseenter', this._mouseInHandler);
        this.el.removeEventListener('mouseleave', this._mouseOutHandler);
    },

    onInitialized: function () {
        this.el.addEventListener('mouseenter', this._mouseInHandler);
        this.el.addEventListener('mouseleave', this._mouseOutHandler);
    },

    transitionIn: function () {
        TweenLite.to(this.el, 0.3, {autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {autoAlpha: 0, onComplete: cb});
    },

    _createTimelineHover: function () {
        this._timelineHover = new TimelineLite({paused: true});
        // this._timelineHover.to(this.el, 0.4, {y: '-2%', ease: Power2.easeInOut});
    },

    _mouseInHandler: function () {
        this._isMouseOver = true;
        if (!this._timelineHover) this._createTimelineHover();
        this._timelineHover.play();
    },

    _mouseOutHandler: function () {
        this._isMouseOver = false;
        this._timelineHover.reverse();
    }

});

export default Article;
