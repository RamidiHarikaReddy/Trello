define([
	'jquery',
	'underscore',
    'backbone',
    'js/Models/ListModel',
    'text!templates/ListTemplate.html',
    'js/Views/CardView',
    'js/dataProvider'
], function ($, _, Backbone, lists, listTemplate, CardView, dataProvider) {
 'use strict';
    var ListView = Backbone.View.extend({
        template: _.template(listTemplate),
        el : '.lists-container',
        collection: lists,
        boardName: '',
        events:{
            "click .add-list-btn": "toggleListComposer",
            "click #addList": "createList",
            "click #cancelList": "toggleListComposer",
            "click .editList": "showUpdate",
            "keyup .editlistName": "updateList",
            "click .deleteList" : "deleteList"
        },
        initialize : function(boardName){
            this.boardName = boardName;
            this.render(boardName);
        },
        render: function(boardName){
            var listCollection = dataProvider.getLists(boardName);
            this.$el.html(this.template({"lists": listCollection.toJSON()}));
            var listObj = Object.keys(dataProvider.getListsObject(boardName));
            for(var listId in listObj)
            {
                var obj = {'el' : this.$('#'+listObj[listId]), 'boardName': boardName, 'listPosition': listObj[listId]};
                new CardView(obj);
            }
        },
        toggleListComposer: function(){
            $('.add-list-btn').toggle();
            $('.listComposer').toggle();
        },
        createList: function(){
            var listName = $('#listName').val();
            dataProvider.setList(this.boardName, listName, {});
            this.render(this.boardName);
        },
        showUpdate: function(e){
            $(e.currentTarget).closest('.list-title').hide();
            $(e.currentTarget).closest('.list-title').next().show();

        },
        updateList: function(e){
            if(e.keyCode == 13){
                var listId = $(e.currentTarget).closest('.list').find('.list-items').attr('id');
                var updatedListName = $(e.currentTarget).closest('.list').find('.editlistName').val();
                var cards = dataProvider.getCardsObj(this.boardName, listId);
                dataProvider.setList(this.boardName, updatedListName, cards,listId);
                this.render(this.boardName);
            }
        },
        deleteList: function(e){
            var listId = $(e.currentTarget).closest('.list').find('.list-items').attr('id');
            dataProvider.deleteList(this.boardName, listId);
            this.render(this.boardName);
        }
    });
    return ListView;
})
