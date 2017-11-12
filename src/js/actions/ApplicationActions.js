import ApplicationStore from '../stores/ApplicationStore';

class AppActions {

    setMenuVisibility( boolean) {
        ApplicationStore.set('isMenuVisible', boolean);
    }

}

export default new AppActions();
