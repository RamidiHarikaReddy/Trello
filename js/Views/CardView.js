define([
	'jquery',
	'underscore',
    'backbone',
    'js/Models/CardModel',
    'text!templates/Cardtemplate.html',
    'js/dataProvider'
], function ($, _, Backbone, cards, cardTemplate, dataProvider) {
 'use strict';
    var template = _.template(cardTemplate);
    var cardView = Backbone.View.extend({
        collection: cards,
        events: {
            "click .add-card-btn": "toggleAddCard",
            "click .addCard":"createCard",
            "click .cancelCard":"toggleAddCard",
            "click .edit": "showEdit",
            "click #save": "updateCard",
            "click .delete": "deleteCard"
        },
        initialize : function(options){
            this.boardName = options.boardName;
            this.listPosition = options.listPosition;
            this.render();
        },
        render: function(e){
            if(e)
                this.listPosition = $(e.currentTarget).closest('.card').data('id');
            var cardCollection = dataProvider.getCards(this.boardName, this.listPosition);
            var jsonObj = {"cards": cardCollection.toJSON()}
            jsonObj['listID'] = this.listPosition;
            this.$el.html(template(jsonObj));
        },
        toggleAddCard: function(e){
            var parent = $(e.currentTarget).closest('.card');
            parent.find('.add-card-btn').toggle();
            parent.find('.cardComposer').toggle();
        },
        createCard: function(e){
            var cardName = $(e.currentTarget).parent().prev('#cardContent').val();
            var listPosition = $(e.currentTarget).closest('.card').data('id');
            dataProvider.setCard(this.boardName, listPosition, cardName);
            this.render(e);
        },
        updateCard: function(e){
            var cardName = $(e.currentTarget).parent().prev('#cardContent').val();
            var listPosition = $(e.currentTarget).closest('.card').data('id');
            var cardPosition = $(e.currentTarget).closest('.card-body').data('id');
            dataProvider.setCard(this.boardName, listPosition, cardName, cardPosition);
            this.render(e);
        },
        deleteCard: function(e){
            var listPosition = $(e.currentTarget).closest('.card').data('id');
            var cardPosition = $(e.currentTarget).closest('.card-body').data('id');
            dataProvider.deleteCard(this.boardName,listPosition, cardPosition);
            this.render(e);
        },
        showEdit: function(e){
            $(e.currentTarget).prev('.cardText').hide();
            $(e.currentTarget).hide();
            $(e.currentTarget).next('.editCard').show();
        }
    });
    return cardView;
})
