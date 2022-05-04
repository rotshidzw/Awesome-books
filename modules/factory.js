export class Factory {
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

export default Factory;