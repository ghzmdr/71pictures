import $ from 'jquery';

class TemplateManager {

	constructor() {
		this._pages = {};

		this._treatSame = {
			'home': ['', 'ntsc'],
			'ntsc': ['', 'home'],
			'': ['ntsc', 'home']
		}
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
			const page = this._pages[slug] || this._getSamePage(slug) 
			
			if (page) res(page);
			else this._fetchPage(slug)
					.then(page => res($(page).find('.js-page')))
					.catch(rej);
		})
	}

	_getSamePage(slug) {
		if (this._treatSame[slug]) {
			this._treatSame[slug].forEach((alias) => {
				if (this._pages[alias]) return alias;
			})
		}
	}

	_fetchPage(pathname) {
		return new Promise((res, rej) => 
			fetch(pathname)
				.then(response => response.text())
				.then(res)
				.catch(rej)
		)
	}
}

export default new TemplateManager();