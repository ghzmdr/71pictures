import { Events } from 'backbone';
import { extend, bindAll } from 'underscore';

class Scroll {
	constructor() {
		extend(this, Events);

		bindAll(this, '_scrollHandler');

		this._setScroll();

		window.addEventListener('scroll', this._scrollHandler, {passive: true});
	}

	scrollY() {
		return this._scrollY;
	}

	scrollX() {
		return this._scrollX;
	}

	_setScroll() {
		this._scrollY = window.scrollY;
		this._scrollX = window.scrollX;
	}

	_scrollHandler(e) {
		this._setScroll();
		this.trigger('scroll', {x: this._scrollX, y: this._scrollY});
	}
}

export default new Scroll();