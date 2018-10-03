/**
 * @description
 *  - https://developer.github.com/v3/gists/#create-a-gist
 */
export interface IAuthor {
  login?: string;
  id?: string;
  node_id?: number;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
}

export interface IContributor {
  total?: number;
  weeks?: object[];
  author?: IAuthor;
}
