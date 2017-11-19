import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import Articles from '../components/Articles';

const ArticlesPage = View.extend({

    ui: {
        title: '.js-page-title',
        subtitle: '.js-page-subtitle',
        selector: '.js-articles-selector'
    },

    components: {

        articles: {selector: '.js-articles', type: Articles}

    },

    initialize: function (options) {
        this._initialCategory = options.category;
    },

    onInitialized: function() {
        this.components.articles.update(this._initialCategory);
    },

    updateData(data) {
        console.log('[ArticlesPage] Category: ', data.category || 'all')
        this.components.articles.update(data.category);
    }

})

export default ArticlesPage;
