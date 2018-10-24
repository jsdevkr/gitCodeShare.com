import * as React from 'react';
import { inject } from 'mobx-react';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { SLayout } from '../styledComponents';
import { ApiProvider } from '../providers';
import { IContributor } from '../model/contributors';

interface IProps {
  contributors?: IContributor[];
  star?: number;
  fork?: number;
}

@inject('appStore')
class Contributors extends React.Component<IProps> {
  static async getInitialProps({ query }: { query: any }) {
    let contributors: IContributor[];
    let star: number = 0;
    let fork: number = 0;

    try {
      contributors = await ApiProvider.GithubRequest.getContributors();
      star = await ApiProvider.GithubRequest.getStarNum();
      fork = await ApiProvider.GithubRequest.getForkNum();
    } catch (err) {
      console.log(err);
    }

    return {
      contributors,
      fork,
      star,
    };
  }

  render() {
    const { contributors, star, fork } = this.props;
    return (
      <SLayout>
        <MainNav star={star} fork={fork} />
        <ContributorsPage contributors={contributors} />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Contributors;
