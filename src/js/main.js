import $ from 'jquery';
import {TweenLite} from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import ApplicationRouter from './ApplicationRouter';
import ApplicationView from './ApplicationView';

$(function() {	
	window.seventyonepictures = {
		application: {
			router: new ApplicationRouter(),
			view: new ApplicationView({ el: $('#seventyonepictures')})
		} 
	};

	Backbone.history.start({ pushState: true });
})