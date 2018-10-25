import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { observable } from 'mobx';
import { IAppStore } from '../stores/AppStore';
import { appStoreInstance } from '../stores/create';
import { MainNav, MainFooter, MainPage } from '../components';
import { SLayout } from '../styledComponents';
import { CodeViewPage } from '../components';
import { decodeParams as decode } from '../common/utils';

interface IProps {
  appStore?: IAppStore;
  editorMode?: boolean;
}

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  static async getInitialProps({ query }: { query: any }) {
    console.log(process.env.BACKEND_URL);
    const appStore: IAppStore = appStoreInstance.get();
    let editorMode = false;

    if (query.state) {
      const state = decode(query.state);
      state && state.code && appStore.editor.setCode(state.code);
      editorMode = true;
    } else {
      try {
        const gistId = Object.keys(query)[0];
        if (gistId) {
          await appStore.editor.getGist(gistId);
          editorMode = true;
        } else {
          await appStore.getStarredGists();
        }
      } catch (err) {
        console.log(err);
      }
    }

    return { editorMode };
  }

  render() {
    const { editorMode } = this.props;
    console.log('editorMode', editorMode);

    return (
      <SLayout>
        <MainNav />
        {editorMode ? <CodeViewPage /> : <MainPage />}
        <MainFooter />
      </SLayout>
    );
  }
}

export default App;
