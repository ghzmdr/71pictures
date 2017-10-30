import { extend, bindAll } from 'underscore';
import { TweenLite } from 'gsap';
import Size from '../lib/Size';
import Scroll from '../lib/Scroll';
import { Events } from 'backbone';

/**
 * TODO: Ignore scroll and resize if mouse isn't over.
 */

class ParallaxContainer {
	constructor(el) {
		extend(this, Events);

		bindAll(this, 
			'_tickHandler',
			'_mouseMoveHandler',
			'_mouseLeaveHandler'
		);

		this.MAX_DEPTH = ParallaxContainer.MAX_DEPTH;
		
		this.el = el;
		
		this._items = {};

		this.setParallaxMult(5);
		
		this._setSizes();
		this._setListeners();
	}

	close() {
		TweenLite.ticker.removeEventListener('tick', this._tickHandler);
	}

	enable() {
		this._isEnabled = true;
	}

	disable() {
		this._isEnabled = false;
	}

	_setSizes() {
		var boundingRect = this.el.getBoundingClientRect();

		this._width = Math.round(boundingRect.width);
		this._height = Math.round(boundingRect.height);
		this._top = Math.round(boundingRect.top);
		this._left = Math.round(boundingRect.left);

	}

	_setListeners() {
		this.listenTo(Size, 'resize', this._resizeHandler);
		this.listenTo(Scroll, 'scroll', this._scrollHandler);
		this.el.parentElement.addEventListener('mousemove', this._mouseMoveHandler);
		this.el.parentElement.addEventListener('mouseleave', this._mouseLeaveHandler);
		TweenLite.ticker.addEventListener('tick', this._tickHandler);
	}
	
	add(key, item) {
		this._items[key] = item;
	}
	
	setParallaxMult(amount) {
		this._maxParallax = 10 * amount;
	}
	
	reposition() {

		let item, itemFactor;
		let xRotation = 15 * ((this._height/2 - this._mouse.y) / (this._height/2));
		let yRotation = -15 * ((this._width/2 - this._mouse.x) / (this._width/2));
		
		for(var k in this._items) {
			item = this._items[k];
			itemFactor = item.depth / this.MAX_DEPTH;

			let itemX = xRotation * itemFactor;
			let itemY = yRotation * itemFactor;

			TweenLite.to(item.el, 0.4, {rotationX: itemX, rotationY: itemY, force3D: true});
		}
	}
	
	_end() {
		this._endTween = TweenLite.to(
			Object.keys(this._items).map(k => this._items[k].el),
			0.4, 
			{rotationX: 0, rotationY: 0, force3D: true}
		);
	}
	
	_resizeHandler() {
		this._setSizes();
		this._pendingUpdate = true;
	}

	_scrollHandler() {
		this._setSizes();
		this._pendingUpdate = true;
	}
	
	_tickHandler() {
		if (!this._isEnabled) return;
		if (this._pendingUpdate && this._isMouseOver) {
			this._pendingUpdate = false;			
			this.reposition();
		}
	}

	_mouseLeaveHandler() {
		if (!this._isEnabled) return;
		this._isMouseOver = false;
		this._end();
	}
	
	_mouseMoveHandler(e) {
		if (!this._isEnabled) return;
		this._mouse = {x: e.clientX - this._left, y: e.clientY - this._top};
		
		// console.log(`[ParallaxContainer] - Mouse: X${this._mouse.x} Y${this._mouse.y}`);
		
		if (this._endTween) this._endTween.kill();

		this._isMouseOver = true;
		this._pendingUpdate = true;
	}
	
}

ParallaxContainer.MAX_DEPTH = 10;

export default ParallaxContainer;