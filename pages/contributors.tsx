import * as React from 'react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, ContributorsPage } from '../components';
import { Layout } from 'antd';

interface IProps {}

class Contributors extends React.Component<IProps> {
  render() {
    return (
      <Layout>
        <MainNav />
        <ContributorsPage />
        <MainFooter />
      </Layout>
    );
  }
}

export default Contributors;
