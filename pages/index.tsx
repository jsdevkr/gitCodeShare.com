import * as React from 'react';
import '../assets/styles/app.ts';
import { Button, Icon, Card, Form, Input, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { StyledFlexContainer, RoundedButton } from '../styledComponents';

const FormItem = Form.Item;
const FlexContainer = StyledFlexContainer({
  align: 'center',
  justify: 'center',
  height: '100vh',
});

interface IProps extends FormComponentProps {}

class App extends React.Component<IProps> {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <FlexContainer>
        <Card
          title={
            <span>
              <Icon type="facebook" /> TITLE
            </span>
          }
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>

          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </Card>

        <Card style={{ width: 300 }}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <RoundedButton
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </RoundedButton>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </Card>
      </FlexContainer>
    );
  }
}

export default Form.create()(App);
