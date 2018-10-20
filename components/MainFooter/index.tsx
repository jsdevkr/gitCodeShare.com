import React, { Component } from 'react';
import { styled, SContainer, MainNavMenu, FlexRightBox, RowFlex } from '../../styledComponents';
import { Layout } from 'antd';
import Link from 'next/link';

interface IProps {}

const { Footer } = Layout;
const FooterWrap = styled(Footer as any)`
  ${RowFlex};
  height: 200px;
  background-color: ${props => props.theme.primaryColor};
`;

const FooterContainer = styled(SContainer as any)`
  display: inherit;
  padding-top: 28px;

  address {
    margin: auto 0;
  }
`;

class MainFooter extends Component<IProps> {
  render() {
    return (
      <FooterWrap>
        <FooterContainer>
          <address>GitCodeShare.com ⓒ 2018</address>
          <FlexRightBox>
            <MainNavMenu mode="horizontal">
              <MainNavMenu.Item>
                <Link href="https://jsdev.kr/">
                  <a target="_blank">JSDEVKR</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="/contributors">
                  <a>Contributors</a>
                </Link>
              </MainNavMenu.Item>
              <MainNavMenu.Item>
                <Link href="https://github.com/kosslab-kr/gitCodeShare.com">
                  <a target="_blank">Github Repository</a>
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
          </FlexRightBox>
        </FooterContainer>
      </FooterWrap>
    );
  }
}

export default MainFooter;
