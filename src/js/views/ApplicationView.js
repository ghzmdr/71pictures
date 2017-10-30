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
		'click [href^="/"]': '_routeClickHandler',
		'click [href^="http"]': '_routeClickHandler'
	},

	_routeClickHandler: function (e) {
		const target = e.delegateTarget || e.target;

		const isDev = window.location.hostname.indexOf('localhost') == 0 && target.hostname.indexOf('71p') === 0;
		
		if (!isDev && target.hostname !== window.location.hostname)
			return;

		e.preventDefault();
		Backbone.history.navigate(target.pathname, { trigger: true });
	}
})

export default ApplicationView;