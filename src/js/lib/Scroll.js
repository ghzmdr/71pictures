import { Events } from 'backbone';
import { extend, bindAll } from 'underscore';
import Size from '../lib/Size';

class Scroll {
	constructor() {
		extend(this, Events);

		bindAll(this, '_scrollHandler');

		this._setAndTrigger();

		window.addEventListener('scroll', this._scrollHandler, {passive: true});
		this.listenTo(Size, 'resize:complete', this._resizeCompleteHandler);
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

	_setAndTrigger() {
		this._setScroll();
		const viewports = this._scrollY / Size.innerHeight();
		this.trigger('scroll', {x: this._scrollX, y: this._scrollY, viewports });
	}

	_scrollHandler(e) {
		this._setAndTrigger();
	}

	_resizeCompleteHandler() {
		this._setAndTrigger();
	}
}

export default new Scroll();