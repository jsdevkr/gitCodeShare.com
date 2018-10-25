import { Editor } from './Editor';
import { Instance, types, flow, getEnv } from 'mobx-state-tree';
import ApiProvider from '../providers/ApiProvider';
import { IStoreEnv } from './';
import { Gist, IGist } from '../model/gist';

const AlertMessage = types.model('Alert', {
  message: types.maybe(types.string),
  messageType: types.enumeration('type', ['success', 'info', 'warning', 'error']),
});

export interface IAlertMessage extends Instance<typeof AlertMessage> {}

export const AppStore = types
  .model('AppStore', {
    loaded: types.optional(types.boolean, false),
    spinning: types.optional(types.boolean, false),
    spinningTip: types.optional(types.string, ''),
    // alert
    alertMessages: types.optional(types.array(AlertMessage), []),
    editor: types.optional(Editor, {}),
    star: types.optional(types.number, 0),
    fork: types.optional(types.number, 0),
    starredGists: types.optional(types.map(Gist), {}),
  })
  .views(self => ({
    get provider() {
      return getEnv<IStoreEnv>(self).provider;
    },
    get starredList() {
      return [...self.starredGists.values()];
    },
  }))
  .actions(self => {
    function addStarredGists(gist: IGist) {
      if (self.starredGists.get(gist.id + '')) {
        self.starredGists.set(gist.id + '', gist);
      } else {
        self.starredGists.put(gist);
      }
    }

    const getStar = flow(function*() {
      const star = yield self.provider.GithubRequest.getStarNum();
      self.star = star;
    });

    const getFork = flow(function*() {
      const fork = yield self.provider.GithubRequest.getForkNum();
      self.fork = fork;
    });

    const init = flow(function*() {
      yield getStar();
      yield getFork();
      self.loaded = true;
      return {};
    });

    const getStarredGists = flow(function*() {
      const starredGists: IGist[] = yield self.provider.GistRequest.getStarredGists();
      self.starredGists.clear();
      starredGists.forEach(addStarredGists);
    });

    function setSpinning(value: boolean, tip?: string) {
      self.spinning = value;
      self.spinningTip = tip || '';
    }

    function alert(message: string = '', messageType: 'success' | 'info' | 'warning' | 'error' = 'error') {
      self.alertMessages.push({
        message,
        messageType,
      });
    }

    function alertClear() {
      self.alertMessages.clear();
    }

    return {
      init,
      setSpinning,
      alert,
      alertClear,
      getStar,
      getFork,
      getStarredGists,
    };
  });

export interface IAppStore extends Instance<typeof AppStore> {}

const appStore = AppStore.create({}, { provider: ApiProvider });

export default appStore;
