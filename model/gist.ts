/**
 * @description
 *  - https://developer.github.com/v3/gists/#create-a-gist
 */
export interface IFile {
  content?: string;
  filename?: string;
}

export interface IOwner {
  avatar_url?: string;
  events_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  gravatar_id?: string;
  html_url?: string;
  id?: number;
  login?: string;
  node_id?: string;
  organizations_url?: string;
  received_events_url?: string;
  repos_url?: string;
  site_admin?: boolean;
  starred_url?: string;
  subscriptions_url?: string;
  type?: string;
  url?: string;
}

export interface IGist {
  id?: string;
  url?: string;
  files?: {
    [filename: string]: IFile;
  };
  forks?: [];
  forks_url?: string;
  git_pull_url?: string;
  git_push_url?: string;
  history?: [];
  html_url?: string;
  owner?: IOwner;
  description?: string;
  public?: boolean; // default false
  created_at?: Date;
  updated_at?: Date;
}
