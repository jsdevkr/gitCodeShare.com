import * as React from 'react';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { SLayout } from '../styledComponents';
import { ApiProvider } from '../providers';

interface IProps {}

class Contributors extends React.Component<IProps> {
  state = { contributors: [] };

  componentDidMount() {
    this.getContributors();
  }

  async getContributors() {
    try {
      const contributors = await ApiProvider.GithubRequest.getContributors();
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
