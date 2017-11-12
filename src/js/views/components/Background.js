import { View } from '../../lib/View';
import Size from '../../lib/Size';
import Scroll from '../../lib/Scroll';
import { TweenLite, TimelineLite } from 'gsap';
import { bindAll } from 'underscore';

const BackgroundVideo = View.extend({

    ui: {
        canvas: '.js-canvas',
        video: '.js-video'
    },

    initialize: function () {
        bindAll(this, '_tickHandler');

        this._maskTweenObj = {
            stopTransparent: 0,
            stopBlack: 1
        };

        this._skippedTicks = 0;
    },

    transitionIn() {
        TweenLite.set(this.ui.canvas, {opacity: 1});
    },

    onClose: function () {
        TweenLite.ticker.removeEventListener('tick', this._tickHandler);
    },

    onInitialized: function () {

        this.ui.underwaterCanvas = document.createElement('canvas');
        this._underwaterCtx = this.ui.underwaterCanvas.getContext('2d');

        this._ctx = this.ui.canvas.getContext('2d');

        this._setSizes();
        const maskTimeline = this._obtainMaskTimeline();

        this.ui.video.play();

        this._setListeners();
        this._setProgressFromScroll();
    },

    _setListeners: function () {
        TweenLite.ticker.addEventListener('tick', this._tickHandler);
        this.listenTo(Size, 'resize:complete', this._resizeCompleteHandler);
        this.listenTo(Scroll, 'scroll', this._scrollHandler);
    },

    _setSizes: function () {

        this._width = Size.innerWidth();
        this._height = Size.innerHeight();

        this.ui.canvas.width = this.ui.underwaterCanvas.width = this._width;
        this.ui.canvas.height = this.ui.underwaterCanvas.height = this._height;

        this._frameHeight = this._height;

        var factor = Math.max(this.ui.video.videoHeight, this._height) / Math.min(this.ui.video.videoHeight, this._height);
        this._frameWidth = this.ui.video.videoWidth * factor;
        this._frameXShift = -1 * Math.floor((this._frameWidth - this._width)/2);

    },

    _tick: function () {

        if (this._currentMaskProgress === 1) return;


        // this._ctx.globalCompositeOperation = 'source-over';
        this._ctx.clearRect(0, 0, this._width, this._height);
        this._ctx.drawImage(this.ui.video, this._frameXShift, 0, this._frameWidth, this._frameHeight);

        const currentMaskFrame = this._getCurrentMaskFrame();
        if (currentMaskFrame) {
            this._ctx.drawImage(currentMaskFrame, 0, 0, this._width, this._height);
        }
    },

    progress: function(value) {

        TweenLite.set(this._maskTimeline, {progress: value});

    },

    _getCurrentMaskFrame: function () {

        var radius = Math.max(this._width, this._height)/2;
        var gradient = this._ctx.createRadialGradient(this._width/2, this._height/2, 0, this._width/2, this._height/2, radius);

        gradient.addColorStop(this._maskTweenObj.stopTransparent, 'rgba(0, 0, 0, 0.000)');
        gradient.addColorStop(this._maskTweenObj.stopBlack, 'rgba(0, 0, 0, 1.000)');

        this._ctx.fillStyle = gradient;
        this._ctx.fillRect(0, 0, this._width, this._height)
        this._ctx.fill();

        return this.ui.underwaterCanvas;

    },

    _obtainMaskTimeline: function () {
        if (this._maskTimeline) return this._maskTimeline;

        const maskTimeline = new TimelineLite({paused: true, ease: Power0.easeNone});
        maskTimeline.fromTo(this._maskTweenObj, 1, {
            stopBlack: 1
        }, {
            stopBlack: 0
        });

        return this._maskTimeline = maskTimeline;
    },

    _tickHandler: function () {
        this._tick();
    },

    _videoCanPlayHandler: function () {
        // this.ui.video.play();
    },

    _resizeCompleteHandler: function () {
        this._setSizes();
    },

    _setProgressFromScroll: function () {

        if (!this._shown) {
            this.transitionIn();
            this._shown = true;
        }

        var progress = Math.min(Math.max(Scroll.Y() / Size.innerHeight(), 0), 1);
        this.progress(progress);

    },

    _scrollHandler: function (e) {
        this._setProgressFromScroll();
    }
});

export default BackgroundVideo;
