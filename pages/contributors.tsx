import * as React from 'react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { SLayout } from '../styledComponents';
import { ApiProvider } from '../providers';
import { IContributor } from '../model/contributors';

interface IProps {}

class Contributors extends React.Component<IProps> {
  state = { contributors: [] };

  componentDidMount() {
    this.getContributors();
  }

  async getContributors() {
    try {
      const contributors: IContributor = await ApiProvider.GithubRequest.getContributors();
      this.setState({ contributors });
    } catch (err) {
      this.setState({ contributors: [] });
      console.log(err);
    }
  }

  render() {
    const { contributors } = this.state;
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
