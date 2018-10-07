import NodeCache from 'node-cache';
let cache = null;

const CacheProvider = {
  start: done => {
    if (cache) {
      return done();
    }
    cache = new NodeCache({ stdTTL: 60 * 15, errorOnMissing: true });
  },
  instance: () => cache,
};

export default CacheProvider;
