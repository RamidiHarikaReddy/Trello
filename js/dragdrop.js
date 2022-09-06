define(function (require) {
    "use strict";

    var $ = require('jquery'),
        storageHandler = require('js/dataProvider'),
        elementDragged = null,
        listView = require('js/Views/ListView');
    $(document).on('dragstart', '.card-body', function (e) {
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        elementDragged = this;
        e.originalEvent.dataTransfer.setData('text/plain', 'dummy');
    });

    $(document).on('dragend', '.card-body', function (e) {
        elementDragged = null;
    });

    $(document).on('dragover', '.card', function (e) {
        if (e.preventDefault) e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = 'move';
        return false;
    });

    $(document).on('dragenter', '.card', function (e) {
        $(this).addClass('over');
    });

    $(document).on('dragleave', '.card', function (e) {
        $(this).removeClass('over');
    });

    $(document).on('drop', '.card', function (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        var element = $(this),
            boardName = $('.board-title').text().trim(),
            currentListId = element.data('id'),
            draggedElementItemID = $(elementDragged).data('id'),
            draggedElementListID = $(elementDragged).parent('.card').data('id'),
            cardText = $(elementDragged).find('.cardText').text();

        if(currentListId !== draggedElementListID){
            element.removeClass('over');
            storageHandler.setCard(boardName,currentListId, cardText);
            storageHandler.deleteCard(boardName, draggedElementListID, draggedElementItemID);
            new listView(boardName);
        }

        elementDragged = null;
        return false;
    });
});