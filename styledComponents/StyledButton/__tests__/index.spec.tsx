import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import {
  RoundedButton,
  GithubButton,
  BorderlessButton,
  DownloadButton,
  SmDownloadButton,
  LineButton,
  DropDownButton,
} from '../';

describe('StyledButton', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('RoundedButton', () => {
    it('should render', () => {
      const tree = renderWith(<RoundedButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('GithubButton', () => {
    it('should render', () => {
      const tree = renderWith(<GithubButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('BorderlessButton', () => {
    it('should render', () => {
      const tree = renderWith(<BorderlessButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DownloadButton', () => {
    it('should render', () => {
      const tree = renderWith(<DownloadButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SmDownloadButton', () => {
    it('should render', () => {
      const tree = renderWith(<SmDownloadButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('LineButton', () => {
    it('should render', () => {
      const tree = renderWith(<LineButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DropDownButton', () => {
    it('should render', () => {
      const tree = renderWith(<DropDownButton />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
