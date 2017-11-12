import Backbone from 'backbone';
import { View } from '../lib/View';
import Scroll from '../lib/Scroll';
import Cover from './components/Cover';
import Menu from './components/Menu';
import MenuButton from './components/MenuButton';
import ApplicationStore from '../stores/ApplicationStore';

const ApplicationView = View.extend({

    components: {
        cover: {selector: '.js-cover', type: Cover},
        menu: {selector: '.js-menu', type: Menu},
        buttonMenu: {selector: '.js-button-menu', type: MenuButton}
    },

    events: {
        'click [href^="/"]': '_routeClickHandler',
        'click [href^="http"]': '_routeClickHandler'
    },

    initialize: function () {
        this.listenTo(ApplicationStore, 'change:isMenuVisible', this._updateMenuVisibility);
    },

    _updateMenuVisibility: function () {
        ApplicationStore.get('isMenuVisible') ? Scroll.lock() : Scroll.unlock();
    },

    _routeClickHandler: function (e) {
        const target = e.delegateTarget || e.target;

        const isDev = window.location.hostname.indexOf('localhost') == 0 && target.hostname.indexOf('71p') === 0;

        if (!isDev && target.hostname !== window.location.hostname) {
            return;
        }

        e.preventDefault();
        Backbone.history.navigate(target.pathname, { trigger: true });
    }
})

export default ApplicationView;
