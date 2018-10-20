import ApiProvider from '../providers/ApiProvider';

export { default as AppStore, IAppStore } from './AppStore';
export { default as create } from './create';
export { default as StoreProvider } from './StoreProvider';

export interface IStoreEnv {
  provider: typeof ApiProvider;
}
