'use strict';
/* global bookmarkList, store $ api*/

$(document).ready(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
});

api
  .getItems()
  .then(res => res.json())
  .then(items => {
    items.forEach(item => store.addItem(item));
    bookmarkList.render();
  });