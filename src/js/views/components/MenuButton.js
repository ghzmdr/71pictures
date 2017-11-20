import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';

const MenuButton = View.extend({

    ui: {
        burgerLines: '.js-burger-line',
        crossLines: '.js-cross-line'
    },

    events: {
        'click': '_clickHandler'
    },

    initialize: function () {
        this.listenTo(AppStore, 'change:isMenuVisible', this._updateMenuVisibility);
    },

    _updateMenuVisibility: function () {
        if (AppStore.get('isMenuVisible')) {
            this._showCross();
        } else {
            this._showBurger();
        }
    },

    _showBurger: function () {

        this._crossOut();
        this._burgerIn();

    },

    _showCross: function () {

        this._crossIn();
        this._burgerOut();

    },

    _burgerIn: function () {
        TweenLite.killTweensOf(this.ui.burgerLines);
        this.ui.burgerLines.forEach((line, i) => {
            TweenLite.fromTo(line, 0.3, {scaleX: '0'}, { scaleX: '1', transformOrigin: 'center left', delay: 0.2 + i * 0.1});
        });
    },

    _burgerOut: function () {
        TweenLite.killTweensOf(this.ui.burgerLines);
        this.ui.burgerLines.forEach((line, i) => {
            TweenLite.fromTo(line, 0.3, {scaleX: '1'}, {scaleX: '0', delay: i * 0.1, transformOrigin: 'center right'});
        });
    },

    _crossIn: function () {
            TweenLite.set(this.ui.crossLines, {opacity: 1});
            TweenLite.killTweensOf(this.ui.crossLines);
            TweenLite.fromTo(this.ui.crossLines[1], 0.5, {y: '-110%'}, {y: '0%', delay: 0.2});
            TweenLite.fromTo(this.ui.crossLines[0], 0.5, {x: '-110%'}, {x: '0%', delay: 0.25});
    },

    _crossOut: function () {

            TweenLite.killTweensOf(this.ui.crossLines);
            TweenLite.fromTo(this.ui.crossLines[1], 0.5, {y: '0%'}, {y: '110%', delay: 0.05});
            TweenLite.fromTo(this.ui.crossLines[0], 0.5, {x: '0%'}, {x: '110%'});
    },

    _clickHandler: function () {
        AppActions.setMenuVisibility(!AppStore.get('isMenuVisible'));
    }

});

export default MenuButton;
