import { View } from '../../lib/View';
import { TweenLite } from 'gsap';
import plyr from 'plyr';


const ArticlePage = View.extend({
    ui: {
        videos: '.js-video'
    },

    onInitialized: function () {

        if (this.ui.videos && this.ui.videos.length) this.ui.videos.forEach(v => {
            plyr.setup(v, {});
        })

    },



})

export default ArticlePage;
