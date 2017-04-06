'use strict';

module.exports = function(app){
  // Insert routes below
  app.use('/api/account', require('./api/account'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/main', require('./api/main'));
  app.use('/api/website', require('./api/website'));
  app.use('/api/passport', require('./api/website'));
  app.use('/api/upload', require('./api/upload'));
  // app.use('/api/userCenter', require('./api/userCenter'));
  app.use('/api/userCenter/dd', require('./api/userCenter/dd'));
  app.use('/api/userCenter/hy', require('./api/userCenter/hy'));
  app.use('/api/userCenter/em', require('./api/userCenter/em'));
  app.use('/api/userCenter/pt', require('./api/userCenter/pt'));
};
