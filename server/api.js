'use strict';

module.exports = function(app){
  // Insert routes below
  app.use('/api/account', require('./api/account'));
  app.use('/api/upload', require('./api/upload'));
  app.use('/api/college', require('./api/college'));
  app.use('/api/major', require('./api/major'));
  app.use('/api/class', require('./api/class'));
  app.use('/api/teacher', require('./api/teacher'));
  app.use('/api/student', require('./api/student'));
  app.use('/api/schoolyear', require('./api/schoolyear'));
  app.use('/api/course', require('./api/course'));
  app.use('/api/teachclass', require('./api/teachclass'));
};
