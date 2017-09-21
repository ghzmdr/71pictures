import {TweenLite} from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import Router from './Router';
import ApplicationView from './views/ApplicationView';
import PageManager from './utils/PageManager.js';

document.addEventListener('DOMContentLoaded', function () {
	window.seventyonepictures = {
		application: {
			router: new Router(),
			view: new ApplicationView({ el: document.querySelector('#seventyonepictures')})
		} 
	};

	window.seventyonepictures.application.view.trigger('attached');
	PageManager.add(window.location.pathname, document.querySelector('.js-page'));
	Backbone.history.start({ pushState: true });
});