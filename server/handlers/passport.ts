import passport from 'passport';
import passportGithub from 'passport-github';
import { Request, Response, NextFunction } from 'express';

const GithubStrategy = passportGithub.Strategy;

/**
 * @description
 * - separating with a space
 * - https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes
 */
export enum Scope {
  REPO = 'repo',
  REPO_STATUS = 'repo:satus',
  REPO_DEVELOPMENT = 'repo_deployment',
  PUBLIC_REPO = 'public_repo',
  REPO_INVITE = 'repo:invite',
  ADMIN_ORG = 'admin:org',
  WRITE_ORG = 'write:org',
  READ_ORG = 'read:org',
  ADMIN_PUBLIC_KEY = 'admin:public_key',
  WRITE_PUBLIC_KEY = 'write:public_key',
  READ_PUBLIC_KEY = 'read:public_key',
  ADMIN_REPO_HOOK = 'admin:repo_hook',
  WRITE_REPO_HOOK = 'write:repo_hook',
  READ_REPO_HOOK = 'read:repo_hook',
  ADMIN_ORG_HOOK = 'admin:org_hook',
  GIST = 'gist',
  NOTIFICATIONS = 'notifications',
  USER = 'user',
  READ_USER = 'read:user',
  USER_EMAIL = 'user:email',
  USER_FOLLOW = 'user:follow',
  DELETE_REPO = 'delete_repo',
  WRITE_DISCUSSION = 'write:discussion',
  READ_DISCUSSION = 'read:discussion',
  ADMIN_GPG_KEY = 'admin:gpg_key',
  WRITE_GPG_KEY = 'write:gpg_key',
  READ_GPG_KEY = 'read:gpg_key',
}

passport.serializeUser<any, any>((user, done) => {
  done(null, user);
});

passport.deserializeUser<any, any>((user, done) => {
  done(null, user);
});

/**
 * Sign in with Github.
 */
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.OAUTH_GITHUB_CLIENT_ID || 'gitCodeShare',
      clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_GITHUB_CALLBACK_URL,
      scope: [Scope.GIST, Scope.USER_EMAIL],
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        username: profile.username,
        displayName: profile.displayName,
        accessToken: accessToken,
      };

      done(null, user);
    },
  ),
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    throw new Error('Login Required');
  }
};
