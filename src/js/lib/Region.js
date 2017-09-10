import { isFunction } from 'underscore';

export default class Region {
	constructor(selector) {
		this.el = document.querySelector(selector);
	}

	show(NextView, options) {
		if (this._currentView) {
			if (this._currentView.constructor === NextView) return;
		}

		var nextView = new NextView(options);

		var hasTransitionedIn = false;

		const swapView = () => {
			if (this._currentView && isFunction(this._currentView.close)) this._currentView.close();
			this._currentView = nextView;
			if (!hasTransitionedIn && this._currentView.transitionIn) this._currentView.transitionIn();
		}

		if (nextView.immediateTransitionIn) {
			nextView.immediateTransitionIn();
		}

		if (this._currentView) {
			this._currentView.transitionOut(swapView);
		} else {
			swapView();
		}

		return this._currentView;
	}
}