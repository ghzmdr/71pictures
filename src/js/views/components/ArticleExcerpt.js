import { View } from 'lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template, bindAll } from 'lodash';

import ExploreButton from 'views/components/ExploreButton';

const ArticleExcerpt = View.extend({

    ui: {
        image: '.js-image',
        link: '.js-link',
        panel: '.js-panel'
    },

    components: {
        buttonExplore: {type: ExploreButton, selector: '.js-button'}
    },

    onClose: function () {
        this._removeListeners();
    },

    initialize: function (options) {

        bindAll(this, '_mouseEnterHandler', '_mouseLeaveHandler');
        this._template(options);
        this._addListeners();
    },

    onInitialized: function () {
        this.el.style.opacity = 0;
    },

    transitionIn: function () {
        TweenLite.to(this.el, 0.4, {ease: Power0.easeNone, autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.4, {ease: Power0.easeNone, autoAlpha: 0, onComplete: cb});
    },

    _addListeners: function () {
        this.el.addEventListener('mouseenter', this._mouseEnterHandler);
        this.el.addEventListener('mouseleave', this._mouseLeaveHandler);
    },

    _removeListeners: function () {
        this.el.removeEventListener('mouseenter', this._mouseEnterHandler);
        this.el.removeEventListener('mouseleave', this._mouseLeaveHandler);
    },

    _createTimelineHover: function () {
        this._timelineHover = new TimelineLite();
        this._timelineHover.to(this.ui.panel, 0.7, {scaleX: 1.2, ease: Power3.easeInOut})
        this._timelineHover.to(this.ui.image, 0.7, {x: '-5%', ease: Power3.easeInOut}, 0)
        this._timelineHover.to(this.ui.link, 0.6, {x: '-7%', ease: Power3.easeInOut}, 0.2)
    },

    _mouseEnterHandler: function () {
        if (!this._timelineHover) this._createTimelineHover();
        this._timelineHover.play();
    },

    _mouseLeaveHandler: function () {
        this._timelineHover.reverse();
    },

    //this should happen in the library
    _template: function (options) {
        var compiledTemplate = template(options.template);
        var html = compiledTemplate(options.model.attributes);
        var element = document.createElement('div');
        element.innerHTML = html;
        this.setElement(element.firstElementChild);
    }


});

export default ArticleExcerpt;
