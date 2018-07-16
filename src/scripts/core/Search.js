class Search {

  /**
   * Constructor
   * @param val - string containing the current value, 
   * that being on Input or on Click
   */
  constructor(val) {
    this.val = val || '';
  }


  /**
   * Hightlight the LI Elements from the main List
   * containing the current val
   * @param {string} item - The text Content inside LI El
   */
  highlightItem(item) {
    let arr = item.getAttribute('title').
      toLowerCase().split(this.val);
    
    return arr.join(
      `<span class="is-highlight" tabindex="-1">${this.val}</span>`
    );
  }

  /**
   * Filter the Categories (LI Elements)
   * containing the current val
   * @param {string} cat - The LI Element Node
   */
  filterCategories(cat) {
    let title = cat.getAttribute('title').toLowerCase();
    if (!title.includes(this.val)) {
      cat.style.display = 'none';
      cat.classList.add('is--hidden');
    } else {
      cat.style.display = 'block';
      cat.classList.remove('is--hidden');
      let link = cat.querySelector('.search__category-link');
      link.innerHTML = this.highlightItem(cat);
    }
  }

  /**
   * Filter the Entire List for Genre
   * If none of the LI Elements contain the current val, 
   * hide the Genre UL
   * @param {string} genre
   */
  filterGenres(genre) {
    let childNodes = genre.querySelectorAll(
      '.search__category-list > .search__category-item'
    );
    let hiddenChildNodes = genre.querySelectorAll(
      '.search__category-list > .search__category-item.is--hidden'
    );

    let genreTitle = genre.querySelector(
      '.search__genre-title'
    );

    if (childNodes.length <= hiddenChildNodes.length) {
      genre.style.display = 'none';
    } else {
      genre.style.display = 'block';
    }

    if (genreTitle.textContent.toLowerCase().includes(this.val)) {
      [].forEach.call(hiddenChildNodes, (node) => {
        node.classList.remove('is--hidden');
        node.style.display = 'block';
      });
    }
  }

  /**
   * Reset the Categories
   * @param {array} categories
   */
  reset(categories) {
    [].forEach.call(categories, cat => {
      cat.style.display = 'block';
      cat.classList.remove('is--hidden');
      let link = cat.querySelector('.search__category-link');
      link.innerHTML = this.highlightItem(cat);
    });
  }

  /**
   * Filter the Entire List for Genre
   * If the clicked genre differs from the current val, 
   * hide the Genre UL
   * @param {string} genre
   */
  filterMenuGenres(genre) {
    if (this.val !== 'all') { 
      genre.style.display = 'none';

      if (genre.getAttribute('title') === this.val) {
        genre.style.display = 'block';
      }
    } else {
      genre.style.display = 'block';
    }
  }
}

export default Search;