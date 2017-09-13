import $ from 'jquery';
import {TweenLite} from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import ApplicationRouter from './ApplicationRouter';
import ApplicationView from './ApplicationView';
import TemplateManager from './lib/TemplateManager.js';

$(function() {	
	window.seventyonepictures = {
		application: {
			router: new ApplicationRouter(),
			view: new ApplicationView({ el: $('#seventyonepictures')})
		} 
	};

	window.seventyonepictures.application.view.trigger('attached');
	TemplateManager.add(window.location.pathname, $('.js-page'));
	Backbone.history.start({ pushState: true });
})