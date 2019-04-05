'use strict';

/* global store, $, api */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {
  function generateNewBookmarkForm() {
    if (store.isAdding === true) {
      return `<form class="add-item-form">
       <label for="item-title">Webpage Title:</label>
       <input type="text" name="title" class="item-title">
         <br>
           <label for="item-description">Description:</label>
           <input type="text" name="description" class="item-description">
             <br>
            <label for="item-url">URL:</label>
            <input type="text" name="url" class="item-url">
              <br>
            <label for="item-rating">Bookmark Rating</label>
            <input type="number" name="rating" min="1" max="5" value="5" class="item-rating">
            <br>
               <button type="submit" role="button">Submit</button>
               <button class="resetButton" type="button" role="button">Reset</button>
           </form>`;
    }
    else {
      return '<button class="addButton" role="button">Add Bookmark</button>';
    }
  }

  function generateBookmarkElement(item) {
    
    if (item.isExpanded === false){
      return`
     <li class="bookmark-element" data-item-id="${item.id}">
    <h2>${item.title}</h2>
    <h3>${item.rating}</h3>
    <li>
     `;
    } else {
      return `
<li class="bookmark-element" data-item-id="${item.id}">
    <h2>${item.title}</h2>
    <div class="inside-bookmark-list">
    <h3>${item.rating}</h3>
    <p>${item.desc}</p>
    <button class="addButton" role="button"><a href=${item.url} target="_blank">Visit Site</a></button>
    <button class="deleteButton" role="button">Delete Bookmark</a></button>
    </div>
    <li>`;
    }  
  }

  function handleFilter() {
    $('.js-min-rating').on('change', function () {
      const num = ($('.js-min-rating').val());
      store.filterBookmarks(num);
      render();
    });
  }


  function getItemIdFromElement(item) {
    return $(item)
      .closest('.bookmark-element')
      .data('item-id');
  }

  function handleExpandBookmark() {
    $('.bookmark-list').on('click', '.bookmark-element', function (event) {
      const id = getItemIdFromElement(event.currentTarget);
      console.log(id);
      let item = store.findById(id);
      console.log(item);
      item[0].isExpanded = !item[0].isExpanded;
      generateBookmarkElement(item[0]);
      render();
    });
  }


  function generateBookmarkString(bookmarks) {

    const items = bookmarks.filter(item => item.rating >= store.sortNumber).map(item => generateBookmarkElement(item));
    return items.join('');
  }


  function render() {
    $('.add-item').html(generateNewBookmarkForm());
    $('.bookmark-list').html(generateBookmarkString(store.items));
  }

  function handleAddBookmarkClicked() {
    $('.add-item').on('click', '.addButton', () => {
      store.toggleAddItem();
      render();
    });
  }
  function handleNewItemSubmit() {
    $('.add-item').submit('.add-item-form', function (event) {
      event.preventDefault();
      const title = $('.item-title').val();
      const desc = $('.item-description').val();
      const url = $('.item-url').val();
      const rating = $('.item-rating').val();
      const newBookmark = {
        title,
        desc,
        url,
        rating
      };
      $('.item-title').val('');
      $('.item-description').val('');
      $('.item-url').val('');
      $('.item-rating').val('');

      api
        .createItem(newBookmark)
        .then(response => {
          if (!response.ok) {
            let error = response.json()
              .then((jsonResponse) => {
                return jsonResponse.message;
              });
            throw error;
          }
          return response.json();
        })
        .then(newItem => {
          store.addItem(newItem);
          render();
        });
    });
  }



  function handleResetClicked() {
    $('.add-item').on('click', '.resetButton', () => {
      console.log(store);
      store.toggleAddItem();
      console.log(store);
      render();
    });
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.bookmark-list').on('click', '.deleteButton', (event) => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);

      console.log(event.target, id);
      // delete the item
      api.deleteItem(id)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            let error = response.json()
              .then((jsonResponse) => {
                return jsonResponse.message;
              });
            throw error;
          }
          store.findAndDelete(id);
          render();
        })
        .catch((error) => {
          console.log('hi', error);
        });
      // render the updated shopping list
    });
  }








  function bindEventListeners() {
    handleAddBookmarkClicked();
    handleResetClicked();
    handleNewItemSubmit();
    handleDeleteItemClicked();
    handleExpandBookmark();
    handleFilter();
  }
  return {
    render,
    bindEventListeners,
  };
})();