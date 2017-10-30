import { Collection, Model } from 'backbone';

const ArticleModel = Model.extend({
});

const ArticlesCollection = Collection.extend({
	url: '/wp-json/wp/v2/articles/',
	typesUrl: '/wp-json/wp/v2/article-types',
	model: ArticleModel,

	fetch: function() {
		var _models, _types;

		Promise.all([
			fetch(this.url)
				.then(res => res.json())
				.then(models => _models = models),

			fetch(this.typesUrl)
				.then(res => res.json())
				.then(types => _types = types)
			
		]).then(() => {

			var types = {};

			_types.forEach(function(type) {
				types[type.id] = type.slug;
			});

			_models.forEach(function(model) { 
				model.type = types[model['article-types'][0]];
			});

			this.add(_models);
			this.trigger('fetch:complete')
		})
	},


});

export default new ArticlesCollection();
