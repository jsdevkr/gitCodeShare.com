import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { SCard, SCardMeta, SCardMetaDetail, UserCard, UserCardMeta } from '../';

describe('StyledBadge', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  describe('SCard', () => {
    it('should render', () => {
      const tree = renderWith(<SCard />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SCardMeta', () => {
    it('should render', () => {
      const tree = renderWith(<SCardMeta />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('SCardMetaDetail', () => {
    it('should render', () => {
      const tree = renderWith(<SCardMetaDetail />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UserCard', () => {
    it('should render', () => {
      const tree = renderWith(<UserCard />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('UserCardMeta', () => {
    it('should render', () => {
      const tree = renderWith(<UserCardMeta />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
