const express = require('express');
const router = express.Router();
const trame = require('../services/trame');

router.get('/', async function (req, res, next) {
  
  try {
    res.json(await trame.get(req.query));
    //res.json(await trame.getMultiple(req.query.trame, req.query.page));
  } catch (err) {
    console.error(`Impossible de récupérer la trame : `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await trame.add(req.query));
  } catch (err) {
    console.error(`Impossible d'ajouter la données : `, err.message);
    next(err);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    res.json(await trame.remove(req.query));
  } catch (err) {
    console.error(`Impossible de supprimer dans la trame : `, err.message);
    next(err);
  }
});

module.exports = router;