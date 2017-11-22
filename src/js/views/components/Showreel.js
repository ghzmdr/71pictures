import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import ShowreelSlide from './ShowreelSlide';
import ShowreelDescription from './ShowreelDescription';
import ShowreelBullet from './ShowreelBullet';
import { bindAll } from 'lodash';

export default View.extend({

    components: {
        slides: {selector: '.js-slide', type: ShowreelSlide},
        descriptions: {selector: '.js-description', type: ShowreelDescription},
        bullets: {selector: '.js-bullet', type: ShowreelBullet}
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
        this.components.slides[0].transitionIn();
        this.components.descriptions[0].transitionIn();
        this.components.bullets[0].activate();

        this.components.bullets.forEach(
            (b, i) => b.on('click', this._bulletClickHandler.bind(this, i))
        );

        //start auto looping
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
        this._swapTimeline.add(this.components.descriptions[this._currentIndex].transitionOut(), 0);
        this.components.bullets[this._currentIndex].deactivate();

        this._currentIndex = index;

        this._swapTimeline.add(this.components.slides[this._currentIndex].transitionIn(), 0.8);
        this._swapTimeline.add(this.components.descriptions[this._currentIndex].transitionIn(), 0.8);
        this.components.bullets[this._currentIndex].activate();

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
    },

    _bulletClickHandler: function(index) {
        this._swap(index);
    }
});
