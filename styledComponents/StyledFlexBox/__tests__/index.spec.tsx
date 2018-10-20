import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { FlexLeftBox, FlexRightBox } from '../';

describe('StyledFlexBox', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('FlexLeftBox', () => {
    it('should render', () => {
      const tree = renderWith(<FlexLeftBox />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('FlexRightBox', () => {
    it('should render', () => {
      const tree = renderWith(<FlexRightBox />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
