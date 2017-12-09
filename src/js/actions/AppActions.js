import AppStore from 'stores/AppStore';

class AppActions {

    setMenuVisibility(boolean) {
        AppStore.set('isMenuVisible', boolean);
    }

    setCurrentRoute(route) {
        if (route[0] === '_') {
            route = route.substr(1);
        }

        if (route === 'home') {
            route = '/'
        }

        AppStore.set('currentRoute', route);
    }

}

export default new AppActions();
