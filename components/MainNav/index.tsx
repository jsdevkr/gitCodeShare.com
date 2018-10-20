import React, { Component } from 'react';
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
import { ApiProvider } from '../../providers';

interface IProps {
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

class MainNav extends Component<IProps> {
  state = {
    fork: 0,
    star: 0,
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const fork = await ApiProvider.GithubRequest.getForkNum();
      const star = await ApiProvider.GithubRequest.getStarNum();
      this.setState({ fork, star });
    } catch (err) {
      this.setState({ fork: 0, star: 0 });
      console.log(err);
    }
  }

  render() {
    const { className } = this.props;
    const { fork, star } = this.state;
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
              <a data-align>
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
