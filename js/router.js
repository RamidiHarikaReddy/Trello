define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'js/Views/boardView',
    'js/Views/headerView',
    'js/Views/homePageView'
  ], function($, _, Backbone, bootstrap, boardView, headerView,HomePageView) {
  
    var trelloRouter = Backbone.Router.extend({
      routes: {
        "" : "home",
        "home" : "home",
        "boards/:boardName" : "renderBoard"
      },
      home : function(){
        new headerView();
        new HomePageView();
      },
      renderBoard: function(boardName){
        new headerView();
        new boardView(boardName);
      }
    });
    return trelloRouter;
  });
  
  