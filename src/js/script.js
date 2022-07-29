const templates = {
  books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const booksList = document.querySelector('.books-list');

function render() {
  for (let book in dataSource.books) {
    const bookData = dataSource.books[book];
    const generatedHTML = templates.books(bookData);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(generatedDOM);
  }
  
}

render();
