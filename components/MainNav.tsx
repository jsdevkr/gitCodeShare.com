import React, { Component } from 'react';
import {
  styled,
  GithubButton,
  GithubBadge,
  BorderlessButton,
  MainNavMenu,
  MContainer,
  FlexRightBox,
} from '../styledComponents';
import { Layout } from 'antd';
import Link from 'next/link';

interface IProps {
  className?: string;
}

const { Header } = Layout;
const Nav = styled(Header as any)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
  height: 64px;
  background-color: #fff;
`;

const NavContainer = styled(MContainer as any)`
  display: inherit;
  align-items: center;

  h1,
  a {
    margin: 0;
  }

  [data-align] {
    display: inherit;
    align-items: center;

    button {
      margin: 0;
    }
  }
`;

const RightBox = styled(FlexRightBox as any)`
  & {
    button,
    img,
    div {
      margin-right: 15px;
    }
  }
`;

const GithubButtonWithBadge = styled(GithubButton as any)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

class MainNav extends Component<IProps> {
  render() {
    const { className } = this.props;
    return (
      <Nav className={className}>
        <NavContainer>
          <h1 data-align>
            <Link href="/">
              <a>
                <img src="/static/logo.png" alt="GitShareCode" />
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
            <BorderlessButton icon="chrome">Add to Chrome</BorderlessButton>
            <img src="/static/github_icon.png" alt="깃허브 아이콘" />
            <div data-align>
              <GithubButtonWithBadge icon="github">Star</GithubButtonWithBadge>
              <GithubBadge count={18} />
            </div>
            <div data-align>
              <GithubButtonWithBadge icon="github">Fork</GithubButtonWithBadge>
              <GithubBadge count={7} />
            </div>
          </RightBox>
        </NavContainer>
      </Nav>
    );
  }
}

export default MainNav;
