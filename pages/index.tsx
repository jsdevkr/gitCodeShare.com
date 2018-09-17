import * as React from 'react';
import 'isomorphic-unfetch';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../stores/AppStore';
import { MainNav, MainFooter, MainPage } from '../components';
import { Layout } from 'antd';

interface IProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  /*
  static async getInitialProps() {
    // NOTE : fetch base url
    console.log(process.env.BACKEND_URL);
    return Promise.resolve({});

  }
  */

  render() {
    return (
      <Layout>
        <MainNav />
        <MainPage />
        <MainFooter />
      </Layout>
    );
  }
}

export default App;
