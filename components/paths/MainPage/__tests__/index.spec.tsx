import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../';
import appStore from '../../../../stores/AppStore';

describe('MainPage', () => {
  it('should render', () => {
    const tree = shallow(<MainPage appStore={appStore} />);
    expect(tree).toMatchSnapshot();
  });
});
