import React from 'react';
import renderer from 'react-test-renderer';
import { compose } from 'lodash/fp';
import { renderWithTheme } from '../../../common/utils';
import { GithubBadge } from '../';

describe('StyledBadge', () => {
  const renderWith: any = compose(
    renderer.create,
    renderWithTheme,
  );

  it('should render', () => {
    const tree = renderWith(<GithubBadge />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
