import Scroll from '../lib/Scroll';
import Size from '../lib/Size';
import { Events } from 'backbone';
import { isFunction } from 'underscore';

export default {
	initScrollUI: function() {
		
		this.__uiKeys = Object.keys(this.ui);
		this.__triggeredElements = {};
		this.listenToOnce(this, 'initialized', this.__initializedHandler);
		this.listenTo(Size, 'resize', this.__resizeHandler);
		this.listenTo(Scroll, 'scroll', this.__scrollHandler);
	},

	__setUiRects: function () {
		this.__uiRects = {};
		for (var k in this.__uiKeys) {
			var key = this.__uiKeys[k];
			this.__uiRects[`${key}Top`] = this._offsetTop(this.ui[key]);
		}
	},

	_isElementIn: function (elementKey) {
		var targetScreenY = Size.innerHeight() / 1.8;
		return Scroll.scrollY() + targetScreenY > this.__uiRects[`${elementKey}Top`];
	},

	_offsetTop: function (el) {
		var top = 0;
		do { top += el.offsetTop } 
		while (el = el.offsetParent)

		return top;
	},

	__initializedHandler: function () {
		this.__setUiRects();
	},

	__resizeHandler: function () {
		this._setUiRects();
	},

	__scrollHandler: function () {
		for (var k in this.__uiKeys) {
			var key = this.__uiKeys[k];
			console.log(this._isElementIn(key), !this.__triggeredElements[key])
			if (this._isElementIn(key) && !(this.__triggeredElements[key])) {
				if (isFunction(this[`${key}Visible`])) this[`${key}Visible`]();
				this.__triggeredElements[key] = true;
			}
		}
	}
}