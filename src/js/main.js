import {TweenLite} from 'gsap';
import Backbone from 'backbone';
import CSSPlugin from 'gsap/CSSPlugin';
import Router from './Router';
import ApplicationView from './views/ApplicationView';
import PageCache from './utils/PageCache.js';

document.addEventListener('DOMContentLoaded', function () {
    window.seventyonepictures = {
        application: {
            router: new Router(),
            view: new ApplicationView({ el: document.querySelector('#seventyonepictures')})
        }
    };

    window.seventyonepictures.application.view.trigger('attached');
    PageCache.add(window.location.pathname, document.querySelector('.js-page'));
    Backbone.history.start({ pushState: true });
});
