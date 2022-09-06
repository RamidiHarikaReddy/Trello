
define([
  'js/router', 
  'backbone',
  'css!../css/bootstrap.min.css',
  'css!../css/avatar.css',
  'css!../css/styles.css'
  ], function(Router, Backbone ){
    "use strict"
      var routerObj = new Router();
      Backbone.history.start();
  });