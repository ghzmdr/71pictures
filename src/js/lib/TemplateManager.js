import $ from 'jquery';

class TemplateManager {

	constructor() {
		this._pages = {};
	}

	add(slug, element) {
		if (slug[slug.length-1] === '/') slug = slug.substr(0, slug.length-2);
		return this._pages[slug] = element;
	}

	get(slug) {
		return this._obtainPageBySlug(slug);
	}

	_obtainPageBySlug(slug) {

		return new Promise((res, rej) => {
			const page = this._pages[slug];
		
			if (page) res(page);
			else this._fetchPage(slug)
					.then(pageContent => {
						const node = $(pageContent).find('.js-page')[0];
						this._pages[slug] = node.cloneNode(true);
						res(node);
					})
					.catch(rej)
		})
	}

	_fetchPage(pathname) {
		return new Promise((res, rej) => 
			fetch(`/${pathname}`)
				.then(response => response.text())
				.then(res)
				.catch(rej)
		)
	}
}

export default new TemplateManager();