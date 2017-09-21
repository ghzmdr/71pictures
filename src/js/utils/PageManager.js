class PageManager {

	constructor() {
		this._pages = {};
	}

	add(slug, element) {
		
		if (slug[slug.length-1] === '/') {
			slug = slug.replace(/^\//, '');
		}

		return this._pages[slug] = element;
	}

	get(slug) {
		return this._obtainPageBySlug(slug);
	}

	_obtainPageBySlug(slug) {

		return new Promise((res, rej) => {
			const page = this._pages[slug];
		
			if (page) {
				res(page);
			} else {
				this._fetchPage(slug)
					.then(pageContent => {
						const node = this._findPageNode(pageContent, '.js-page');
						this._pages[slug] = node.cloneNode(true);
						res(node);
					})
					.catch(rej)
			}
		})
	
	}

	_findPageNode(page, selector) {
		
		var doc = document.implementation.createHTMLDocument('page');
		doc.documentElement.innerHTML = page;
		return doc.querySelector(selector);
	
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

export default new PageManager();