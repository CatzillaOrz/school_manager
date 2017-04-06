'use strict';

var AccountService = require('../services/accountService');

module.exports = {
  isSignedIn : function(req, res, next){
      console.log(req);
    if (req.session.oauth){
      req.user = req.session.oauth;
      return next();
    }else{
      console.log('===============================');
      console.log(req.session);
      console.log(req.session.oauth);
        res.status(401).send('Unauthorized');
    }

  }
};
