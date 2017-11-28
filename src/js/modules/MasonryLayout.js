import Size from '../lib/Size';
import {bindAll} from 'lodash';

export default class MasonryLayout {


    constructor({grid, items}) {
        bindAll(this, '_resizeHandler');
        this.grid = grid;
        this.items = items;

        this.layout();
        Size.on('resize', this._resizeHandler);
    }

    layout() {

        cancelAnimationFrame(this._RAFLayout);
        this._layout(this.items, 0, 10);

    }

    _layout(items, start, step) {

        var item, rows;
        var max = Math.min(start + step, items.length);

        for (var i = start; i < max; ++i) {
            item = items[i];
            rows = Math.ceil(item.children[0].clientHeight / 5);
            item.style.gridRowEnd = 'span ' + rows;
        }

        if (max >= items.length) return

        start = max;
        this._RAFLayout = requestAnimationFrame(this._layout.bind(null, items, start, step));
    }

    _resizeHandler() {
        this.layout();
    }

    kill() {
        Size.off('resize', this._resizeHandler);
    }
}
