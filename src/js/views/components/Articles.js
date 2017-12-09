import { View } from 'lib/View';
import Size from 'lib/Size';
import { TweenLite, TimelineLite } from 'gsap';
import { bindAll } from 'underscore';
import ArticlesCollection from 'data/ArticlesCollection';
import ArticleExcerpt from 'views/components/ArticleExcerpt';


const Articles = View.extend({
    ui: {
        list: '.js-articles-list'
    },

    templates: {
        article: 'article'
    },

    initialize: function () {

        bindAll(this, 'swapArticles');
        this.listenTo(ArticlesCollection, 'fetch:complete', this._articlesFetchCompleteHandler);
        ArticlesCollection.fetch();
        this.components = {articles: []};

    },

    _render: function () {
        this.trigger('render');

        this.transitionOutArticles()
            .then(this.swapArticles);

    },

    transitionOutArticles: function () {
        if (!this.components.articles) return {then: (c) => c()}

        var promises = [];

        this.components.articles.forEach(
            c => promises.push(new Promise((res) => c.transitionOut(res)))
        );

        return Promise.all(promises);

    },

    swapArticles: function () {
        if (this.components.articles) this.components.articles.forEach(
            c => this.ui.list.removeChild(c.el)
        );

        this.components.articles = [];

        this.currentModels.forEach(model => this.components.articles.push(new ArticleExcerpt({model, template: this.templates.article})))
        this.components.articles.forEach(a => {
            this.ui.list.appendChild(a.el);
            a.trigger('attached');
            a.transitionIn();
        });
    },

    update: function (type) {
        this.currentType = type || 'all';
        if (!this._isFirstUpdateSkipped) return this._isFirstUpdateSkipped = true;

        this._updateCurrentModels();
        if (this.currentModels) {
            this._render();
        }
    },

    _updateCurrentModels: function () {
        this.currentModels =
            this.currentType === 'all' ?
                ArticlesCollection.models :
                ArticlesCollection.where({type: this.currentType});
    },

    _articlesFetchCompleteHandler: function () {
        this._updateCurrentModels();
        this._render();
    }

});

export default Articles;
