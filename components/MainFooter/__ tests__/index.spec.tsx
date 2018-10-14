import React from 'react';
import { shallow } from 'enzyme';
import MainFooter from '../';

describe('MainFooter', () => {
  it('should render', () => {
    const tree = shallow(<MainFooter />);
    expect(tree).toMatchSnapshot();
  });
});
