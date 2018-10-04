import { IGist } from '../model/gist';
import { IContributor } from '../model/contributors';

const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';
const githubApiUrl = 'https://api.github.com/repos/kosslab-kr/gitCodeShare.com';

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
      return (await fetch(`${proxyContext}/gists`, { method: 'GET' }).then(data => data.json())) as IGist[];
    },
    async getStarredGists() {
      return (await fetch(`${proxyContext}/gists/starred`, { method: 'GET' }).then(data => data.json())) as IGist[];
    },
    async getGist(gistId: number) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'GET' }).then(data => data.json())) as IGist[];
    },
    async createGist() {
      return (await fetch(`${proxyContext}/gists`, { method: 'POST' }).then(data => data.json())) as IGist[];
    },
    async modifyGist(gistId: number) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'PATCH' }).then(data => data.json())) as IGist[];
    },
    async deleteGist(gistId: number) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'DELETE' }).then(data =>
        data.json(),
      )) as IGist[];
    },
  },
  GithubRequest: {
    async getRepoData() {
      return (await fetch(githubApiUrl, { method: 'GET' }).then(data => data.json())) as object;
    },
    async getContributors() {
      return (await fetch(`${githubApiUrl}/stats/contributors`, { method: 'GET' }).then(data =>
        data.json(),
      )) as IContributor;
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
};

export default ApiProvider;
