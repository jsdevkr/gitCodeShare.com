import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { MainNav, MainFooter, CodeViewPage } from '../components';
import { SLayout } from '../styledComponents';
import { IAppStore } from '../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class Views extends React.Component<IProps> {
  render() {
    return (
      <SLayout>
        <MainNav />
        <CodeViewPage />
        <MainFooter />
      </SLayout>
    );
  }
}

export default Views;
