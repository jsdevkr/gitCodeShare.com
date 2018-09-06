import * as React from 'react';
import 'isomorphic-unfetch';
// import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { IAppStore } from '../stores/AppStore';
import { RoundedButton } from '../styledComponents';
import { Sample } from '../components';

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
    const { appStore } = this.props;
    const { spinning, setSpinning, alert } = appStore;
    return (
      <>
        {spinning}
        <Sample />
        <RoundedButton
          onClick={() => {
            setSpinning(true);
          }}
        >
          Button spinning
        </RoundedButton>
        <RoundedButton
          onClick={() => {
            alert('success');
          }}
        >
          Button alert
        </RoundedButton>
      </>
    );
  }
}

export default App;
