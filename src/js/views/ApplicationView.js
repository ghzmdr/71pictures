import Backbone from 'backbone';
import { View } from '../lib/View';
import Scroll from '../lib/Scroll';
import Size from '../lib/Size';
import Menu from './overlays/Menu';
import MenuButton from './components/MenuButton';
import MainNavigation from './components/MainNavigation';
import AppStore from '../stores/AppStore';

const ApplicationView = View.extend({

    components: {
        menu: {selector: '.js-menu', type: Menu},
        buttonMenu: {selector: '.js-button-menu', type: MenuButton},
        mainNavigation: {selector: '.js-main-navigation', type: MainNavigation},
    },

    events: {
        'click [href^="http"]': '_routeClickHandler',
        'click [href^="/"]': '_routeClickHandler'
    },

    initialize: function () {
        this.listenTo(AppStore, 'change:isMenuVisible', this._updateMenuVisibility);
        this.listenTo(Size, 'resize', this._updateMenuVisibility);
    },

    _updateMenuVisibility: function () {
        if (Size.innerWidth() < 768) {
            AppStore.get('isMenuVisible') ? Scroll.lock() : Scroll.unlock();
        } else {
            Scroll.unlock();
        }
    },

    _routeClickHandler: function (e) {
        const target = e.delegateTarget || e.target;
        e.preventDefault();
        Backbone.history.navigate(target.pathname, { trigger: true });
    }
})

export default ApplicationView;
