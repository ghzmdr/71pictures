import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

const Menu = View.extend({

    events: {
        'click .js-menu-link': '_linkClickHandler'
    },

    initialize: function () {
        this.listenTo(AppStore, 'change:isMenuVisible', this._updateMenuVisibility);
    },

    _updateMenuVisibility: function () {
        if (AppStore.get('isMenuVisible')) {
            this._show();
        } else {
            this._hide();
        }
    },

    _show: function () {
        this._getTimeline().play();
    },

    _hide: function () {
        this._getTimeline().reverse();
    },

    _getTimeline: function () {
        if (this._timeline) return this._timeline;

        this._timeline = new TimelineLite();
        this._timeline.fromTo(this.el, 0.9, {x: '-100%'}, {x: '0%', force3D: true, ease: Power3.easeInOut});
        this._timeline.fromTo(this.el.children, 0.45, {x: '-10%', opacity: 0}, {x: '0%', opacity: 1, ease: Power2.easeInOut}, 0.4);
        this._timeline.fromTo(this.el.children, 0.4, {opacity: 0}, {x: '0%', ease: Power0.easeNone}, 0.45);

        return this._timeline;
    },

    _linkClickHandler: function () {
        AppActions.setMenuVisibility(false);
    }

});

export default Menu;
