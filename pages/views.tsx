import * as React from 'react';
import { observer } from 'mobx-react';
import 'isomorphic-unfetch';
import '../assets/styles/app';
import { MainNav, MainFooter, CodeViewPage } from '../components';
import { SLayout } from '../styledComponents';

interface IProps {}

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
