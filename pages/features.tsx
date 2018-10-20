import * as React from 'react';
import { MainNav, MainFooter, FeaturesPage } from '../components';
import { SLayout } from '../styledComponents';

interface IProps {}

class Features extends React.Component<IProps> {
  render() {
    return (
      <SLayout>
        <MainNav />
        <FeaturesPage />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Features;
