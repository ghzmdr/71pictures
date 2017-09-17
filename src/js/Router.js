import { Router } from 'backbone';
import $ from 'jquery';
import Regions from './regions.js';
import TemplateManager from './lib/TemplateManager.js';

import NTSCPage from './views/pages/NTSCPage.js';
import AboutPage from './views/pages/AboutPage.js';
import ArticlesPage from './views/pages/ArticlesPage.js';

const ApplicationRouter = Router.extend({

	routes: {	
		'': 	'_ntsc',
		'ntsc': '_ntsc',
		'about': '_about',
		'artists': '_artists'
	},

	_ntsc: function () {
		this._getElementFromRoute('ntsc')
			.then(el => Regions.main.show(NTSCPage, {el}));
	},

	_about: function () {
		this._getElementFromRoute('about')
			.then(el => Regions.main.show(AboutPage, {el}));	
	},

	_artists: function () {
		this._getElementFromRoute('artists')
			.then(el => Regions.main.show(ArticlesPage, {el}));	
	},

	_getElementFromRoute: function(slug) {
		
		return new Promise((res, rej) => {
			if (!this._previousPage) {
				this._previousPage = slug;

				const page = document.querySelector('.page');
				TemplateManager.add(slug, page.cloneNode(true));
				res(page);
			} else {
				TemplateManager.get(slug)
					.then(res)
					.catch(rej)
			}

		})
	}
})

export default ApplicationRouter;