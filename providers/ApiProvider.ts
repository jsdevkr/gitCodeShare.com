import 'isomorphic-unfetch';

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
};

export default ApiProvider;
