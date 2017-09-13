import { Router } from 'backbone';
import $ from 'jquery';
import Regions from './regions.js';
import TemplateManager from './lib/TemplateManager.js';

import NTSCPage from './views/pages/NTSCPage.js';
import CompanyPage from './views/pages/CompanyPage.js';
import ArtistsPage from './views/pages/ArtistsPage.js';

const ApplicationRouter = Router.extend({

	routes: {	
		'': 	'_ntsc',
		'ntsc': '_ntsc',
		'company': '_company',
		'artists': '_artists'
	},

	_ntsc: function () {
		this._getElementFromRoute('ntsc')
			.then(el => Regions.main.show(NTSCPage, {el}));
	},

	_company: function () {
		this._getElementFromRoute('company')
			.then(el => Regions.main.show(CompanyPage, {el}));	
	},

	_artists: function () {
		this._getElementFromRoute('artists')
			.then(el => Regions.main.show(ArtistsPage, {el}));	
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