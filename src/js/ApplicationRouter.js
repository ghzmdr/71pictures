import { Router } from 'backbone';
import $ from 'jquery';
import Regions from './regions.js';
import TemplateManager from './lib/TemplateManager.js';

import NTSCPage from './views/pages/NTSCPage.js';

const ApplicationRouter = Router.extend({

	routes: {	
		'': 	'_home',
		'home': 	'_home',
		'ntsc': '_home'
	},

	_home: function () {
		TemplateManager.get('')
			.then((node) => Regions.main.show(NTSCPage, {el: node}));
	}
})

export default ApplicationRouter;