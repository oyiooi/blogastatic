var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.cookies);
  if(req.cookies.blog==='blog123'){
    return next();
  }
  res.redirect(307,'/login');
});

module.exports = router;
