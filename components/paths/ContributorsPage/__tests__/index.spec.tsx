import React from 'react';
import { shallow } from 'enzyme';
import ContributorsPage from '../';

describe('ContributorsPage', () => {
  it('should render', () => {
    const props = {
      contributors: [
        {
          avatar_url: 'https://avatars0.githubusercontent.com/u/7310854?v=4',
          bio: 'I love travel, photograph, and javascript.',
          blog: 'http://www.sowk.net',
          company: 'KOSSLAB (Korea Open Source Software Developers Lab)',
          created_at: '2014-04-16T06:14:09Z',
          email: null,
          events_url: 'https://api.github.com/users/gimdongwoo/events{/privacy}',
          followers: 76,
          followers_url: 'https://api.github.com/users/gimdongwoo/followers',
          following: 126,
          following_url: 'https://api.github.com/users/gimdongwoo/following{/other_user}',
          gists_url: 'https://api.github.com/users/gimdongwoo/gists{/gist_id}',
          gravatar_id: '',
          hireable: null,
          html_url: 'https://github.com/gimdongwoo',
          id: 7310854,
          location: 'Seoul, Korea',
          login: 'gimdongwoo',
          name: 'Dongwoo Gim',
          node_id: 'MDQ6VXNlcjczMTA4NTQ=',
          organizations_url: 'https://api.github.com/users/gimdongwoo/orgs',
          public_gists: 5,
          public_repos: 76,
          received_events_url: 'https://api.github.com/users/gimdongwoo/received_events',
          repos_url: 'https://api.github.com/users/gimdongwoo/repos',
          site_admin: false,
          starred_url: 'https://api.github.com/users/gimdongwoo/starred{/owner}{/repo}',
          subscriptions_url: 'https://api.github.com/users/gimdongwoo/subscriptions',
          type: 'User',
          updated_at: '2018-10-20T15:03:09Z',
          url: 'https://api.github.com/users/gimdongwoo',
        },
      ],
    };
    const tree = shallow(<ContributorsPage {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
