import { Router } from 'backbone';
import Regions from './regions.js';
import Scroll from './lib/Scroll.js';
import { offsetTop } from './utils/DOM.js';
import PageCache from './utils/PageCache.js';

import HomePage from './views/pages/NTSCPage.js';
import NTSCPage from './views/pages/NTSCPage.js';
import AboutPage from './views/pages/AboutPage.js';
import ArticlesPage from './views/pages/ArticlesPage.js';
import VisualsPage from './views/pages/VisualsPage.js';
import ArticlePage from './views/pages/ArticlePage.js';

const ApplicationRouter = Router.extend({

    routes: {
        '': '_home'
    },

    _home:function () {
        this._getElementFromRoute('ntsc')
            .then(el => {
                Regions.main.show(HomePage, {el});
            });
    },

    _ntsc: function () {
        this._getElementFromRoute('ntsc')
            .then(el => {
                Regions.main.show(NTSCPage, {el});
            });
    },

    _about: function () {
        this._getElementFromRoute('about')
            .then(el => {
                Regions.main.show(AboutPage, {el});
            });
    },

    _articles: function (category) {
        this._getElementFromRoute('articles')
            .then(el => {
                Regions.main.show(ArticlesPage, {el, category});
            });
    },

    _article: function (category, slug) {
        this._getElementFromRoute(`articles/${category}/${slug}`, {forceRefresh: true})
            .then(el => {
                Regions.main.show(ArticlePage, {el});
            });
    },

    _visuals: function () {
        this._getElementFromRoute('visuals')
            .then(el => {
                Regions.main.show(VisualsPage, {el});
            });
    },

    _getElementFromRoute: function(slug, options) {
        options = options || {};
        return new Promise((res, rej) => {

            if (!this._previousPage) {
                this._previousPage = slug;

                const page = document.querySelector('.js-page');
                PageCache.add(slug, page.cloneNode(true));
                res(page);

            } else {

                PageCache.get(slug, options)
                    .then(res)
                    .catch(rej)

            }

        })
    }
})

export default ApplicationRouter;
