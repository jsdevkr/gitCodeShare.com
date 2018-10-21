import React from 'react';
import { shallow } from 'enzyme';
import FeaturesPage from '../';

describe('FeaturesPage', () => {
  it('should render', () => {
    const tree = shallow(<FeaturesPage />);
    expect(tree).toMatchSnapshot();
  });
});
