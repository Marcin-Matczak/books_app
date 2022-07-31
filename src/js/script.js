{
  ('use strict');

  const templates = {
    books: Handlebars.compile(
      document.querySelector('#template-book').innerHTML
    ),
  };

  const determineRatingBgc = function (rating) {
    let background = '';

    if (rating <= 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  };

  const booksList = document.querySelector('.books-list');

  const render = function () {
    for (let book in dataSource.books) {
      const bookData = dataSource.books[book];
      bookData.ratingBgc = determineRatingBgc(bookData.rating);
      bookData.ratingWidth = bookData.rating * 10;
      const generatedHTML = templates.books(bookData);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);
    }
  };

  render();

  const favoriteBooks = [];

  const filters = [];

  const initActions = function () {
    booksList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedBook = event.target.offsetParent;

      if (clickedBook.classList.contains('book__image')) {
        const dataId = clickedBook.getAttribute('data-id');
        const indexOfdataId = favoriteBooks.indexOf(dataId);

        if (!clickedBook.classList.contains('favorite')) {
          clickedBook.classList.add('favorite');
          favoriteBooks.push(dataId);
        } else {
          clickedBook.classList.remove('favorite');
          favoriteBooks.splice(indexOfdataId, 1);
        }
      }
    });

    const form = document.querySelector('.filters');

    form.addEventListener('click', function (event) {
      event.preventDefault();

      if (
        event.target.tagName == 'INPUT' &&
        event.target.type == 'checkbox' &&
        event.target.name == 'filter'
      ) {
        const valuetype = event.target.value;

        if (event.target.checked == true && filters.indexOf(valuetype) == -1) {
          filters.push(valuetype);
        } else {
          filters.splice(filters.indexOf(valuetype), 1);
        }
      }

      filterBooks();
    });
  };

  initActions();

  function filterBooks() {
    for (let book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        // [filter] --> nazwa właściwości details np. adults lub nonFiction
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        document
          .querySelector(`.book__image[data-id='${book.id}']`)
          .classList.add('hidden');
      } else {
        document
          .querySelector(`.book__image[data-id='${book.id}']`)
          .classList.remove('hidden');
      }
    }
  }
}
