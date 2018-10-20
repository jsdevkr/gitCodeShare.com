import * as React from 'react';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../stores/AppStore';
import { default as ApiProvider } from '../providers/ApiProvider';
import { MainNav, MainFooter, MainPage } from '../components';
import { SLayout } from '../styledComponents';
import { CodeViewPage } from '../components';
import { decodeParams as decode } from '../common/utils';

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
  static async getInitialProps({ query }: { query: any }) {
    // NOTE : fetch base url
    console.log(process.env.BACKEND_URL);

    if (query.state) {
      return { state: decode(query.state) };
    } else {
      return { gistId: Object.keys(query)[0] };
    }
  }

  state = { starredList: [] };

  componentDidMount() {
    this.getStarred();
  }

  async getStarred() {
    try {
      const starredList = await ApiProvider.GistRequest.getStarredGists();
      console.log(starredList);
      this.setState({ starredList });
    } catch (err) {
      this.setState({ starredList: [] });
      console.log(err);
    }
  }

  render() {
    const { gistId, state } = this.props;
    const { starredList } = this.state;

    gistId && this.props.appStore.editor.getGist(gistId);
    state && state.code && this.props.appStore.editor.setCode(state.code);
    return (
      <SLayout>
        <MainNav />
        {gistId || state ? <CodeViewPage /> : <MainPage starredList={starredList} />}
        <MainFooter />
      </SLayout>
    );
  }
}

export default App;
