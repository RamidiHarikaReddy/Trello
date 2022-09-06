define(['backbone','js/Models/boardModel'], function (Backbone, boardModel) {
    var boards = Backbone.Collection.extend({
        model : boardModel,
    });
    return boards;
})
