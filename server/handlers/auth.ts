import passport from 'passport';
import { Router } from 'express';

const router: Router = Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.save(() => {
    // redirect to localhost:3000(front)
    res.redirect('/');
  });
});

export default router;
