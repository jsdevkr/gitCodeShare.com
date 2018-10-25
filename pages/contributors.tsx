import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { SLayout } from '../styledComponents';
import { ApiProvider } from '../providers';
import { IContributor } from '../model/contributors';
import { IAppStore } from '../stores/AppStore';

interface IProps {
  contributors?: IContributor[];
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class Contributors extends React.Component<IProps> {
  static async getInitialProps({ query }: { query: any }) {
    let contributors: IContributor[];
    try {
      contributors = await ApiProvider.GithubRequest.getContributors();
    } catch (err) {
      console.log(err);
    }

    return {
      contributors,
    };
  }

  render() {
    const { contributors } = this.props;
    return (
      <SLayout>
        <MainNav />
        <ContributorsPage contributors={contributors} />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Contributors;
