import styled from 'styled-components';
import { Menu } from 'antd';

const MainNavMenu: typeof Menu = styled(Menu as any)`
  &.ant-menu {
    margin: 0;
    border-bottom: none;

    li,
    li:hover,
    li:focus {
      border-bottom: none;
    }
  }
` as any;

export { MainNavMenu };
