import { View } from 'lib/View';
import YouTubeModule from 'modules/YouTubeModule';
import Size from 'lib/Size';
import {bindAll} from 'lodash';

export default View.extend({

    onClose: function () {
        if (this._youtubeModule) {
            this._youtubeModule.kill();
        }
    },

    onInitialized: function () {
        switch (this.el.dataset.type) {
            case 'youtube':
                this._initYouTube();
                break;
        }
    },

    _initYouTube() {
        this._youtubeModule = new YouTubeModule(this.el, {videoId: this.el.dataset.videoId})
    }

});
