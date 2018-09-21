import * as React from 'react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { SLayout } from '../styledComponents';

interface IProps {}

class Contributors extends React.Component<IProps> {
  render() {
    return (
      <SLayout>
        <MainNav />
        <ContributorsPage />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Contributors;
