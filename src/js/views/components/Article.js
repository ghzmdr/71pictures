import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { template } from 'lodash';

const Article = View.extend({
	
	initialize: function (options) {
		var compiledTemplate = template(options.template);
		var html = compiledTemplate(options.model);
		var element = document.createElement('div');
		element.innerHTML = html;
		this.setElement(element.firstElementChild);
	},

	transitionIn: function () {
		TweenLite.to(this.el, 0.3, {autoAlpha: 1});
	},

	transitionOut: function (cb) {
		TweenLite.to(this.el, 0.3, {autoAlpha: 0, onComplete: cb});
	}
	
});

export default Article;
