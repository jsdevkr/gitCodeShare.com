import { IGist } from '../model/gist';
import { IContributor } from '../model/contributors';
import { CacheProvider } from '../providers';

const cacheKeys = {
  gist: {
    starred: 'starredGists',
  },
  github: {
    repository: 'githubRepositories',
    contributor: 'githubContributors',
  },
};
const proxyContext = process.env.BACKEND_PROXY_CONTEXT || '/api';
const githubApiUrl = 'https://api.github.com/repos/kosslab-kr/gitCodeShare.com';

const ApiProvider = {
  AuthRequest: {
    async login(email: string | undefined, userPs: string | undefined) {
      const res = await fetch(`/v1/login`, {});
      return res as any;
    },
    async me() {
      const res = await fetch(`/v1/login`, {});
      return res as any;
    },
  },
  GistRequest: {
    async getGists() {
      return (await fetch(`${proxyContext}/gists`, { method: 'GET' }).then(res => res.json())) as IGist[];
    },
    async getStarredGists() {
      let list: IGist[] = [];
      try {
        list = CacheProvider.instance().get(`${cacheKeys.gist.starred}`);
      } catch (err) {
        list = (await fetch(`${proxyContext}/gists/starred`, {
          method: 'GET',
        }).then(res => res.json())) as IGist[];

        if (!CacheProvider.instance().set(`${cacheKeys.gist.starred}`, list)) {
          console.log(err);
        }
      } finally {
        return list;
      }
    },
    async getGist(gistId: number | string) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'GET' }).then(res => res.json())) as IGist;
    },
    async createGist(body) {
      return (await fetch(`${proxyContext}/gists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).then(res => res.json())) as IGist;
    },
    async modifyGist(gistId: number) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'PATCH' }).then(res => res.json())) as IGist;
    },
    async deleteGist(gistId: number) {
      return (await fetch(`${proxyContext}/gists/${gistId}`, { method: 'DELETE' }).then(res => res.json())) as any;
    },
  },
  ImageRequest: {
    async createImage() {
      return (await fetch(`${proxyContext}/image`, { method: 'POST' }).then(res => res.json())) as any;
    },
  },
  GithubRequest: {
    async getRepores() {
      let repo: Object = {};
      try {
        repo = CacheProvider.instance().get(`${cacheKeys.github.repository}`);
      } catch (err) {
        repo = (await fetch(`${githubApiUrl}`, {
          method: 'GET',
        }).then(res => res.json())) as Object;

        if (!CacheProvider.instance().set(`${cacheKeys.github.repository}`, repo)) {
          console.log(err);
        }
      } finally {
        return repo;
      }
    },
    async getContributors() {
      let list: IContributor[] = [];
      try {
        list = CacheProvider.instance().get(`${cacheKeys.github.contributor}`);
      } catch (err) {
        list = (await fetch(`${githubApiUrl}/stats/contributors`, {
          method: 'GET',
        }).then(res => res.json())) as IContributor[];

        if (!CacheProvider.instance().set(`${cacheKeys.github.contributor}`, list)) {
          console.log(err);
        }
      } finally {
        return list;
      }
    },
    async getStarNum() {
      const data = await this.getRepores();
      return data.stargazers_count as number;
    },
    async getForkNum() {
      const data = await this.getRepores();
      return data.forks_count as number;
    },
  },
};

export default ApiProvider;
