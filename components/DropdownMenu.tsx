import * as React from 'react';
import { DropDownMenu as StyledDropDownMenu } from '../styledComponents';

export const DropdownMenu = (menuItems, clickHandler) => (
  <StyledDropDownMenu onClick={clickHandler} theme="dark">
    {menuItems.map(menu => (
      <StyledDropDownMenu.Item key={menu.name} menu={menu}>
        {menu.name}
      </StyledDropDownMenu.Item>
    ))}
  </StyledDropDownMenu>
);
