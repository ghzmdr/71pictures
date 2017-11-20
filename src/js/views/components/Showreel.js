import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import ShowreelSlide from './ShowreelSlide';
import { bindAll } from 'lodash';

export default View.extend({

    components: {
        slides: {selector: '.js-showreel-slide', type: ShowreelSlide}
    },

    _currentIndex: 0,

    initialize: function () {
        bindAll(this, '_loop', '_swapTimelineCompleteHandler');
    },

    onClose: function () {
        if (this._swapTimeline) {
            this._swapTimeline.kill();
            delete this._swapTimeline;
        }
    },

    onInitialized: function() {
        TweenLite.set(this.components.slides[0].el, {x: '0%'})
        TweenLite.to(this.components.slides[0].el, 0.3, {autoAlpha: 1})
        // this.components.slides[0].transitionIn();
        this._loop();
    },

    _loop: function () {
        TweenLite.delayedCall(5, () => {
            this.next();
            this._loop();
        })
    },

    next: function () {
        this._swap(this._getNextIndex());
    },

    prev: function () {
        this._swap(this._getPrevIndex());
    },

    _swap: function (index) {
        if (this._isSwapping) return;
        this._isSwapping = true;

        if (this._swapTimeline) this._swapTimeline.kill();
        this._swapTimeline = new TimelineLite({onComplete: this._swapTimelineCompleteHandler});

        this._swapTimeline.add(this.components.slides[this._currentIndex].transitionOut());

        this._currentIndex = index;
        this._swapTimeline.add(this.components.slides[this._currentIndex].transitionIn(), 0);
    },

    _getPrevIndex: function () {
        if (this._currentIndex === 0) {
            return this.components.slides.length - 1;
        } else {
            return this._currentIndex - 1;
        }
    },

    _getNextIndex: function () {
        if (this._currentIndex === this.components.slides.length - 1) {
            return 0;
        } else {
            return this._currentIndex + 1;
        }
    },

    _swapTimelineCompleteHandler: function () {
        this._isSwapping = false;
    }
});
