import { types, Instance } from 'mobx-state-tree';

/**
 * @description
 *  - https://developer.github.com/v3/gists/#create-a-gist
 */
export const File = types.model('File', {
  content: types.maybeNull(types.string),
  filename: types.maybeNull(types.string),
  language: types.maybeNull(types.string),
  raw_url: types.maybeNull(types.string),
  size: types.maybeNull(types.number),
  truncated: types.maybeNull(types.boolean),
  type: types.maybeNull(types.string),
});

export interface IFile extends Instance<typeof File> {}

export const Owner = types.model('Owner', {
  avatar_url: types.maybeNull(types.string),
  events_url: types.maybeNull(types.string),
  followers_url: types.maybeNull(types.string),
  following_url: types.maybeNull(types.string),
  gists_url: types.maybeNull(types.string),
  gravatar_id: types.maybeNull(types.string),
  html_url: types.maybeNull(types.string),
  id: types.maybeNull(types.number),
  login: types.maybeNull(types.string),
  node_id: types.maybeNull(types.string),
  organizations_url: types.maybeNull(types.string),
  received_events_url: types.maybeNull(types.string),
  repos_url: types.maybeNull(types.string),
  site_admin: types.maybeNull(types.boolean),
  starred_url: types.maybeNull(types.string),
  subscriptions_url: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
});

export interface IOwner extends Instance<typeof Owner> {}

export const Gist = types.model('Gist', {
  id: types.identifier,
  url: types.maybeNull(types.string),
  files: types.optional(types.map(File), {}),
  // forks?: [];
  forks_url: types.maybeNull(types.string),
  git_pull_url: types.maybeNull(types.string),
  git_push_url: types.maybeNull(types.string),
  // history?: [];
  html_url: types.maybeNull(types.string),
  owner: types.optional(Owner, {}),
  description: types.maybeNull(types.string),
  public: types.maybeNull(types.boolean),
  created_at: types.maybeNull(types.string),
  updated_at: types.maybeNull(types.string),
});

export interface IGist extends Instance<typeof Gist> {}
