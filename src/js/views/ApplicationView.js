import Backbone from 'backbone';
import { View } from 'lib/View';
import Scroll from 'lib/Scroll';
import Size from 'lib/Size';
import Menu from 'views/overlays/Menu';
import MenuButton from 'views/components/MenuButton';
import MainNavigation from 'views/components/MainNavigation';
import AppStore from 'stores/AppStore';
import {sharePopup} from 'utils/Share';

const ApplicationView = View.extend({

    components: {
        menu: {selector: '.js-menu', type: Menu},
        buttonMenu: {selector: '.js-button-menu', type: MenuButton},
        mainNavigation: {selector: '.js-main-navigation', type: MainNavigation},
    },

    events: {
        'click [href^="http"]': '_routeClickHandler',
        'click [href^="/"]': '_routeClickHandler',
        'click [data-share-current]': '_shareClickHandler'
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
    },

    _shareClickHandler: function (e) {
        const platform = (e.delegateTarget || e.target).dataset.shareCurrent;
        sharePopup(platform, window.location.href);
    }
})

export default ApplicationView;
