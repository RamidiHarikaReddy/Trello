define(['backbone'], function (Backbone) {
    var cardModel = Backbone.Model.extend({
    });
    var cards = Backbone.Collection.extend({
        model : cardModel,
    });
    return cards;
})
