import { Events } from 'backbone';
import { TweenLite } from 'gsap';
import { extend, bindAll } from 'underscore';
import Size from '../lib/Size';
import { offsetTop, supportsPassiveEvents } from '../utils/DOM';

class Scroll {
    constructor() {
        extend(this, Events);

        bindAll(this, '_scrollHandler');

        this._trigger();

        window.addEventListener('scroll', this._scrollHandler, supportsPassiveEvents ? {passive: false} : false);
        this.listenTo(Size, 'resize:complete', this._resizeCompleteHandler);
    }

    get _screensPerSecond() {
        return 2;
    }

    get Y() {
        return window.scrollY;
    }

    set Y(val) {
        window.scrollTo(0, val);
    }

    lock() {
        if (this._isLocked) return;
        this._isLocked = true;

        this._lockScrollPosition = {x: window.scrollX, y: window.scrollY};

        document.body.style.height = '100%'
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
    }

    unlock() {
        if (!this._isLocked) return;
        this._isLocked = false;

        document.body.style.height = '';
        document.body.style.width = '';
        document.body.style.overflow = 'auto';

        window.scrollX = this._lockScrollPosition.x;
        window.scrollY = this._lockScrollPosition.y;

        this._trigger();
    }

    scrollToElement(element, time) {

        var top = offsetTop(element);
        this.scrollTo(top, time);
    }

    scrollTo(y, time) {

        if (time === undefined) {
            time = this._computeScrollTime(y);
        }

        this._killScrollToTween();
        var tweenData = {y: this.Y};
        this._scrollToTween = TweenLite.to(tweenData, time, {y, onUpdate: () => this.Y = tweenData.y});
    }

    _computeScrollTime(y) {
        if (y === 0) y = 1;
        let deltaY = Math.abs(this.Y - y);
        let vh = Size.innerHeight();
        let screens = deltaY / vh;

        return Math.max(Math.min(1 / this._screensPerSecond * screens, 1.5), 0.25);
    }

    _killScrollToTween() {
        if (this._scrollToTween) {
            this._scrollToTween.kill();
            this._scrollToTween = null;
        }
    }

    _trigger() {
        const viewports = this.Y / Size.innerHeight();
        this.trigger('scroll', {x: this._scrollX, y: this.Y, viewports });
    }

    _scrollHandler(e) {
        this._trigger();
    }

    _resizeCompleteHandler() {
        this._trigger();
    }
}

export default new Scroll();
