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
    async getContributors() {
      const url = `${githubApiUrl}/stats/contributors`;
      return (await fetch(url, { method: 'GET' }).then(data => data.json())) as IContributor;
    },

    async getStarNum() {
      const url = `${githubApiUrl}/stargazers`;
      const data = await fetch(url, { method: 'GET' }).then(data => data.json());
      return data.length;
    },

    async getForkNum() {
      const url = `${githubApiUrl}/forks`;
      const forks = await fetch(url, { method: 'GET' }).then(data => data.json());
      const nestedFork = forks.reduce((total, curr) => (total += curr.forks), 0);

      return forks.length + nestedFork;
    },
  },
};

export default ApiProvider;
