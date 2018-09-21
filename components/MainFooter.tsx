import React, { Component } from 'react';
import { styled, MContainer, MainNavMenu, FlexRightBox } from '../styledComponents';
import { Layout } from 'antd';
import Link from 'next/link';

interface IProps {}

const { Footer } = Layout;
const FooterWrap = styled(Footer as any)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
  height: 200px;
  background-color: ${props => props.theme.primaryColor};
`;

const FooterContainer = styled(MContainer as any)`
  display: inherit;

  address {
    margin: auto 0;
  }
`;

const RightBox = styled(FlexRightBox as any)`
  display: inline-block;
`;

class MainFooter extends Component<IProps> {
  render() {
    return (
      <FooterWrap>
        <FooterContainer>
          <address>GitCodeShare.com ⓒ 2018</address>
          <RightBox>
            <MainNavMenu mode="horizontal">
              <MainNavMenu.Item>
                <Link href="/">
                  <a>JSDEVKR</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="/">
                  <a>Contributors</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="/">
                  <a>Github Repository</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="/">
                  <a>Terms of Service</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="/">
                  <a>Privacy Police</a>
                </Link>
              </MainNavMenu.Item>
            </MainNavMenu>
          </RightBox>
        </FooterContainer>
      </FooterWrap>
    );
  }
}

export default MainFooter;
