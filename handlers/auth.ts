import passport from 'passport';
import { Router } from 'express';

const router: Router = Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  req.session.save(() => {
    res.send(
      `<!DOCTYPE html>
        <html>
          <script type="text/javascript">
            try {
              window.opener.loginOk();
            } catch (err) {}
            window.close();
          </script>
        </html>`,
    );
  });
});

export default router;
