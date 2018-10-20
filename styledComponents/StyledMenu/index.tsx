import styled from 'styled-components';
import { Menu } from 'antd';

const MainNavMenu: typeof Menu = styled(Menu as any)`
  &.ant-menu {
    margin: 0;
    border-bottom: none;
    background-color: transparent;

    li,
    li:hover,
    li:focus {
      border-bottom: none;

      a {
        color: ${props => props.theme.primaryTextColor};
        font-size: 15px;
      }
    }
  }
` as any;

const DropDownMenu: typeof Menu = styled(Menu as any)`
  &.ant-dropdown-menu {
    border-radius: 4px;
    background-color: #000000;
    border: solid 1px #dbe3e9;
    padding: 0px;
    transition: none !important;
    max-height: 350px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .ant-dropdown-menu-item {
      transition: inherit;
      color: #5e616e;
      max-height: 30px;
      font-size: 14px;
      padding: 6px 10px;
      &-active {
        color: #ffffff;
        background-color: #202020;
      }
    }
  }
` as any;

export { MainNavMenu, DropDownMenu };
