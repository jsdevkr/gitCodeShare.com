import { IGist } from '../model/gist';
import { IContributor } from '../model/contributors';
import { encodeParams as encode } from '../common/utils';

const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';

const ApiProvider = {
  AuthRequest: {
    async login(email: string | undefined, userPs: string | undefined) {
      const data = await fetch(`/v1/login`, {});
      return data as any;
    },
    async me() {
      const data = await fetch(`/v1/login`, {});
      return data as any;
    },
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
    async captureImage(body: object) {
      const res = await fetch(`${proxyContext}/image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: encode(body),
        }),
      });
      const data = await res.blob();
      console.log(data);

      return data as any;
    },
  },
};

export default ApiProvider;
