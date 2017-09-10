import { Router } from 'backbone';
import $ from 'jquery';
import Regions from './regions.js';

import HomePage from './views/pages/HomePage.js'

const ApplicationRouter = Router.extend({

	routes: {	
		'': 	'_home',
		'home': '_home',
		'ntsc': '_ntsc'
	},

	_home: function () {
		this._activeMainView = Regions.main.show(HomePage, {el: $('.js-page-home')});
	},

	_ntsc: function () {
		this._activeMainView =  Regions.main.show(HomePage, {el: $('.js-page-home'), scrollToNTSC: true});
	}
})

export default ApplicationRouter;