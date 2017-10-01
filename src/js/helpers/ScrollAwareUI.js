import Scroll from '../lib/Scroll';
import Size from '../lib/Size';
import { Events } from 'backbone';
import { isFunction } from 'underscore';
import { offsetTop } from '../utils/DOM';

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
			this.__uiRects[`${key}Top`] = offsetTop(this.ui[key]);
		}
	},

	_isElementIn: function (elementKey) {
		var targetScreenY = Size.innerHeight() / 1.8;
		return Scroll.scrollY() + targetScreenY > this.__uiRects[`${elementKey}Top`];
	},


	__initializedHandler: function () {
		this.__setUiRects();
	},

	__resizeHandler: function () {
		this.__setUiRects();
	},

	__scrollHandler: function () {
		for (var k in this.__uiKeys) {
			var key = this.__uiKeys[k];
			if (this._isElementIn(key) && !(this.__triggeredElements[key])) {
				if (isFunction(this[`${key}Visible`])) this[`${key}Visible`]();
				this.__triggeredElements[key] = true;
			}
		}
	}
}