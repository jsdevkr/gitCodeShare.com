import * as React from 'react';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import appStore, { IAppStore } from '../stores/AppStore';
import { default as ApiProvider } from '../providers/ApiProvider';
import { MainNav, MainFooter, MainPage } from '../components';
import { SLayout } from '../styledComponents';
import { CodeViewPage } from '../components';
import { decodeParams as decode } from '../common/utils';
import { IGist } from 'model/gist';

interface IProps {
  appStore?: IAppStore;
  gistId: string;
  state: {
    code: String;
  };
}

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  @observable
  starredList: IGist[] = [];
  static async getInitialProps({ query }: { query: any }) {
    console.log(process.env.BACKEND_URL);

    if (query.state) {
      return { state: decode(query.state) };
    } else {
      const gistId = Object.keys(query)[0];
      // if (gistId) {
      //   await appStore.editor.getGist(gistId);
      // }
      return { gistId };
    }
  }

  componentDidMount() {
    this.getStarred();
  }

  async getStarred() {
    try {
      const starredList = await ApiProvider.GistRequest.getStarredGists();
      console.log(starredList);
      this.starredList = starredList;
    } catch (err) {
      this.starredList = [];
      console.log(err);
    }
  }

  render() {
    const { gistId, state } = this.props;

    gistId && appStore.editor.getGist(gistId);
    state && state.code && appStore.editor.setCode(state.code);
    return (
      <SLayout>
        <MainNav />
        {gistId || state ? <CodeViewPage /> : <MainPage starredList={this.starredList} />}
        <MainFooter />
      </SLayout>
    );
  }
}

export default App;
