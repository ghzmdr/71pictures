import { View } from 'lib/View';
import Size from 'lib/Size';
import {bindAll} from 'lodash';
import Masonry from 'masonry-layout';

import ImagesLoadedModule from 'modules/ImagesLoadedModule';

export default View.extend({

    ui: {
        items: '.js-masonry-item',
        images: '.js-masonry-item img'
    },

    onInitialized: function () {

        if (!(this.ui.items instanceof Array)) {
            this.ui.items = [this.ui.items];
        }

        this._imagesLoadedModule = new ImagesLoadedModule(this.ui.images);
        this.listenTo(this._imagesLoadedModule, 'images:loaded', this._imagesLoadedHandler)
        this.listenTo(Size, 'resize', this._resizeHandler);
        this._layout();
    },

    _layout: function () {
        this._masonry = new Masonry(this.el, {
            itemSelector: '.js-masonry-item',
            columnWidth: '.js-masonry-item',
            percentPosition: true
        })
    },

    _resizeHandler: function () {
        this._layout();
    },

    _imagesLoadedHandler: function () {
        this._layout();
    }


});
