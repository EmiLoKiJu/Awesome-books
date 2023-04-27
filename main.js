/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */

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
  isStorage = true;
}

// Books functionalities

const bookscontainer = document.querySelector('.bookscontainer');
const addbook = document.querySelector('.addbutton');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Bookcollection {
  constructor() {
    this.collection = [];
  }

  addBook(book) {
    this.collection.push(book);
  }

  removeBook(book) {
    const index = this.collection.indexOf(book);
    this.collection.splice(index, 1);
  }
}
const bookcollection = new Bookcollection;

function appendNewBook(book) {
  bookcollection.addBook(book);
  localStorage.setItem('bookcollection', JSON.stringify(bookcollection));
  const div1 = document.createElement('div');
  div1.classList.add('dflex');
  div1.classList.add('spacebetween');
  if (bookcollection.collection.indexOf(book) % 2 !== 0) div1.classList.add('grey');
  const content = `<p>"${book.title}" by ${book.author}</p><button class="removebutton">Remove</button>`;
  div1.innerHTML = content;
  bookscontainer.appendChild(div1);
  const removebutton = div1.querySelector('.removebutton');
  removebutton.addEventListener('click', () => {
    bookcollection.removeBook(book);
    localStorage.setItem('bookcollection', JSON.stringify(bookcollection));
    div1.remove();
  });
}

addbook.addEventListener('click', () => {
  const newbook = new Book;
  newbook.title = document.querySelector('#title').value;
  newbook.author = document.querySelector('#author').value;
  appendNewBook(newbook);
});

document.addEventListener('DOMContentLoaded', () => {
  const booksstoraged = JSON.parse(localStorage.getItem('bookcollection'));
  if (isStorage && booksstoraged != null) {
    for (let i = 0; i < booksstoraged.collection.length; i++) {
      appendNewBook(booksstoraged.collection[i]);
    }
  }
});


// date and time

const datetime = document.querySelector(".dateandtime");

function updateTime() {
  const date = new Date();
  const options = {month: 'long' , year: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).replace(' at', ',');;
  datetime.innerHTML = formattedDate;
}

setInterval(updateTime, 1000);

// navbar 

function menuselector(menuelement) {
  for(let i = 0; i < menu.length; i++) {
    if(menuelement == menu[i]) {
      if (!menu[i].classList.contains('activewindow')) menu[i].classList.add('activewindow');
      if (section[i].classList.contains('dnone')) section[i].classList.remove('dnone');
    } else {
      if (menu[i].classList.contains('activewindow')) menu[i].classList.remove('activewindow');
      if (!section[i].classList.contains('dnone')) section[i].classList.add('dnone');
    }
  }
}

const menu = document.querySelectorAll('header li');
const section = document.querySelectorAll('.section');
for(let i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', () => {
    menuselector(menu[i]);
  });
}
