import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { FlexRightBox } from '../';

describe('StyledFlexContainer', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('FlexRightBox', () => {
    it('should render', () => {
      const tree = renderWith(<FlexRightBox />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
