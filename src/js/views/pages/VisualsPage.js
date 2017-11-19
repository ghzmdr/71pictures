import Size from '../../lib/Size';
import { View } from '../../lib/View';
import MasonryLayout from '../../modules/MasonryLayout';

import { TweenLite } from 'gsap';

const VisualsPage = View.extend({

    ui: {
        masonry: '.js-masonry',
        masonryItems: '.js-masonry-item'
    },

    onInitialized: function () {
        this._masonry = new MasonryLayout({
            grid: this.ui.masonry,
            items: this.ui.masonryItems
        })
    }

})

export default VisualsPage;
