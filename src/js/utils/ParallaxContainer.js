import { extend, bindAll } from 'underscore';
import { TweenLite } from 'gsap';
import Size from '../lib/Size';
import { Events } from 'backbone';

class ParallaxContainer {
	constructor(el) {
		extend(this, Events);

		bindAll(this, 
			'_resizeHandler',
			'_tickHandler',
			'_mouseMoveHandler',
			'_mouseLeaveHandler'
		);

		this.MAX_DEPTH = ParallaxContainer.MAX_DEPTH;
		
		this.el = el;
		
		this._elements = [];
		this._items = {};

		this.setParallaxMult(5);
		
		this._setSizes();
		this._setListeners();
	}

	close() {
		TweenLite.ticker.removeEventListener('tick', this._tickHandler);
	}

	_setSizes() {
		this._width = this.el.offsetWidth;
		this._height = this.el.offsetHeight;
		this._top = this.el.offsetTop;
		this._left = this.el.offsetLeft;
	}

	_setListeners() {
		this.listenTo(Size, 'resize', this._resizeHandler);
		this.el.addEventListener('mousemove', this._mouseMoveHandler);
		this.el.addEventListener('mouseleave', this._mouseLeaveHandler);
		TweenLite.ticker.addEventListener('tick', this._tickHandler);
	}
	
	add(key, item) {
		this._items[key] = item;
		this._elements.push(item.el); //dirty
	}
	
	setParallaxMult(amount) {
		this._maxParallax = 10 * amount;
	}
	
	reposition() {
		
		var shouldTween = !this._isMouseOver;
		this._isMouseOver = true;
		
		let item;
		Object.keys(this._items).forEach((k) => {
			item = this._items[k];
		
			let xOffset = -1 * (this._width/2 - this._mouse.x) / (this._width/2);
			
			let yOffset = -1 * (this._height/2 - this._mouse.y) / (this._height/2);
			
			const tiltAmount = item.depth / this.MAX_DEPTH;
			xOffset *= tiltAmount * this._maxParallax;
			yOffset *= tiltAmount * this._maxParallax;
			item.reposition(xOffset, yOffset, this._timeObj.secondsIntro);
		});
	}
	
	_end() {
		this._endTween = TweenLite.to(
			this._elements,
			0.4, 
			{x: 0, y: 0, rotationX: 0, rotationY: 0, force3D: true}
		);
	}
	
	_resizeHandler() {
		this._setSizes();
	}
	
	_tickHandler() {
		if (this._pendingUpdate && this._isMouseOver) {
			this._pendingUpdate = false;
			
			if (this._endTween) this._endTween.kill();
			this.reposition();
		}
	}

	_mouseLeaveHandler() {
		this._isMouseOver = false;
		this._end();
	}
	
	_mouseMoveHandler(e) {
		this._mouse = {x: e.clientX - this._left, y: e.clientY - this._top};
	
// 		console.log(`[ParallaxContainer] - Mouse: X${this._mouse.x} Y${this._mouse.y}`);

		if (!this._isMouseOver) {
			this._timeObj = {secondsIntro: 0.3}
			TweenLite.to(this._timeObj, 0.3, {secondsIntro: 0, ease: Linear.easeNone});
		}
		
		this._isMouseOver = true;
		this._pendingUpdate = true;
	}
	
}

ParallaxContainer.MAX_DEPTH = 10;

export default ParallaxContainer;