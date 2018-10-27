import passport from 'passport';
import { Router } from 'express';

const router: Router = Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.save(() => {
    res.redirect('/');
    // res.send(
    //   `<!DOCTYPE html>
    //     <html>
    //       <script type="text/javascript">
    //         window.opener.location.reload();
    //         window.close();
    //       </script>
    //     </html>`,
    // );
  });
});

export default router;
