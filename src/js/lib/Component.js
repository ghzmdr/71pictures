import $ from 'jquery';
import { View as BackboneView } from 'backbone';
import { isFunction } from 'underscore';

const _componentInitialize = function (options) {
	if (isFunction(this._initialize)) this._initialize(options || {});

	if (this.ui) {
		var ui = Object.assign({}, this.ui);
		Object.keys(ui).forEach(key => { ui[key] = $(options.el).find(ui[key])} );
		this.ui = ui;
	}
	
	if (isFunction(this._onInitialized)) this._onInitialized();
}

const Component = {
	extend: function(child) {
		var view = BackboneView.extend(child);
		view.prototype.initialize = _componentInitialize;
		return view;
	}
}

export { Component };