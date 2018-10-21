import React from 'react';
import { shallow } from 'enzyme';
import CodeViewPage from '../';

describe('CodeViewPage', () => {
  it('should render', () => {
    const tree = shallow(<CodeViewPage />);
    expect(tree).toMatchSnapshot();
  });
});
