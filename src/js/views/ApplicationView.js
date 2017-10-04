import Backbone from 'backbone';
import { View } from '../lib/View';
import Cover from './components/Cover';
import MainNavigation from './components/MainNavigation';
import ActionBar from './components/ActionBar';

const ApplicationView = View.extend({

	components: {
		mainNavigation: {selector: '.js-main-navigation', type: MainNavigation},
		actionBar: {selector: '.js-action-bar', type: ActionBar},
		cover: {selector: '.js-cover', type: Cover},
	},

	events: {
		'click [href^="/"]': '_routeClickHandler'
	},

	_routeClickHandler: function (e) {
		e.preventDefault();
		Backbone.history.navigate(e.target.pathname, { trigger: true });
	}
})

export default ApplicationView;