import React from 'react';
import { shallow } from 'enzyme';
import CodeViewPage from '../';
import appStore from '../../../../stores/AppStore';

describe('CodeViewPage', () => {
  it('should render', () => {
    const tree = shallow(<CodeViewPage appStore={appStore} />);
    expect(tree).toMatchSnapshot();
  });
});
