import * as React from 'react';
import 'isomorphic-unfetch';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../stores/AppStore';
import { MainNav, MainFooter, Sample } from '../components';
import { MainPageCarousel, SContainer } from '../styledComponents';
import { Layout } from 'antd';
import { observable } from 'mobx';

interface IProps {
  appStore?: IAppStore;
}

@inject('appStore')
@observer
class App extends React.Component<IProps> {
  @observable
  active = true;
  /*
  static async getInitialProps() {
    // NOTE : fetch base url
    console.log(process.env.BACKEND_URL);
    return Promise.resolve({});

  }
  */

  handleActive = () => {
    this.active = !this.active;
  };

  render() {
    const { Content } = Layout;
    return (
      <Layout>
        {this.active ? <MainNav /> : null}
        <Content>
          <SContainer>
            <Sample />
            <MainPageCarousel>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <button onClick={this.handleActive}>토글</button>
            </MainPageCarousel>
          </SContainer>
        </Content>
        <MainFooter />
      </Layout>
    );
  }
}

export default App;
