import { View } from 'lib/View';
import { TweenLite } from 'gsap';
import Articles from 'views/components/Articles';

const ArticlesPage = View.extend({

    ui: {
        title: '.js-page-title',
        subtitle: '.js-page-subtitle',
        selector: '.js-articles-selector',
        articles: '.js-articles'
    },

    components: {

        articles: {selector: '.js-articles', type: Articles}

    },

    initialize: function (options) {
        this._initialCategory = options.category;
    },

    onInitialized: function() {
        this.components.articles.update(this._initialCategory);
        this.listenToOnce(this.components.articles, 'render', this._showArticles);
    },

    transitionIn: function () {
        TweenLite.set(this.components.articles.el, {autoAlpha: 0});
        TweenLite.fromTo(this.el, 0.4, {autoAlpha: 1}, {autoAlpha: 1});
    },

    transitionOut: function(cb) {
        TweenLite.to(this.el, 0.4, {autoAlpha: 0, onComplete: cb});
    },

    _showArticles: function() {
        TweenLite.to(this.ui.articles, 0.4, {autoAlpha: 1});
    },

    updateData(data) {
        console.log('[ArticlesPage] Category: ', data.category || 'all')
        this.components.articles.update(data.category);
    }

})

export default ArticlesPage;
