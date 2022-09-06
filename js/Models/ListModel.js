define(['backbone'], function (Backbone) {
    var listModel = Backbone.Model.extend({
    });
    var lists = Backbone.Collection.extend({
        model : listModel,
    });
    return lists;
})
