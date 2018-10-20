import React, { Component } from 'react';
import { styled, SContainer, RowFlex, SLogoImage } from '../../styledComponents';
import { Layout } from 'antd';
import Link from 'next/link';

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

  h1,
  a {
    margin: 0;
  }

  [data-align] {
    display: inherit;
    align-items: center;
  }
`;

class EditorNav extends Component<IProps> {
  state = {
    fork: 0,
    star: 0,
  };

  render() {
    const { className } = this.props;
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
        </NavContainer>
      </Nav>
    );
  }
}

export default EditorNav;
