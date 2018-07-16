/**
 * GET request fetching all data
 * @param {string} url
 */
const fetchData = async (url) => {
  try {
    return await (await fetch(url)).json();
  } catch (exception) {
    console.error(`Failed to retrieve data: (${exception})`);
  }
}

/**
 * Reduce array to match each Cat with speficic Genre
 * @param {array} data
 */
const getItems = function(data) {
  return data.reduce(function (item, cat) {
    item[cat.genre] = item[cat.genre] || [];
    item[cat.genre].push(cat);
    return item;
  }, Object.create(null));
}

export { fetchData, getItems };