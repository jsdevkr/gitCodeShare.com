import { Editor } from './Editor';
import { Instance, types, flow } from 'mobx-state-tree';
import ApiProvider from '../providers/ApiProvider';

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
  })
  .actions(self => {
    const init = flow(function*() {
      self.loaded = true;
      return {};
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
    };
  });

export interface IAppStore extends Instance<typeof AppStore> {}

const appStore = AppStore.create({}, { provider: ApiProvider });

appStore.init();

export default appStore;
