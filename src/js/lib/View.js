import $ from 'jquery';
import { View as BackboneView } from 'backbone';
import { isFunction, isArray } from 'underscore';

const _viewInitialize = function () {
	
	if (this.ui) {

		var ui = Object.assign({}, this.ui);
		Object.keys(ui).forEach(key => ui[key] = this.$(ui[key]) );
		this.ui = ui;

	}

	if (this.components) {

		var components = Object.assign({}, this.components);
		Object.keys(components).forEach((key) => components[key] = _initComponents(this.$el, components[key]));
		this.components = components;

	}

	if (isFunction(this.onInitialized)) this.onInitialized();
}

const _initComponents = function ($parentElement, component) {
	var components = [];

	$parentElement.find(component.selector).each((index, element) => {
		var options = Object.assign({el: $(element)}, component.options || {});
		components.push(new component.type(options));
	})

	return components.length < 2 ? components[0] : components;
}

const View = {
	extend: function(child) {
		var ViewClass = BackboneView.extend(child);
		var originalInitialize = ViewClass.prototype.initialize;
		
		ViewClass.prototype.initialize = function() {

			originalInitialize.apply(this, arguments);
			this.listenToOnce(this, 'attached', () => {
				
				_viewInitialize.apply(this);
				if (this.components) Object.keys(this.components).forEach((key) => {
					
					if (isArray(this.components[key])) 
						this.components[key].forEach(c => c.trigger('attached'));
					else 
						this.components[key].trigger('attached')

				});
			})
		}

		return ViewClass;
	}
}

export { View };