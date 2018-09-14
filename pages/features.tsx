import * as React from 'react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, FeaturesPage } from '../components';
import { Layout } from 'antd';

interface IProps {}

class Features extends React.Component<IProps> {
  render() {
    return (
      <Layout>
        <MainNav />
        <FeaturesPage />
        <MainFooter />
      </Layout>
    );
  }
}

export default Features;
