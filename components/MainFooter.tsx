import React, { Component } from 'react';
import { styled, MContainer } from '../styledComponents';
import { Layout } from 'antd';

interface IProps {}

const { Footer } = Layout;
const FooterWrap = styled(Footer as any)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
  height: 64px;
  background-color: #fff;
`;

class MainFooter extends Component<IProps> {
  render() {
    return (
      <FooterWrap>
        <MContainer>footer</MContainer>
      </FooterWrap>
    );
  }
}

export default MainFooter;
