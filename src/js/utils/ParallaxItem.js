class ParallaxItem {
	constructor(el, options) {
		this.el = el;
		this.depth = options.depth || 1;
		this.index = options.index || 0;
	
	}
	
	reposition(xOffset, yOffset, tweenTime /*Dirty*/) {
		TweenMax.to(this.el, tweenTime, {
			x: ~~xOffset, 
			y: ~~yOffset, 
			rotationX: -~~xOffset/6, 
			rotationY: -~~yOffset/6, 
			force3D: true
		});
	}
}

export default ParallaxItem;