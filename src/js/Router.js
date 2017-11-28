import { Router } from 'backbone';
import Regions from './regions';
import Scroll from './lib/Scroll';
import { offsetTop } from './utils/DOM';
import AppActions from './actions/AppActions'
import PageCache from './utils/PageCache';

import HomePage from './views/pages/HomePage';
import NTSCPage from './views/pages/NTSCPage';
import AboutPage from './views/pages/AboutPage';
import ArticlesPage from './views/pages/ArticlesPage';
import VisualsPage from './views/pages/VisualsPage';
import ArticlePage from './views/pages/ArticlePage';

const ApplicationRouter = Router.extend({

    routes: {
        '(/)': '_home',
        'visuals(/)': '_visuals',
        'articles(/)(:category)(/)': '_articles',
        'articles(/)(:category)(/)(:id)(/)': '_article',
        'about(/)': '_about',
    },

    initialize: function () {
        this.on('route', r => AppActions.setCurrentRoute(r))
    },

    _home:function () {
        this._getElementFromRoute('')
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

            if (this._previousPage === void 0) {
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
