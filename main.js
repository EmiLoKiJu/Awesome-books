/* eslint-disable no-plusplus */

// Checking if local storage is available

let isStorage = false;
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

if (storageAvailable('localStorage')) {
  isStorage = true
}

// Books functionalities

const bookscontainer = document.querySelector('.bookscontainer')
const addbook = document.querySelector('.addbutton');
const book = {
  'title': '',
  'author': '',
};
let collection = [];
let strcoll = [];

function appendNewBook(book) {
  collection.push(book);
  localStorage.setItem('bookcollection', JSON.stringify(collection));
  const div1 = document.createElement('div');
  let content = `<p>${book.title}</p><p>${book.author}</p><button class="removebutton">Remove</button><hr size="1">`;
  div1.innerHTML = content;
  bookscontainer.appendChild(div1);
  removebutton = div1.querySelector('.removebutton');
  removebutton.addEventListener('click', () => {
    const index = collection.indexOf(book);
    collection.splice(index, 1);
    localStorage.setItem('bookcollection', JSON.stringify(collection));
    div1.remove();
  });
}

addbook.addEventListener('click', () => {
  const newbook = Object.create(book);
  newbook.title = document.querySelector('#title').value;
  newbook.author = document.querySelector('#author').value;
  appendNewBook(newbook);
});

document.addEventListener('DOMContentLoaded', () => {
  let booksstoraged = JSON.parse(localStorage.getItem('bookcollection'));
  if (isStorage && booksstoraged != null) {
    for (let i = 0; i < booksstoraged.length; i++) {
      appendNewBook(booksstoraged[i]);
    }
  } else  {
    console.log('empty');
  }
});