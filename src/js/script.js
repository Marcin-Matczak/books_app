'use strict';

const templates = {
  books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const booksList = document.querySelector('.books-list');

const render = function() {
  for (let book in dataSource.books) {
    const bookData = dataSource.books[book];
    const generatedHTML = templates.books(bookData);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(generatedDOM);
  }  
};

render();

const favoriteBooks = [];

const filters = [];

const initActions = function(){     

  booksList.addEventListener('dblclick', function(event){
    event.preventDefault();      
    const clickedBook = event.target.offsetParent;    

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
    }        
  }); 

  const form = document.querySelector('.filters');
  
  form.addEventListener('click', function(event){
    event.preventDefault();    
      
    if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){      
      const valuetype = event.target.value;      

      if(event.target.checked == true && filters.indexOf(valuetype) == -1){
        filters.push(valuetype);

      } else {
        filters.splice(filters.indexOf(valuetype), 1);
      }
    }  
    
    filterBooks();
    
  });
};

initActions();

function filterBooks(){  

  for(let book of dataSource.books){
    let shouldBeHidden = false;

    for(const filter of filters) {

      // [filter] --> nazwa właściwości details np. adults lub nonFiction
      if(!book.details[filter]) {        
        shouldBeHidden = true;
        break;                 
      }
    }
    if (shouldBeHidden) {
      document.querySelector(`.book__image[data-id="${book.id}"]`).classList.add('hidden');
    } else {
      document.querySelector(`.book__image[data-id="${book.id}"]`).classList.remove('hidden');
    }
  }
}