import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../';

describe('MainPage', () => {
  it('should render', () => {
    const props = {
      starredList: [],
    };
    const tree = shallow(<MainPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
