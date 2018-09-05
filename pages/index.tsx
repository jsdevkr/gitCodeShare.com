import * as React from 'react';

// import { Button, Icon, Card, Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { RoundedButton } from '../styledComponents';
import { Sample } from '../components';

const FormItem = Form.Item;
const FlexContainer = StyledFlexContainer({
  align: 'center',
  justify: 'center',
});

interface IProps extends FormComponentProps {}

function test(t: any) {
  return t;
}

@test
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
