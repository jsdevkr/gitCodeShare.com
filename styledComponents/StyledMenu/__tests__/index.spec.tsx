import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { MainNavMenu, DropDownMenu } from '../';

describe('StyledMenu', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('MainNavMenu', () => {
    it('should render', () => {
      const tree = renderWith(<MainNavMenu />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DropDownMenu', () => {
    it('should render', () => {
      const tree = renderWith(<DropDownMenu />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
