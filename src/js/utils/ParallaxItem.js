class ParallaxItem {
	constructor(el, options) {
		this.el = el;
		this.depth = options.depth || 1;
		this.index = options.index || 0;
	
	}

	reposition(xOffset, yOffset, tweenTime /*Dirty*/) {
		
		TweenMax.to(this.el, 0.4, {
			rotationX: xOffset, 
			rotationY: yOffset, 
			force3D: true
		});
	}
}

export default ParallaxItem;