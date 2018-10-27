import cacheManager from 'cache-manager';

export { default as AuthHandler } from './auth';
export { default as GistHandler } from './gist';
export { default as GithubHandler } from './github';
export { default as ImageHandler } from './image';

export const cache = cacheManager.caching({
  store: 'memory',
  ttl: 60,
});
