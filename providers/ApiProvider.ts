import { IGist } from '../model/gist';
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
    async getGists(): Promise<IGist[]> {
      const res = await fetch(`${proxyContext}/gists`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async getStarredGists(): Promise<IGist[]> {
      const res = await fetch(`${proxyContext}/gists/starred`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async getGist(gistId: number | string): Promise<IGist> {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async createGist(body: object): Promise<IGist> {
      const res = await fetch(`${proxyContext}/gists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async modifyGist(gistId: number | string): Promise<IGist> {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'PATCH' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async deleteGist(gistId: number | string) {
      const res = await fetch(`${proxyContext}/gists/${gistId}`, { method: 'DELETE' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
  },
  GithubRequest: {
    async getRepoData() {
      const res = await fetch(`${proxyContext}/github/repos`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
    },
    async getContributors(): Promise<IContributor[]> {
      const res = await fetch(`${proxyContext}/github/contributors`, { method: 'GET' });
      if (res.ok) {
        return await res.json();
      } else {
        throw await res.json();
      }
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
      return `${proxyContext}/image?state=${encode(state)}`;
    },
  },
};

export default ApiProvider;
