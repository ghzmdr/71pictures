import $ from 'jquery';
import { View } from './lib/View';
import Background from './components/Background';
import Intro from './components/Intro';

const ApplicationView = View.extend({

	components: {
		background: {selector: '.js-background', type: Background},
		intro: {selector: '.js-intro', type: Intro}
	},

	_onInitialized: function() {
		this.transitionIn();
	},

	transitionIn: function () {
		this.components.intro.transitionIn();
	}
})

export default ApplicationView;