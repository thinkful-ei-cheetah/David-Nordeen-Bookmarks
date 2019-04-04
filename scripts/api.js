'use strict';

let api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/david';

  function getItems() {
    return fetch(`${BASE_URL}/bookmarks`);
  }

  function createItem(obj) {

    let newItem = JSON.stringify(obj);

    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newItem
    });
  }

  function deleteItem(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    });
  }

  return { createItem, getItems, deleteItem };
})();