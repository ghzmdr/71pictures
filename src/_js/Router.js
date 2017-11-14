import { Router } from 'backbone';
import Regions from './regions.js';
import Scroll from './lib/Scroll.js';
import { offsetTop } from './utils/DOM.js';
import PageManager from './utils/PageManager.js';

import NTSCPage from './views/pages/NTSCPage.js';
import AboutPage from './views/pages/AboutPage.js';
import ArticlesPage from './views/pages/ArticlesPage.js';
import VisualsPage from './views/pages/VisualsPage.js';
import ArticlePage from './views/pages/ArticlePage.js';

const ApplicationRouter = Router.extend({

    routes: {
        '': '_home',
        'ntsc': '_ntsc',
        'about': '_about',
        'visuals/': '_visuals',
        'articles/': '_articles',
        'articles/:category/': '_articles',
        'articles/:category/:slug': '_article',
        'articles/:category/:slug/': '_article',
    },

    _home:function () {
        this._getElementFromRoute('ntsc')
            .then(el => {
                Regions.main.show(NTSCPage, {el});
                this._scrollToSection('.js-cover')
            });
    },

    _ntsc: function () {
        this._getElementFromRoute('ntsc')
            .then(el => {
                Regions.main.show(NTSCPage, {el});
                this._scrollToSection('.js-page')
            });
    },

    _about: function () {
        this._getElementFromRoute('about')
            .then(el => {
                Regions.main.show(AboutPage, {el});
                this._scrollToSection('.js-page')
            });
    },

    _articles: function (category) {
        this._getElementFromRoute('articles')
            .then(el => {
                Regions.main.show(ArticlesPage, {el, category});
                this._scrollToSection('.js-page')
            });
    },

    _article: function (category, slug) {
        this._getElementFromRoute(`articles/${category}/${slug}`, {forceRefresh: true})
            .then(el => {
                Regions.main.show(ArticlePage, {el});
                this._scrollToSection('.js-page')
            });
    },

    _visuals: function () {
        this._getElementFromRoute('visuals')
            .then(el => {
                Regions.main.show(VisualsPage, {el});
                this._scrollToSection('.js-page')
            });
    },

    _scrollToSection: function(selector) {

        const el = document.querySelector(selector);

        // if (Scroll.Y < offsetTop(el)) {
            Scroll.scrollToElement(el);
        // }

    },

    _getElementFromRoute: function(slug, options) {
        options = options || {};
        return new Promise((res, rej) => {

            if (!this._previousPage) {
                this._previousPage = slug;

                const page = document.querySelector('.js-page');
                PageManager.add(slug, page.cloneNode(true));
                res(page);

            } else {

                PageManager.get(slug, options)
                    .then(res)
                    .catch(rej)

            }

        })
    }
})

export default ApplicationRouter;
