import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { SLayout, MContainer, SContainer, PageContent, PageSection, TitleSection } from '../';

describe('StyledLayout', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('SLayout', () => {
    it('should render', () => {
      const tree = renderWith(<SLayout />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('MContainer', () => {
    it('should render', () => {
      const tree = renderWith(<MContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SContainer', () => {
    it('should render', () => {
      const tree = renderWith(<SContainer />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PageContent', () => {
    it('should render', () => {
      const tree = renderWith(<PageContent />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PageSection', () => {
    it('should render', () => {
      const tree = renderWith(<PageSection />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('TitleSection', () => {
    it('should render', () => {
      const tree = renderWith(<TitleSection />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
