import React from 'react';
import { shallow } from 'enzyme';
import { renderWithTheme } from '../../../common/utils';
import MainNav from '../';

describe('MainNav', () => {
  it('should render', () => {
    const tree = shallow(renderWithTheme(<MainNav />));
    expect(tree).toMatchSnapshot();
  });
});
