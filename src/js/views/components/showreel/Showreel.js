import { View } from 'lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import { bindAll } from 'lodash';

import ShowreelSlide from 'views/components/showreel/ShowreelSlide';
import ShowreelDescription from 'views/components/showreel/ShowreelDescription';
import ShowreelBullet from 'views/components/showreel/ShowreelBullet';

export default View.extend({

    components: {
        slides: {selector: '.js-slide', type: ShowreelSlide, forceArray: true},
        descriptions: {selector: '.js-description', type: ShowreelDescription, forceArray: true},
        bullets: {selector: '.js-bullet', type: ShowreelBullet, forceArray: true}
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

        this._isClosed = true;

    },

    onInitialized: function() {
        this.components.slides[0].transitionIn();
        this.components.descriptions[0].transitionIn();

        if (this.components.bullets) {
            this.components.bullets[0].big();

            if (this.components.bullets.length > 0) {
                this.components.bullets.forEach(
                    (b, i) => b.on('click', this._bulletClickHandler.bind(this, i))
                );
            }
        }

        if (this.components.slides.length > 1) {
            this._delayLoop(5);
        }

    },

    _loop: function () {
        if (this._isClosed) return;

        this.next();
        this._delayLoop(5);
    },

    _delayLoop: function (delay) {
        TweenLite.delayedCall(delay, this._loop)
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

        const otherBullets = this.components.bullets.filter((b, i) => i !== index);

        if (this._swapTimeline) this._swapTimeline.kill();
        this._swapTimeline = new TimelineLite({onComplete: this._swapTimelineCompleteHandler});

        this._swapTimeline.add(this.components.slides[this._currentIndex].transitionOut());
        this._swapTimeline.add(this.components.descriptions[this._currentIndex].transitionOut(), 0);
        this.components.bullets[this._currentIndex].normal();
        otherBullets.forEach(b => b.shrunk());
        console.log(otherBullets);

        this._currentIndex = index;

        this._swapTimeline.add(this.components.slides[this._currentIndex].transitionIn(), 0.8);
        this._swapTimeline.add(this.components.descriptions[this._currentIndex].transitionIn(), 0.8);
        this.components.bullets[this._currentIndex].big();

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

        const otherBullets = this.components.bullets.filter((b, i) => i !== this._currentIndex);
        otherBullets.forEach(b => b.normal());
    },

    _bulletClickHandler: function(index) {
        this._swap(index);
    }
});
