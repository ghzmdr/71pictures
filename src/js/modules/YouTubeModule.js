import {Events} from 'backbone';

const defaultOptions = {

};

export default class YouTubeModule {
    constructor(el, options) {
        Object.assign(this, Events);
        this.el = el;
        this._options = options || defaultOptions;

        if (window.YT && window.YT.Player) {
            this._init();
        } else {
            this._initAPI();
        }
    }

    kill() {
        if (this._player) this._player.destroy();
    }

    _init() {
        delete window.onYouTubeIframeAPIReady;

        this._player = new YT.Player(this.el,
            Object.assign({}, this._options, {
                events: {
                    'onReady': this._playerReadyHandler.bind(this),
                    'onStateChange': this._playerStateChangeHandler.bind(this)
                }
            })
        );
    }

    _initAPI() {

        window.onYouTubeIframeAPIReady = this._init.bind(this);

        // https://developers.google.com/youtube/iframe_api_reference
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    }

    _playerReadyHandler() {
        this.trigger('ready');
    }

    _playerStateChangeHandler() {

    }

}
