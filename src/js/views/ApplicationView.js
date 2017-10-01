import { View } from '../lib/View';
import Cover from './components/Cover';

const ApplicationView = View.extend({

	components: {
		cover: {selector: '.js-cover', type: Cover}
	},

	events: {
		'click [href^="/"]': '_routeClickHandler'
	},

	onInitialized: function() {
		this.transitionIn();
	},

	transitionIn: function () {
		this.components.cover.transitionIn();
	},

	_routeClickHandler: function (e) {
		e.preventDefault();
		Backbone.history.navigate(e.target.pathname, { trigger: true });
	}
})

export default ApplicationView;