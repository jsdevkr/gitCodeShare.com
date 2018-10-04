import styled from 'styled-components';
import { Dropdown } from 'antd';

const EditorDropDown = styled(Dropdown as any)`
  &.ant-dropdown {
    background-color: #000;
    color: ${props => props.theme.primaryTextColor};
  }
` as any;

export { EditorDropDown };
