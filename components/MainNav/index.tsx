import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
  styled,
  GithubButton,
  GithubBadge,
  SmDownloadButton,
  MainNavMenu,
  SContainer,
  FlexRightBox,
  RowFlex,
  SLogoImage,
} from '../../styledComponents';
import { Layout } from 'antd';
import Link from 'next/link';
import { IAppStore } from '../../stores/AppStore';

interface IProps {
  appStore?: IAppStore;
  className?: string;
}

const { Header } = Layout;
const Nav = styled(Header as any)`
  ${RowFlex};
  align-items: center;
  height: 70px;
  background-color: ${props => props.theme.primaryColor};
`;

const NavContainer = styled(SContainer as any)`
  display: inherit;
  align-items: center;

  a {
    margin: 0;

    &:hover,
    &:focus,
    &:active,
    &:visited {
      text-decoration: none;
    }
  }

  h1 {
    margin: 0 20px 0 0;
  }

  [data-align] {
    display: inherit;
    align-items: center;
  }

  [data-violet] {
    color: ${props => props.theme.colorPalette.blueViolet};
    &.ant-badge {
      background-color: ${props => props.theme.colorPalette.blueViolet};
    }
  }

  [data-magenta] {
    color: ${props => props.theme.colorPalette.deepMagenta};
    &.ant-badge {
      background-color: ${props => props.theme.colorPalette.deepMagenta};
    }
  }
`;

const RightBox = styled(FlexRightBox as any)`
  & {
    button {
      margin-right: 30px;
    }
    [data-align] {
      margin-right: 15px;
    }
  }
`;

@inject('appStore')
@observer
class MainNav extends Component<IProps> {
  render() {
    const { className, appStore } = this.props;
    const { fork, star } = appStore;
    return (
      <Nav className={className}>
        <NavContainer>
          <h1 data-align>
            <Link href="/">
              <a data-align>
                <SLogoImage />
              </a>
            </Link>
          </h1>
          <MainNavMenu mode="horizontal">
            <MainNavMenu.Item>
              <Link href="/contributors">
                <a>Contributors</a>
              </Link>
            </MainNavMenu.Item>
            <MainNavMenu.Item>
              <Link href="/features">
                <a>Features</a>
              </Link>
            </MainNavMenu.Item>
          </MainNavMenu>
          <RightBox>
            <Link href="/extension">
              <a
                href="//chrome.google.com/webstore/detail/gitcodeshare/fegiblhnedcljeapaigmgnfjceochhhg"
                target="blank"
                data-align
              >
                <SmDownloadButton icon="chrome">Add to Chrome</SmDownloadButton>
              </a>
            </Link>
            <a href="https://github.com/kosslab-kr/gitCodeShare.com/stargazers" target="blank" data-align>
              <GithubButton data-violet icon="github">
                Star
              </GithubButton>
              <GithubBadge data-violet count={star} />
            </a>
            <a href="https://github.com/kosslab-kr/gitCodeShare.com/network/members" target="blank" data-align>
              <GithubButton data-magenta icon="github">
                Fork
              </GithubButton>
              <GithubBadge data-magenta count={fork} />
            </a>
          </RightBox>
        </NavContainer>
      </Nav>
    );
  }
}

export default MainNav;
