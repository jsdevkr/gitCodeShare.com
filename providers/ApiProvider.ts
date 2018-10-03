import { IGist } from '../model/gist';

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
};

export default ApiProvider;
