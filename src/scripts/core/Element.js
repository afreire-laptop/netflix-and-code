/**
 * Template for the main list
 * and the Menu list
 */
class Element {

  /**
   * Constructor
   * @param data - Object containing the current Main List
   */
  constructor(data) {
    this.items = data;
  }

  /**
   * Template for the LI element in the Main list
   * @param {object} cat in data
   */
  renderCategory(cat) {
    return `
      <li class="search__category-item grid__cell" title="${cat.title}">
        <a class="search__category-link" 
          rel="noopener noreferrer" 
          href="${cat.link}" 
          title="${cat.title}">
            ${cat.title}
        </a>
      </li>`;
  }

  /**
   * Template for the UL element - We then render the Category template
   * @param {object} genre in data
   */
  renderList(genre) {
    return `
      <li class="search__genre-item" title="${genre}">
        <h2 class="search__genre-title" title="${genre}">${genre}</h2>
        <ul class="search__category-list grid">
          ${this.items[genre].map(cat =>
            this.renderCategory(cat)
          ).join('')}
        </ul>
      </li>`
  }

  /**
   * Template for the LI element in the Menu list
   * @param {object} genre in data
   */
  renderMenuList(genre) {
    return `
      <li class="search-filters-list__item">
        <a class="search-filters-list__link" 
          href="#" title="${genre}">${genre}</a>
      </li>`
  }

  /**
   * Template for the LI element in the Menu list
   * List item to reset Filters
   */
  renderMenuItemAll() {
    return `
      <li class="search-filters-list__item">
        <a class="search-filters-list__link is-selected" 
          href="#" title="all">All</a>
      </li>`
  }
}

export default Element;