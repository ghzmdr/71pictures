import { bindAll, debounce, extend } from 'underscore';
import { Events } from 'backbone';

class Size {
	constructor() {
		extend(this, Events);

		bindAll(this, '_resizeHandler', '_resizeDebounceHandler');

		window.addEventListener('resize', this._resizeHandler);
		window.addEventListener('resize', debounce(this._resizeDebounceHandler, 100), {passive: true});

		this._setSizes();
		this.trigger('resize')
	}

	_setSizes() {

		this._width = window.innerWidth;
		this._height = window.innerHeight;

	}

	_resizeHandler(e) {
		this._setSizes();
		this.trigger('resize');
	}

	_resizeDebounceHandler() {
		this.trigger('resize:complete');
	}

	innerWidth() {
		return this._width;
	}

	innerHeight() {
		return this._height;
	}
}

export default new Size();