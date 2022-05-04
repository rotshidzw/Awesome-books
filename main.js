import { DateTime } from './luxon/luxon.js';
const [navList, navAdd, navContact] = document.querySelectorAll('.link');
const allBooks = document.querySelector('.book-list');
const addBook = document.querySelector('.form-title-add');
const contact = document.querySelector('.contact');
const datetime = document.getElementById('current-date');

class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }
 
  class Factory {
    static retrieveBooks= () => {
      const books = JSON.parse(localStorage.getItem('Books'));
      document.getElementById('tbody').innerHTML = '';
      for (let i = 0; i < books.length; i += 1) {
        document.getElementById('tbody').innerHTML += `<tr><td class="book-container">"${books[i].title}" by ${books[i].author} <button class="btn deletebtn" type="button" id="id${i}">Remove</button></td></tr>`;
      }
    }

      static createBook = (book) => {
        if (localStorage.getItem('Books') === null) {
          const books = [];
          books.push(book);
          localStorage.setItem('Books', JSON.stringify(books));
        } else {
          const books = JSON.parse(localStorage.getItem('Books'));
          books.push(book);
          localStorage.setItem('Books', JSON.stringify(books));
        }
        Factory.retrieveBooks();
        document.getElementById('form').reset();
      }

      static removeBook = (i) => {
        const books = JSON.parse(localStorage.getItem('Books'));
        books.splice(i, 1);
        localStorage.setItem('Books', JSON.stringify(books));
        Factory.retrieveBooks();
      }
}

const rederbook = () => {
    const deleteButtons = document.querySelectorAll('.deletebtn');
    deleteButtons.forEach((item) => {
      item.addEventListener('click', () => {
        const index = item.id.slice(-item.id.length + 2);
        Factory.removeBook(index);
        Factory.retrieveBooks();
        rederbook();
      });
    });
  };
  rederbook();

  navList.addEventListener('click', () => {
    allBooks.classList.remove('hidden');
    addBook.classList.add('hidden');
    contact.classList.add('hidden');
    navList.classList.add('active');
    navAdd.classList.remove('active');
    navContact.classList.remove('active');
    rederbook();
  });
  
  navAdd.addEventListener('click', () => {
    addBook.classList.remove('hidden');
    allBooks.classList.add('hidden');
    contact.classList.add('hidden');
    navAdd.classList.add('active');
    navList.classList.remove('active');
    navContact.classList.remove('active');
    rederbook();
  });
  
  navContact.addEventListener('click', () => {
    contact.classList.remove('hidden');
    allBooks.classList.add('hidden');
    addBook.classList.add('hidden');
    navContact.classList.add('active');
    navList.classList.remove('active');
    navAdd.classList.remove('active');
    rederbook();
  });
  const showtipme = () => {
    datetime.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    setTimeout(() => {
      showtipme();
    }, 1000);
  };
  
  window.onload = () => {
    contact.classList.add('hidden');
    allBooks.classList.add('hidden');
    addBook.classList.remove('hidden');
    showtipme();
    rederbook();
  };
  
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
  
    const book = new Book(title, author);
  
    Factory.createBook(book);
  });
  