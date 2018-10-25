import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainNav, MainFooter, FeaturesPage } from '../components';
import { SLayout } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
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
