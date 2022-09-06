define([
	'jquery',
	'underscore',
    'backbone',
    'js/Models/boardCollection',
    'text!templates/HomePageTemplate.html',
    'js/dataProvider',
    'js/router'
], function ($, _, Backbone, boards, homeTemplate, dataProvider, router) {
 'use strict';
    var HomePageView = Backbone.View.extend({
        template: _.template(homeTemplate),
        el : '#mainContainer',
        collection: boards,
        events:{
           "click .boardthumbnail": "navigateToBoard"
        },
        initialize : function(){
            this.render();
        },
        render: function(){
            this.$el.html(this.template());
            this.setRecentlyviewed();
            this.setBoardCategories();
        },
        setRecentlyviewed: function(){
            var recentlyViewedBoards = dataProvider.getRecentlyViewed();
            for(var i=0;i< recentlyViewedBoards.length;i++){
                $('.recent').show();
                $('.recentlyviewed').append("<button class='boardthumbnail' data-name='"+recentlyViewedBoards[i]+"'>"+recentlyViewedBoards[i]+"</button>");
            }
        },
        setBoardCategories: function(){
            boards = dataProvider.getAllBoards();
            boards.each(function(board){
                if(board.get('visibility') == 'Private'){
                    $('.personal').show();
                    $('.personalBoards').append("<button class='boardthumbnail' data-name='"+board.get('name')+"'>"+board.get('name')+"</button>");
                }
                else if(board.get('visibility') == 'Team'){
                    $('.team').show();
                    $('.teamBoards').append("<button class='boardthumbnail' data-name='"+board.get('name')+"'>"+board.get('name')+"</button>");
                }
                else if(board.get('visibility') == 'Public'){
                    $('.public').show();
                    $('.publicBoards').append("<button class='boardthumbnail' data-name='"+board.get('name')+"'>"+board.get('name')+"</button>");
                }
            })
        },
        navigateToBoard: function(e){
            var name = $(e.currentTarget).data('name');
            var recentlyViewed = dataProvider.getRecentlyViewed();
            if(!recentlyViewed.includes(name))
                dataProvider.addRecentlyViewed(name);
            routerObj.navigate('boards/'+name,{trigger: true})
        }

    });
    return HomePageView;
});