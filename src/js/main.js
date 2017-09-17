import $ from 'jquery';
import {TweenLite} from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import Router from './Router';
import ApplicationView from './views/ApplicationView';
import TemplateManager from './lib/TemplateManager.js';

$(function() {	
	window.seventyonepictures = {
		application: {
			router: new Router(),
			view: new ApplicationView({ el: $('#seventyonepictures')})
		} 
	};

	window.seventyonepictures.application.view.trigger('attached');
	TemplateManager.add(window.location.pathname, $('.js-page'));
	Backbone.history.start({ pushState: true });
})