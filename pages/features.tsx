import * as React from 'react';
import { inject } from 'mobx-react';
import { MainNav, MainFooter, FeaturesPage } from '../components';
import { SLayout } from '../styledComponents';
import { ApiProvider } from '../providers';

interface IProps {
  star?: number;
  fork?: number;
}

@inject('appStore')
class Features extends React.Component<IProps> {
  static async getInitialProps({ query }: { query: any }) {
    let star: number = 0;
    let fork: number = 0;

    try {
      star = await ApiProvider.GithubRequest.getStarNum();
      fork = await ApiProvider.GithubRequest.getForkNum();
    } catch (err) {
      console.log(err);
    }

    return {
      fork,
      star,
    };
  }

  render() {
    const { fork, star } = this.props;
    return (
      <SLayout>
        <MainNav fork={fork} star={star} />
        <FeaturesPage />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Features;
