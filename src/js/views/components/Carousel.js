import { View } from '../../lib/View';
import Size from '../../lib/Size';
import { TweenLite, TimelineLite } from 'gsap';
import { bindAll } from 'underscore';

const Carousel = View.extend({

	ui: {
		slidePanel: '.js-carousel-slides',
		slides: '.js-carousel-slide',

		buttonPrev: '.js-carousel-prev',
		buttonNext: '.js-carousel-next'
	},

	events: {
		'click .js-carousel-prev': '_buttonPrevClickHandler',
		'click .js-carousel-next': '_buttonNextClickHandler'
	},

	onClose: function() {
		
		this._removeListeners();
		
	},

	initialize: function() {
		bindAll(this, 
			'_buttonPrevMouseEnterHandler',
			'_buttonPrevMouseLeaveHandler',
			'_buttonNextMouseEnterHandler',
			'_buttonNextMouseLeaveHandler'
		)
	},

	onInitialized: function () {
		this._setListeners();
		this._setSizes();

		this._currentIndex = 0;
		this._setPosition();
	},

	_setListeners: function () {
		this.listenTo(Size, 'resize:complete', this._resizeCompleteHandler);
		this.ui.buttonPrev.addEventListener('mouseenter', this._buttonPrevMouseEnterHandler);
		this.ui.buttonPrev.addEventListener('mouseleave', this._buttonPrevMouseLeaveHandler);
		this.ui.buttonNext.addEventListener('mouseenter', this._buttonNextMouseEnterHandler);
		this.ui.buttonNext.addEventListener('mouseleave', this._buttonNextMouseLeaveHandler);
	},
	_removeListeners: function() {

		this.ui.buttonPrev.removeEventListener('mouseenter', this._buttonPrevMouseEnterHandler);
		this.ui.buttonPrev.removeEventListener('mouseleave', this._buttonPrevMouseLeaveHandler);
		this.ui.buttonNext.removeEventListener('mouseenter', this._buttonNextMouseEnterHandler);
		this.ui.buttonNext.removeEventListener('mouseleave', this._buttonNextMouseLeaveHandler);

	},

	_setSizes: function () {
		this._slideWidth = this.ui.slides[0].offsetWidth;
		TweenLite.set(this.ui.slidePanel, {x: -1 * this._currentIndex * this._slideWidth, ease: Power3.easeInOut, force3D: true})
	},

	next: function () {
		if (this._currentIndex === this.ui.slides.length - 1) return;
		
		++this._currentIndex;
		TweenLite.to(this.ui.slidePanel, 0.8, {x: -1 * this._currentIndex * this._slideWidth, ease: Power3.easeInOut, force3D: true});
		this._setPosition();
	},

	prev: function () {
		if (this._currentIndex === 0) return;

		--this._currentIndex;
		TweenLite.to(this.ui.slidePanel, 0.8, {x: -1 * this._currentIndex * this._slideWidth, ease: Power3.easeInOut, force3D: true});
		this._setPosition();
	},

	_setPosition: function () {
		if (this._currentIndex === 0) {
			TweenLite.to(this.ui.buttonPrev, 0.3, {x: '-100%', autoAlpha: 0});
		} else {
			if (!this._isMouseOverButtonPrev) {
				TweenLite.to(this.ui.buttonPrev, 0.3, {x: '-30%', autoAlpha: 0.5});
			}
		}

		if (this._currentIndex === this.ui.slides.length - 1) {
			TweenLite.to(this.ui.buttonNext, 0.3, {x:' 100%', autoAlpha: 0});
		} else {
			if (!this._isMouseOverButtonNext) {
				console.log('asd')
				TweenLite.to(this.ui.buttonNext, 0.3, {x:' 30%', autoAlpha: 0.5});
			}
		}
	},

	_resizeCompleteHandler: function () {
		this._setSizes();
	},

	_buttonNextClickHandler: function () {
		this.next();
	},

	_buttonPrevClickHandler: function () {
		this.prev();
	},

	_buttonPrevMouseEnterHandler: function () {
		this._isMouseOverButtonPrev = true;
		TweenLite.to(this.ui.buttonPrev, 0.4, {x:' 0%', opacity: 1});
	},

	_buttonPrevMouseLeaveHandler: function () {
		this._isMouseOverButtonPrev = false;
		TweenLite.to(this.ui.buttonPrev, 0.4, {x: '-30%', opacity: 0.5});
	},

	_buttonNextMouseEnterHandler: function () {
		this._isMouseOverButtonNext = true;
		TweenLite.to(this.ui.buttonNext, 0.4, {x:' 0%', opacity: 1});
	},

	_buttonNextMouseLeaveHandler: function () {
		this._isMouseOverButtonNext = false;
		TweenLite.to(this.ui.buttonNext, 0.4, {x:' 30%', opacity: 0.5});
	}
});

export default Carousel;
