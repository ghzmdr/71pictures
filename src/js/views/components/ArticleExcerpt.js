import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template, bindAll } from 'lodash';

import ExploreButton from './ExploreButton';

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

    _mouseEnterHandler: function () {
        TweenLite.to(this.ui.panel, 0.3, {scaleX: 1.2})
        TweenLite.to(this.ui.image, 0.3, {x: '-5%'})
    },

    _mouseLeaveHandler: function () {
        TweenLite.to(this.ui.panel, 0.3, {scaleX: 1})
        TweenLite.to(this.ui.image, 0.3, {x: '0%'})
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
