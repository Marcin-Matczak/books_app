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

const favoriteBooks = [];

function initActions(){

  const booksImages = booksList.querySelectorAll('.book__image');

  for(let bookImage of booksImages){
    bookImage.addEventListener('dblclick', function(event){
      event.preventDefault();
      bookImage.classList.add('favorite');
      const dataId = bookImage.getAttribute('data-id');
      
      if(bookImage.classList.contains('favorite')){
        
        console.log('data ID:', dataId);
        favoriteBooks.push(dataId);
      }      
    }); 
  }  
  return favoriteBooks;
}

initActions();
console.log('Favorite Books:', favoriteBooks);

