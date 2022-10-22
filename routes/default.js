const express = require('express');
const router = express.Router();
const realtime = require('../services/realtime');

router.get('/', async function (req, res, next) {
  
  try {
    res.json(await realtime.getRealtime());
  } catch (err) {
    console.error(`Impossible de récupérer la table realtime `, err.message);
    next(err);
  }
});

module.exports = router;