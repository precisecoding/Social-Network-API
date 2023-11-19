const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// if line 4 fails to execute then line 6 will execute handling the error
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
