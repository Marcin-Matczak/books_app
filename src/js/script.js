'use strict';

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

const booksImages = booksList.querySelectorAll('.book__image');

const initActions = function(){      

  for(let bookImage of booksImages){
    
    bookImage.addEventListener('dblclick', function(event){
      event.preventDefault();
      
      const clickedElement = this;
      console.log('clickedelement:', clickedElement);

      const dataId = clickedElement.getAttribute('data-id');
      const indexOfdataId = favoriteBooks.indexOf(dataId);
      

      if(!clickedElement.classList.contains('favorite')){
        clickedElement.classList.add('favorite');
        favoriteBooks.push(dataId);
      } else {

        clickedElement.classList.remove('favorite'); 
        favoriteBooks.splice(indexOfdataId, 1);      
          
      }

      console.log('Favorite Books:', favoriteBooks);
      console.log('test:', indexOfdataId);
          
    }); 
  }  
  return favoriteBooks;
};

initActions();


