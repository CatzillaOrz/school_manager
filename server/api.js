'use strict';

module.exports = function(app){
  // Insert routes below
  app.use('/api/ueditor', require('./api/ueditor'));
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
  app.use('/api/school', require('./api/school'));
  app.use('/api/notice', require('./api/notice'));
  app.use('/api/eduman', require('./api/eduman')); //教务管理
  app.use('/api/practiceman', require('./api/practiceman')); //实践管理
  app.use('/api/statistics', require('./api/statistics')); 
  app.use('/api/news', require('./api/news'));
  app.use('/api/rolemanger', require('./api/rolemanger'));//权限管理
  app.use('/api/geo', require('./api/geo'));
  app.use('/api/feedback', require('./api/feedback'));
  app.use('/api/dormman', require('./api/dormman'));
  app.use('/api/payment', require('./api/payment'));
  app.use('/api/batchimp', require('./api/batchimp'));
};
