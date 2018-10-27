import { IGist } from '../model/gist';
import { SourceType } from '../model/image';
import { IContributor } from '../model/contributors';
import { encodeParams as encode } from '../common/utils';

const proxyContext =
  typeof window !== 'undefined'
    ? process.env.BACKEND_PROXY_CONTEXT || '/api'
    : `http://localhost:${process.env.FRONT_PORT || 3000}${process.env.BACKEND_PROXY_CONTEXT || '/api'}`;

const ApiProvider = {
  AuthRequest: {
    login() {
      window.open(
        `${proxyContext}/auth/github`,
        '',
        ' scrollbars=yes,menubar=no,width=500, resizable=yes,toolbar=no,location=no,status=no',
      );
    },
    async isLogin() {},
  },
  GistRequest: {
    async getGists() {
      const res = await fetch(`${proxyContext}/gists`, { method: 'GET' });
      const data = await res.json();

      return data as IGist[];
    },
    async getStarredGists() {
      const res = await fetch(`${proxyContext}/gists/starred`, { method: 'GET' });
      const data = await res.json();

      return data as IGist[];
    },
    async getGist(gistId: number | string) {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'GET' });
      const data = await res.json();

      return data as IGist;
    },
    async createGist(body: object) {
      const res = await fetch(`${proxyContext}/gists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data as any;
    },
    async modifyGist(gistId: number | string) {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'PATCH' });
      const data = await res.json();

      return data as any;
    },
    async deleteGist(gistId: number | string) {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'DELETE' });
      const data = await res.json();

      return data as any;
    },
  },
  GithubRequest: {
    async getRepoData() {
      const res = await fetch(`${proxyContext}/github/repos`, { method: 'GET' });
      const data = await res.json();

      return data as any;
    },
    async getContributors() {
      const res = await fetch(`${proxyContext}/github/contributors`, { method: 'GET' });
      const data = await res.json();

      return data as IContributor[];
    },
    async getStarNum() {
      const data = await this.getRepoData();
      return data.stargazers_count as number;
    },
    async getForkNum() {
      const data = await this.getRepoData();
      return data.forks_count as number;
    },
  },
  ImageRequest: {
    async getImageUrl(state: string) {
      return `${proxyContext}/image?source=${SourceType.CODE}&state=${encode(state)}`;
    },
  },
};

export default ApiProvider;
