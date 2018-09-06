import { observable } from 'mobx';
import appStore from './AppStore';
import { getSnapshot, applySnapshot } from 'mobx-state-tree';

function prepareStore(storeInstance: any, newStore: any) {
  storeInstance.set(newStore);
}

// To support HMR of store, this ref holds the latest loaded store.
const appStoreInstance = observable.box(null);

prepareStore(appStoreInstance, appStore);

export { appStoreInstance };

const _module: any = module;
if (_module.hot) {
  if (_module.hot.data && _module.hot.data.appStore) {
    const _appStore = require('./AppStore').default;
    applySnapshot(_appStore, _module.hot.data.appStore);
    prepareStore(appStoreInstance, _appStore);
  }
  _module.hot.dispose((data: any) => {
    data.appStore = getSnapshot(appStore);
  });
}
