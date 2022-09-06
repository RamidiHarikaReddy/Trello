define([
    'js/Models/boardModel',
    'js/Models/CardModel',
    'js/Models/ListModel',
    'js/Models/boardCollection'
], function (boards, cardCollection, listCollection, boardCollection) {
    var trello;
    var recentlyViewed;
    var initialize = function(){
        if (!sessionStorage.getItem('trello')) {
            sessionStorage.setItem('trello', '{}');
        }
        if (!sessionStorage.getItem('recentlyViewed')) {
          sessionStorage.setItem('recentlyViewed', '[]');
        }
        trello = JSON.parse(sessionStorage.getItem('trello'));
        recentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewed'));
      };
      var setBoard = function(name, visibilityValue, lists){
          var board = new boards({
              name : name,
              visibility : visibilityValue,
              lists : JSON.parse(lists)
          });
        trello[name] = board.toJSON();
        sessionStorage.setItem('trello', JSON.stringify(trello));
      };
      var getAllBoards = function(){
        var boardArray = [];
        for(var board in trello)
          boardArray.push(trello[board]);
          return new boardCollection(boardArray);
      };
      var getBoard = function(name){
        trello = JSON.parse(sessionStorage.getItem('trello'));
        var boardModel = new boards(trello[name]);
        return boardModel;
      };
      var setList = function(boardName, listName, cards, listPosition){
        var board = getBoard(boardName).toJSON();
        var lists = board['lists'];
        if(isNaN(listPosition))
          listPosition = generateId(lists);
        var list = {};
        list['name'] = listName;
        list['cards'] = cards;
        list['listId'] = listPosition;
        lists[listPosition] = list;
        board['lists'] = lists;
        trello[boardName] = board;
        sessionStorage.setItem('trello', JSON.stringify(trello));
      };
      var getLists = function(boardName){
        var lists = getListsObject(boardName);
        var listArray = [];
        for(var list in lists)
          listArray.push(lists[list]);
        return new listCollection(listArray);
      };
      var getListsObject = function(boardName){
        var board = getBoard(boardName).toJSON();
        return board['lists'];
      }
      var generateId = function(obj){
        var keys = Object.keys(obj)
        var IntegerKeys = keys.map(function(key) {
          return parseInt(key.replace(/\D/g, '') || 0);
        })
        if(IntegerKeys.length>0)
          return Math.max.apply(null, IntegerKeys) + 1;
        return 0;
      };
      var setCard = function(boardName, listPosition, cardText, cardPosition){
        var board = getBoard(boardName).toJSON();
        var lists = board['lists'];
        var list = lists[listPosition];
        var cards = list['cards'];
        if(isNaN(cardPosition))
          cardPosition = generateId(cards);
        var card = {};
        card['text'] = cardText;
        card['id']=cardPosition;
        cards[cardPosition] = card;
        list['cards'] = cards;
        lists[listPosition] = list;
        board['lists'] = lists;
        trello[boardName] = board;
        sessionStorage.setItem('trello', JSON.stringify(trello));
      };
      var getCards = function(boardName, listPosition){
        var cards = getCardsObj(boardName, listPosition);
        var cardArray = [];
        for(var card in cards)
          cardArray.push(cards[card]);
        return new cardCollection(cardArray);
      };
      var getCardsObj = function(boardName, listPosition){
        var board = getBoard(boardName).toJSON();
        var lists = board['lists'];
        var list = lists[listPosition];
        var cards = list['cards'];
        return cards;
      };
      var deleteCard = function(boardName, listPosition, cardPosition){
        var board = getBoard(boardName).toJSON();
        var lists = board['lists'];
        var list = lists[listPosition];
        var cards = list['cards'];
        delete cards[cardPosition];
        list['cards'] = cards;
        lists[listPosition] = list;
        board['lists'] = lists;
        trello[boardName] = board;
        sessionStorage.setItem('trello', JSON.stringify(trello));
      };
      var deleteList = function(boardName, listId){
        var board = getBoard(boardName).toJSON();
        var lists = board['lists'];
        delete lists[listId];
        board['lists'] = lists;
        trello[boardName] = board;
        sessionStorage.setItem('trello', JSON.stringify(trello));
      }
      var addRecentlyViewed = function(boardName){
        if(recentlyViewed.length == 3)
          recentlyViewed.shift();
        recentlyViewed.push(boardName);
        sessionStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      }
      var getRecentlyViewed = function(){
        return recentlyViewed;
      }
      return { 
        initialize: initialize,
        setBoard: setBoard,
        getBoard: getBoard,
        setList: setList,
        getLists: getLists,
        setCard: setCard,
        getCards: getCards,
        getListsObject: getListsObject,
        deleteCard: deleteCard,
        getCardsObj: getCardsObj,
        deleteList: deleteList,
        getAllBoards: getAllBoards,
        addRecentlyViewed: addRecentlyViewed,
        getRecentlyViewed: getRecentlyViewed
      };
    
})
