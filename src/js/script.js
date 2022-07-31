{
  'use strict';

  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const select = {
    booksList: '.books-list',
    bookImage: 'book__image',
    form: '.filters',
    favoriteBook: 'favorite',
    hiddenBook: 'hidden'
  };



  class BooksList {
    constructor() {
      const thisLibrary = this;    
      
      thisLibrary.initData();
      thisLibrary.getElements();
      thisLibrary.render();
      thisLibrary.initActions();
    }

    initData() {
      const thisLibrary = this;

      thisLibrary.data = dataSource.books;           
    }

    getElements() {
      const thisLibrary = this;

      thisLibrary.favoriteBooks = [];
      thisLibrary.filters = []; 

      thisLibrary.dom = {
        booksListContainer: document.querySelector(select.booksList),
        booksList: document.querySelector(select.booksList),
        bookImage: document.querySelector(select.bookImage),
        form: document.querySelector(select.form)
      };
    }

    render() {
      const thisLibrary = this;

      for (const booksId of thisLibrary.data) {
        thisLibrary.rating = booksId.rating;

        booksId.ratingBgc = this.determineRatingBgc(thisLibrary.rating);
        booksId.ratingWidth = thisLibrary.rating * 10;

        const generatedHTML = templates.booksTemplate(booksId);

        const element = utils.createDOMFromHTML(generatedHTML);

        thisLibrary.dom.booksListContainer.appendChild(element);
      }
    }    

    initActions() {
      const thisLibrary = this;

      this.dom.booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();

        if (event.target.offsetParent.classList.contains(select.bookImage)) {
          const clickedBook = event.target.offsetParent;
          const clickedBookId = clickedBook.getAttribute('data-id');

          if (clickedBook.classList.contains(select.favoriteBook)) {
            clickedBook.classList.remove(select.favoriteBook);
            thisLibrary.favoriteBooks.splice(
              thisLibrary.favoriteBooks.indexOf(clickedBookId),
              1
            );
          } else {
            clickedBook.classList.add(select.favoriteBook);
            thisLibrary.favoriteBooks.push(clickedBookId);
          }
        }
      });

      this.dom.form.addEventListener('click', function (event) {
        thisLibrary.clickedBook = event.target;

        if (thisLibrary.clickedBook.checked !== undefined) {
          if (thisLibrary.clickedBook.checked) {
            thisLibrary.filters.push(thisLibrary.clickedBook.value);
          } else {
            thisLibrary.filters.splice(
              thisLibrary.filters.indexOf(thisLibrary.clickedBook.value),
              1
            );
          }

          thisLibrary.filterBooks();
        }
      });
    }

    filterBooks() {
      const thisLibrary = this;

      for (const book of thisLibrary.data) {
        let shouldBeHidden = false;

        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          document.querySelector(`.book__image[data-id='${book.id}']`).classList.add(select.hiddenBook);
        } else {
          document.querySelector(`.book__image[data-id='${book.id}']`).classList.remove(select.hiddenBook);
        }
      }
    }

    determineRatingBgc() {
      const thisLibrary = this;

      let background = '';

      if (thisLibrary.rating <= 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (thisLibrary.rating > 6 && thisLibrary.rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (thisLibrary.rating > 8 && thisLibrary.rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (thisLibrary.rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }

  new BooksList();
}
