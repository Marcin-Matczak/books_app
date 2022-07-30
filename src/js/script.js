'use strict';

const templates = {
  books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const booksList = document.querySelector('.books-list');
console.log('BooksList(kontener z ksiązkami <ul>):', booksList);

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

const initActions = function(){     

  booksList.addEventListener('dblclick', function(event){

    event.preventDefault();      
    const clickedBook = event.target.offsetParent;
    console.log('clickedBook:', clickedBook);

    if(clickedBook.classList.contains('book__image')){
      
      const dataId = clickedBook.getAttribute('data-id');
      const indexOfdataId = favoriteBooks.indexOf(dataId);      

      if(!clickedBook.classList.contains('favorite')){
        clickedBook.classList.add('favorite');
        favoriteBooks.push(dataId);
      } else {

        clickedBook.classList.remove('favorite'); 
        favoriteBooks.splice(indexOfdataId, 1);      
          
      }
      console.log('TARGET:', clickedBook);
      console.log('Favorite Books:', favoriteBooks);
      console.log('test:', indexOfdataId);
    }
    
          
  }); 
    
  
};

initActions();


