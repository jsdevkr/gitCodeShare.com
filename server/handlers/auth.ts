import passport from 'passport';
import { Router } from 'express';

const router: Router = Router();

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.save(() => {
    // redirect to localhost:3000(front)
    res.redirect('/');
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  req.logout();
  res.redirect('/');
});

export default router;
