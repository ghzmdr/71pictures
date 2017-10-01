import Scroll from '../lib/Scroll';
import Size from '../lib/Size';
import { Events } from 'backbone';
import { isArray, isFunction } from 'underscore';
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

	_isElementIn: function (elementKey, elementIndex) {
		var targetScreenY = Size.innerHeight() / 1.8;
		return Scroll.Y + targetScreenY > this.__uiRects[`${elementKey}${elementIndex !== undefined ? elementIndex : ''}Top`];
	},

	__initializedHandler: function () {
		this.__setUiRects();
	},

	__resizeHandler: function () {
		this.__setUiRects();
	},

	__scrollHandler: function (e) {
		for (var k in this.__uiKeys) {
			var key = this.__uiKeys[k];
			var item = this.ui[key];

			if (isArray(item)) {
				if (!this.__triggeredElements[key]) this.__triggeredElements[key] = [];
				item.forEach((item, index) => {
					if (this._isElementIn(key) && !(this.__triggeredElements[key][index])) {
						if (isFunction(this[`${key}Visible`])) this[`${key}Visible`](item);
						this.__triggeredElements[key][index] = true;
					}
				})
			} else {
				if (this._isElementIn(key) && !(this.__triggeredElements[key])) {
					if (isFunction(this[`${key}Visible`])) this[`${key}Visible`](item);
					this.__triggeredElements[key] = true;
				}
			} 
		}

		if (isFunction(this.onScroll)) { 
			this.onScroll(e);
		}
	}
}