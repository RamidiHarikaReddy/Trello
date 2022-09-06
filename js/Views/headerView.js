define([
    'jquery',
	'underscore',
    'backbone',
    'bootstrap',
    'js/router', 
    'text!templates/headerTemplate.html',
    'js/dataProvider',
    'js/Views/boardView'
], function ($, _, Backbone, bootstrap, router, headerTemplate, dataProvider, boardView) {

    var headerView = Backbone.View.extend({
        el : '#header',
        template : _.template(headerTemplate),
        initialize : function(){
            this.render();
            dataProvider.initialize();
        },
        render: function(){
            this.$el.html(this.template());
        },
        events:{
            "click #home": "navigateToHome",
            "click .boards-btn": "showBoards",
            "click #Create": "toggleAdd",
            "click .close": "toggleAdd",
            "click .closeModal": "closeModal",
            "click #createBoard": "createBoard",
            "click #visibilityOptions>a": "changeVisibilityDropdown"
        },
        navigateToHome: function(){
            routerObj.navigate('home',{trigger: true})
        },
        showBoards: function(){
            routerObj.navigate('/boards',{trigger: true})
        },
        toggleAdd: function(){
            $('.createDropdownMenu').toggleClass('show');
        },
        createBoard: function(e){
            var boardName = $('#boardInput').val();
            if(boardName != ''){
                var visibilityDropDown = $(e.currentTarget).closest('.modalContent').find('.visibilityDropdown').text().trim();
                dataProvider.setBoard(boardName, visibilityDropDown, "{}");
                dataProvider.addRecentlyViewed(boardName);
                $('.modal-backdrop').remove();
                routerObj.navigate('boards/'+boardName,{trigger: true})
            }
        },
        closeModal: function(){
            $('#boardModal').modal('hide');
        },
        changeVisibilityDropdown: function(e){
            $('.visibilityDropdown').find("span").html($(e.currentTarget).find("span").html());
            $('.visibilityDropdown').trigger('click');
        }
    });
    return headerView;
})