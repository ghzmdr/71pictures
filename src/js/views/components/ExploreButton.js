
import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template, bindAll } from 'lodash';

const ExploreButton = View.extend({

    ui: {
        arrow: '.js-arrow',
        label: '.js-label'
    },

    onClose: function () {
        this._removeListeners();
    },

    initialize: function (options) {

        bindAll(this, '_mouseEnterHandler', '_mouseLeaveHandler');
        this._addListeners();

    },

    _highlight: function (play) {
        if (!this._timelineHighlight) this._createTimelineHighlight();

        this._timelineHighlight[play ? 'play' : 'reverse']();
    },

    _createTimelineHighlight: function () {
        this._timelineHighlight = new TimelineLite({paused: true});

        this._timelineHighlight.to(this.ui.label, 0.2, {x: -6})
        this._timelineHighlight.to(this.ui.arrow, 0.2, {x: 3, opacity: 1}, 0.05)
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
        this._highlight(true);
    },

    _mouseLeaveHandler: function () {
        this._highlight(false);
    }

});

export default ExploreButton;
