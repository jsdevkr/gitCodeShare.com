import * as React from 'react';
import { Provider as MobxProvider, observer } from 'mobx-react';
import { appStoreInstance } from './create';

const StoreProvider = observer(props => {
  return <MobxProvider appStore={appStoreInstance.get()}>{props.children}</MobxProvider>;
});

// if (process.env.NODE_ENV !== 'production') {
//   (window as any).appStore = appStoreInstance.get();
// }

export default StoreProvider;
