import { fetchData, getItems } from './utils/data';
import Element from './core/Element';
import Search from './core/Search';
import Modal from './core/Modal';

// The url to fetch the current netflix list
const url = '/api/netflix.json';

// Get The required matching Element Nodes from the DOM
const el = {
  searchList: document.getElementById('js-search__genre-list'),
  menuList: document.getElementById('js-search-filters-list'),
  searchInput: document.getElementById('js-search'),
  btnCallToAction: document.getElementById('js-btn-search'),
  aside: document.getElementById('js-modal'),
  offCanvas: document.getElementById('js-off-canvas'),
  modalTitle: document.getElementById('js-modal__title'),
  modalContent: document.getElementById('js-block-search-filters'),
  btnModal: document.querySelectorAll('.js-btn-toggle-modal'),
  
  /**
   * Offset the main list from the top
   * so we can scroll to it
   */
  offsetList: function() {
    return this.searchList.getBoundingClientRect().top
  }
};

function runApp(data) {
  const items = getItems(data);
  const element = new Element(items);

  // Add first item to menu
  el.menuList.innerHTML = element.renderMenuItemAll();

  // Attach list Elements to the DOM
  for (let item in items) {
    el.searchList.innerHTML += element.renderList(item);
    el.menuList.innerHTML += element.renderMenuList(item);
  }

  // Get all matching Element Nodes from the DOM
  el.genres = document.querySelectorAll('.search__genre-item');
  el.categories = document.querySelectorAll('.search__category-item');
  el.links = document.querySelectorAll('.search__category-link');
  el.menuItems = document.querySelectorAll('.search-filters-list__link');

  // Iterate through the CAT list and filter  items on search input
  ['input', 'keyup'].forEach(event => {
    el.searchInput.addEventListener(event, function(e) {
      window.scroll(0, 0);
      
      if (e.which === 13 || e.which === 27) {
        this.blur();
      }

      let search = new Search(this.value.toLowerCase());

      [].forEach.call(el.categories, cat => {
        search.filterCategories(cat);
      });

      [].forEach.call(el.genres, genre => {
        search.filterGenres(genre);
      });

      //reset menu filters
      [].forEach.call(el.menuItems, item => {
        item.classList.remove('is-selected');
        if (item.getAttribute('title') === 'all') {
          item.classList.add('is-selected');
        }
      });
    });
  });

  // Open new window on every Category Link click
  [].forEach.call(el.links, link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(
        this.getAttribute('href'),
        this.getAttribute('title'),
        "resizable,scrollbars=yes,status=1"
      );
    });
  });

  // Create the Filters Menu Modal
  const modal = new Modal(el.aside, el.offCanvas, el.modalTitle, el.modalContent);
  
  // Toggle the filters Menu on click
  [].forEach.call(el.btnModal, (btn) => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      modal.toggle();
    });
  });

  // Iterate through the Filters Menu list and filter items by Genre on Click
  [].forEach.call(el.menuItems, (item) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();

      let val = this.getAttribute('title');
      
      // Reset previous search
      let search = new Search();
      search.reset(el.categories);

      el.searchInput.value = val;

      let menuSearch = new Search(val);

      [].forEach.call(el.menuItems, item => {
        item.classList.remove('is-selected');
      });

      this.classList.add('is-selected');

      [].forEach.call(el.genres, genre => {
        menuSearch.filterMenuGenres(genre);
      });

      modal.toggle();
      window.scroll(0,(el.offsetList() - 55));
    });
  });

  // Focus search input on click serach button CLA
  el.btnCallToAction.addEventListener('click', e => {
    e.preventDefault();
    window.scroll(0,0);
    el.searchInput.focus();
  });
};


/**
 * Fetch the required data
 * and start the application afterwards
 */
fetchData(url)
.then(data => runApp(data))
.catch((err) => {
  console.error('Error loading App...', err);
});