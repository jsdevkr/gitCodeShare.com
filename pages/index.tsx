import * as React from 'react';
import { inject, observer } from 'mobx-react';
// import { observable } from 'mobx';
import appStore, { IAppStore } from '../stores/AppStore';
import { ApiProvider } from '../providers';
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
  starredList: IGist[];
  gistDetail: IGist;
  star?: number;
  fork?: number;
}

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  // @observable
  // starredList: IGist[] = [];

  // @observable
  // gistDetail: IGist = {};

  static async getInitialProps({ query }: { query: any }) {
    console.log(process.env.BACKEND_URL);
    if (query.state) {
      return { state: decode(query.state) };
    } else {
      const gistId = Object.keys(query)[0];
      let gistDetail: IGist = {};
      let starredList: IGist[] = [];
      let star: number = 0;
      let fork: number = 0;

      try {
        starredList = await ApiProvider.GistRequest.getStarredGists();
        star = await ApiProvider.GithubRequest.getStarNum();
        fork = await ApiProvider.GithubRequest.getForkNum();

        if (gistId) {
          gistDetail = await ApiProvider.GistRequest.getGist(gistId);
        }
      } catch (err) {
        console.log(err);
      }

      return { gistId, gistDetail, starredList, star, fork };
    }
  }

  // componentDidMount() {
  //   this.getStarred();
  //   this.getGistDetail();
  // }

  // async getGistDetail() {
  //   const { gistId } = this.props;
  //   try {
  //     const gistDetail: IGist = await ApiProvider.GistRequest.getGist(gistId);
  //     this.gistDetail = gistDetail;
  //   } catch (err) {
  //     this.gistDetail = {};
  //     console.log(err);
  //   }
  // }

  // async getStarred() {
  //   try {
  //     const starredList = await ApiProvider.GistRequest.getStarredGists();
  //     this.starredList = starredList;
  //   } catch (err) {
  //     this.starredList = [];
  //     console.log(err);
  //   }
  // }

  render() {
    const { gistId, state, gistDetail, starredList, star, fork } = this.props;

    gistId && appStore.editor.getGist(gistId);
    state && state.code && appStore.editor.setCode(state.code);

    return (
      <SLayout>
        <MainNav star={star} fork={fork} />
        {gistId || state ? <CodeViewPage gistDetail={gistDetail} /> : <MainPage starredList={starredList} />}
        <MainFooter />
      </SLayout>
    );
  }
}

export default App;
