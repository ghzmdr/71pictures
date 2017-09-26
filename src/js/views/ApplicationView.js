import { View } from '../lib/View';
import Background from './components/Background';
import Intro from './components/Intro';

const ApplicationView = View.extend({

	components: {
		background: {selector: '.js-background', type: Background},
		intro: {selector: '.js-intro', type: Intro}
	},

	events: {
		'click [href^="/"]': '_routeClickHandler'
	},

	onInitialized: function() {
		this.transitionIn();
	},

	transitionIn: function () {
		this.components.intro.transitionIn();
	},

	_routeClickHandler: function (e) {
		e.preventDefault();
		Backbone.history.navigate(e.target.pathname, { trigger: true });
	}
})

export default ApplicationView;