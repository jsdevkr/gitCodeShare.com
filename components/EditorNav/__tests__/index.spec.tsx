import React from 'react';
import { shallow } from 'enzyme';
import MainNav from '../';

describe('MainNav', () => {
  it('should render', () => {
    const tree = shallow(<MainNav />);
    expect(tree).toMatchSnapshot();
  });
});
