import { isFunction } from 'underscore';

export default class Region {
	constructor(selector) {
		this.el = document.querySelector(selector);
	}

	show(NextView, options) {
		if (this._currentView && this._currentView.constructor === NextView) return;

		var nextView = new NextView(options);
		var isAttached = false;
		const attach = () => {
			if (!isAttached) {
				isAttached = true;
				this.el.appendChild(nextView.el);
				nextView.trigger('attached');
			}
		}

		const transitionIn = () => {
			if (isFunction(nextView.transitionIn)) nextView.transitionIn();
			this._currentView = nextView;
		}

		const transitionOutCallback = () => {

		 	this._currentView.remove();

			attach();
			transitionIn();
		}

		if (isFunction(nextView.immediateTransitionIn)) {
			attach();
			nextView.immediateTransitionIn();
		}		

		if (this._currentView) {
			if (isFunction(this._currentView.transitionOut)) {
				this._currentView.transitionOut(transitionOutCallback);
			} else transitionOutCallback();
		} else {			
			attach();
			transitionIn();
		}
	}
}