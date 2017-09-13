import { isFunction } from 'underscore';

export default class Region {
	constructor(selector) {
		this.el = document.querySelector(selector);
	}

	show(NextView, options) {
		if (this._currentView && this._currentView.constructor === NextView) return;

		const swapView = () => {
			if (this._currentView) {
			 	if (isFunction(this._currentView.close)) this._currentView.close();
				this.el.removeChild(this._currentView.el);

				this.el.appendChild(options.el);
				this._currentView = new NextView(options);
				this._currentView.trigger('attached');

				if (this._currentView.transitionIn) this._currentView.transitionIn();
			}
		}

		if (this._currentView) {
			if (this._currentView.transitionOut) {
				this._currentView.transitionOut(swapView);
			} else {
				swapView();
			}
		} else {
			var nextView = new NextView(options);
			this._currentView = nextView;
			this._currentView.trigger('attached');
			if (this._currentView.transitionIn) this._currentView.transitionIn();
		}
	}
}