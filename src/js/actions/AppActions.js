import AppStore from '../stores/AppStore';

class AppActions {

    setMenuVisibility( boolean) {
        AppStore.set('isMenuVisible', boolean);
    }

}

export default new AppActions();
