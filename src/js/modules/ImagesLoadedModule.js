import { Events } from 'backbone';
import { bindAll } from 'lodash';

export default class ImagesLoadedModule {
    constructor(images) {
        Object.assign(this, Events);
        bindAll(this, '_imageLoadHandler');

        this._images = images;
        this._count = images.length;
        this._missing = this._count;

        this._setupListeners();
    }

    close() {
        this._removeListeners();
    }

    _setupListeners() {
        this._images.forEach(img => {
            if (img.complete) {
                --this._missing;
            } else {
                img.addEventListener('load', this._imageLoadHandler);
            }

            this._checkCompletion();
        })
    }

    _complete() {
        this.trigger('images:loaded');
        this._removeListeners();
    }

    _removeListeners() {
        this._images.forEach(i => i.removeEventListener('load', this._imageLoadHandler))
    }

    _imageLoadHandler() {
        --this._missing;
        this._checkCompletion();
    }

    _checkCompletion() {
        if (this._missing === 0) {
            this._complete();
        }
    }
}
