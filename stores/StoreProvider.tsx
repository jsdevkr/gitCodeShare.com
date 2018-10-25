import * as React from 'react';
import { Provider as MobxProvider, observer } from 'mobx-react';
import { appStoreInstance } from './create';
import { applySnapshot } from 'mobx-state-tree';

const StoreProvider = observer(props => {
  if (props.initialState) {
    applySnapshot(appStoreInstance.get(), props.initialState);
  }
  return <MobxProvider appStore={appStoreInstance.get()}>{props.children}</MobxProvider>;
});

if (process.env.NODE_ENV !== 'production') {
  if (typeof window !== 'undefined') {
    (window as any).appStore = appStoreInstance.get();
  }
}

export default StoreProvider;
