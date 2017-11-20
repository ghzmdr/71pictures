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
        let item, rows;
        for (let i = 0; i < this.items.length; ++i) {
            item = this.items[i];
            rows = Math.ceil(item.children[0].clientHeight / 5);
            item.style.gridRowEnd = 'span ' + rows;
        }
    }

    _resizeHandler() {
        this.layout();
    }

    kill() {
        Size.off('resize', this._resizeHandler);
    }
}
