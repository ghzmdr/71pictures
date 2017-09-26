import NativeView from 'backbone.nativeview'
import { isFunction, isArray, castArray } from 'underscore';


const _oneOrArray = function(arrayLike) {
	return arrayLike.length === 1 ? arrayLike[0] : Array.from(arrayLike);
}

const _initializeView = function () {
	
	if (this.ui) {

		var ui = Object.assign({}, this.ui);

		for (var k in this.ui) {

			var elements = Array.from(this.el.querySelectorAll(ui[k]));
			ui[k] = elements.length === 1 ? elements[0] : elements;

		}

		this.ui = ui;

	}

	if (this.components) {

		var components = Object.assign({}, this.components);

		for (var k in this.components) {
			components[k] = _initializeComponents.call(this, components[k]);
		}

		this.components = components;

	}

	if (isFunction(this.onInitialized)) this.onInitialized();
}

const _initializeComponents = function (component) {
	var components = [];
	var elements = this.el.querySelectorAll(component.selector);
	
	for (var i = 0; i < elements.length; ++i) {
	
		var options = Object.assign({el: elements[i]}, component.options || {});
		components.push(new component.type(options));
	
	}

	return components.length < 2 ? components[0] : components;
}

const _attachComponents = function() {

	if (this.components){	
		for (var k in this.components) {
			if (isArray(this.components[k])) {
				for (var i = 0; i < this.components[k].length; ++i) {
					this.components[k][i].trigger('attached');
				}
			} else {
				if (this.components[k]) this.components[k].trigger('attached');		
			}
		}
	}

}



const View = {
	extend: function(child) {
		var ViewClass = NativeView.extend(child);

		var originalInitialize = ViewClass.prototype.initialize;
		var originalRemove = ViewClass.prototype.remove;
		
		ViewClass.prototype.initialize = function() {

			originalInitialize.apply(this, arguments);

			this.listenToOnce(this, 'attached', function() {
				
				_initializeView.apply(this);
				_attachComponents.apply(this);

			});
			
		}


		ViewClass.prototype.remove = function() {

			if(isFunction(this.onClose)) this.onClose();
			
			if(this.components) {
				for (var k in this.components) {
					if (isArray(this.components[k])) {
						for (var i = 0; i < this.components[k].length; ++i) {
							this.components[k][i].remove();
						}
					} else {
						if (this.components[k]) this.components[k].remove();
					}
				}
			}
			
			originalRemove.apply(this, arguments);
			this.trigger('removed');
			
		}

		return ViewClass;
	}
}

export { View };