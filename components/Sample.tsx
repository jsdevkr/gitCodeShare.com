import * as React from 'react';
import { styled, RoundedButton } from '../styledComponents';

interface IProps {}

const Component = styled.div`
  margin: 50px;

  [data-title] {
    font-size: 20px;
    color: ${props => props.theme.primaryColor};
  }
  [data-item] {
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

class Sample extends React.Component<IProps> {
  render() {
    return (
      <Component>
        <div data-title>I am Title</div>
        <div data-item>Item</div>
        <div data-item>Item</div>
        <RoundedButton>Button</RoundedButton>
      </Component>
    );
  }
}

export default Sample;
