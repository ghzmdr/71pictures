import { View } from '../../lib/View';
import ScrollAwareView from '../../helpers/ScrollAwareView';
import { TweenLite } from 'gsap';
import Articles from '../components/Articles';

const ArticlesPage = View.extend({

    ui: {
        title: '.js-page-title',
        subtitle: '.js-page-subtitle',
        selector: '.js-articles-selector',
        articleTypes: '.js-article-type'
    },

    components: {

        articles: {selector: '.js-articles', type: Articles}

    },

    initialize: function (options) {
        Object.assign(this, ScrollAwareView);
        this.initScrollUI();
        this._initialCategory = options.category;
    },

    onInitialized: function() {
        this.components.articles.update(this._initialCategory);
        this._updateCurrentArticleType(this._initialCategory || 'all')
    },

    updateData(data) {
        console.log('[ArticlesPage] Category: ', data.category || 'all')
        this.components.articles.update(data.category);
        this._updateCurrentArticleType(data.category || 'all');
    },

    _updateCurrentArticleType: function (type) {
        this.ui.articleTypes.forEach(e => {
            var isCurrent = (e.pathname === '/articles/' && type === 'all') || e.href.indexOf(type) != -1;
             isCurrent ? e.classList.add('is-active') : e.classList.remove('is-active');
        })
    },

    titleVisible: function () {
        TweenLite.to(this.ui.title, 0.6, {opacity: 1, delay: 0.2});
        TweenLite.from(this.ui.title, 0.6, {y: '20%', delay: 0.1, ease: Circ.easeOut});
        TweenLite.to(this.ui.subtitle, 0.8, {opacity: 1, delay: 0.8});
        TweenLite.to(this.ui.selector, 0.5, {opacity: 1, delay: 0.7});
    },

    transitionOut(callback) {
        TweenLite.to(this.el.children, 0.3, {opacity: 0, onComplete: callback})
    }
})

export default ArticlesPage;
