import { IGist } from '../model/gist';
import { IContributor } from '../model/contributors';
import { encodeParams as encode } from '../common/utils';
import axios from 'axios';

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
      return (await axios(`${proxyContext}/gists`, { method: 'GET' })).data;
    },
    async getStarredGists(): Promise<IGist[]> {
      return (await axios(`${proxyContext}/gists/starred`, { method: 'GET' })).data;
    },
    async getGist(gistId: number | string): Promise<IGist> {
      return (await axios(`${proxyContext}/gists/${gistId}`, { method: 'GET' })).data;
    },
    async createGist(body: object): Promise<IGist> {
      return (await axios(`${proxyContext}/gists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: body,
      })).data;
    },
    async modifyGist(gistId: number | string): Promise<IGist> {
      return (await axios(`${proxyContext}/gists/${gistId}`, { method: 'PATCH' })).data;
    },
    async deleteGist(gistId: number | string) {
      return (await axios(`${proxyContext}/gists/${gistId}`, { method: 'DELETE' })).data;
    },
  },
  GithubRequest: {
    async getRepoData() {
      return (await axios(`${proxyContext}/github/repos`, { method: 'GET' })).data;
    },
    async getContributors(): Promise<IContributor[]> {
      return (await axios(`${proxyContext}/github/contributors`, { method: 'GET' })).data;
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
