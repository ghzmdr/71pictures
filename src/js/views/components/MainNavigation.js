import { View } from '../../lib/View';
import { TweenLite, TimelineLite } from 'gsap';
import AppStore from '../../stores/AppStore';

const MainNavigation = View.extend({

    ui: {
        links: '.js-link'
    },

    initialize: function () {
        this.listenTo(AppStore, 'change:currentRoute', this._updateCurrentRoute)
    },

    _updateCurrentRoute: function () {
        var isActive, currentRoute = AppStore.get('currentRoute');
        this.ui.links.forEach(link => {
            isActive = currentRoute !== '/' && link.pathname.indexOf(currentRoute) !== -1;
            link.classList[isActive ? 'add' : 'remove']('is-active');
        });
    }

});

export default MainNavigation;
