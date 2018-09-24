import * as React from 'react';
import { DropDownMenu } from '../styledComponents';

export const DropdownMenu = (menuItems, clickHandler) => (
  <DropDownMenu onClick={clickHandler} theme="dark">
    {menuItems.map(menu => (
      <DropDownMenu.Item key={menu.name} menu={menu}>
        {menu.name}
      </DropDownMenu.Item>
    ))}
  </DropDownMenu>
);
