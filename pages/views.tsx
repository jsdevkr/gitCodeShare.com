import * as React from 'react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, ViewsPage } from '../components';
import { SLayout } from '../styledComponents';

interface IProps {}

class Views extends React.Component<IProps> {
  render() {
    return (
      <SLayout>
        <MainNav />
        <ViewsPage />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Views;
