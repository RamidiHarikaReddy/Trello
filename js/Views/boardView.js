define([
	'jquery',
	'underscore',
    'backbone',
    'bootstrap',
    'js/Models/BoardModel',
    'text!templates/BoardTemplate.html',
    'js/Views/ListView',
    'js/dataProvider',
    'js/dragdrop'
], function ($, _, Backbone, Bootstrap, boards, BoardTemplate, listView, dataProvider, dragdrop) {
 'use strict';

    var boardView = Backbone.View.extend({
        template: _.template(BoardTemplate),
        el : '#mainContainer',
        collection: boards,
        initialize : function(boardName){
            this.render(boardName);
        },
        render: function(boardName){
            var boardModel = dataProvider.getBoard(boardName);
            this.$el.html(this.template(boardModel.toJSON()));
            new listView(boardName);
        }
    });
    return boardView;
})
