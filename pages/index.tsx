import * as React from 'react';
import 'isomorphic-unfetch';

// import { Button, Icon, Card, Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RoundedButton } from '../styledComponents';
import { Sample } from '../components';

interface IProps extends FormComponentProps {}

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
      <>
        <Sample />
        <RoundedButton>Button</RoundedButton>
      </>
    );
  }
}

export default App;
