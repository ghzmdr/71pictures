import $ from 'jquery';
import { View as BackboneView } from 'backbone';
import { isFunction } from 'underscore';

const _viewInitialize = function (options) {
	if (isFunction(this._initialize)) this._initialize(options || {});
	
	if (this.ui) {
		var ui = Object.assign({}, this.ui);
		Object.keys(ui).forEach(key => { ui[key] = $(options.el).find(ui[key])} );
		this.ui = ui;
	}

	if (this.components) {
		var components = Object.assign({}, this.components);
		Object.keys(components).forEach(key => { components[key] = _initComponents(options.el, components[key])} );
		this.components = components;
	}

	if (isFunction(this._onInitialized)) this._onInitialized();
}

const _initComponents = function (parentElement, component) {
	var components = [];

	$(parentElement).find(component.selector).each((index, element) => {
		var options = Object.assign({el: $(element)}, component.options || {});
		components.push(new component.type(options));
	})

	return components.length < 2 ? components[0] : components;
}

const View = {
	extend: function(child) {
		var ViewClass = BackboneView.extend(child);
		ViewClass.prototype.initialize = _viewInitialize;
		return ViewClass;
	}
}

export { View };