import Size from '../../lib/Size';
import { View } from '../../lib/View';
import MasonryLayout from '../../modules/MasonryLayout';

import { TweenLite } from 'gsap';

const VisualsPage = View.extend({

    ui: {
        masonry: '.js-masonry',
        masonryItems: '.js-masonry-item'
    },

    onClose: function () {
        if (this._masonry) this._masonry.kill();
    },

    onInitialized: function () {
        this._masonry = new MasonryLayout({
            grid: this.ui.masonry,
            items: this.ui.masonryItems
        })
    },

    transitionIn: function() {
        TweenLite.fromTo(this.el, 0.4, {autoAlpha: 1}, {autoAlpha: 1});
    },

    transitionOut: function (cb) {
        TweenLite.to(this.el, 0.3, {opacity: 0, onComplete: cb})
    }


})

export default VisualsPage;
