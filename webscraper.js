const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://www.whats-on-netflix.com/news/the-netflix-id-bible-every-category-on-netflix';

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitFor(33000);

  const result = await page.evaluate(() => {
    // Select the important DOM Nodes
    let elements = document.querySelectorAll(
      'article > div.entry.themeform > div.entry-inner > p'
    );

    let data = [];

    // Create the records with Key Value pairs - {title} {link} {genre}
    for (let element of elements) {
      let title, genre, link;
      
      let content = element.innerText;
      
      if (!content) {
        genre = element.querySelector('img')
          .attributes[2].nodeValue
          .split('/').pop()
          .split('.').reverse().pop();
      }

      if (!isNaN(content.charAt(0)) && content !== '') {
          let index = content.indexOf('=');
          title = content.substring(index).replace('=', '').trim();
          link = 'https://netflix.com/browse/genre/' + 
            content.substring(0, index).trim();
      }

      data.push({title, link, genre});
    }

    return data;
  });

  browser.close();
  return result;
};

scrape()
.then((data) => {

  // Organize the data - removes line breaks and creates the according links
  for (let [index, el] of data.entries()) {
    if ((el.title.match(/\n/g)||[]).length >= 1) {
      
      //check for line breaks
      let lineBreak = el.title.indexOf('\n');
      let newEl = el.title
        .substring(lineBreak)
        .replace('\n', '').trim();

      //Create the links based on the number record
      let equals = newEl.indexOf('=');
      let newTitle = newEl.substring(equals).replace('=', '').trim();
      let newLink = 'https://netflix.com/browse/genre/' + newEl.substring(0, equals).trim();
      
      data.splice(index + 1, 0, 
        {title: newTitle, link: newLink, genre: el.genre});

      el.title = el.title.substring(0, lineBreak).trim();
    }
  }

  // Determine the genre for each category record
  for (let el in data) {
    let n = Number(el);
    let i = parseInt(n+1);
    if (data[el].genre !== '') {
      let genre = data[el].genre;
      if (i <= data.length-1) {
        if (data[i].genre !== '' && data[i].genre !== data[el].genre) {
          data[i+1].genre = data[el].genre;
          data[i+1].genre = data[i+2].genre;
        } else {
          data[i].genre = data[el].genre;
        }
      }
    }
  }

  // Remove empty records
  let filteredData = data.filter((el) => el.title !== '');

  // Beautify the Genre text
  for (let el of filteredData) {
    let modGenre = el.genre.replace(/-/g, ' ')
      .replace('categories', '')
      .replace('netflix', '')
      .replace('category', '')
      .trim();

    // Replace {spaces} by {&} in Movies Genre
    let movieGenre = (modGenre.includes('movies')) ? modGenre :  modGenre.replace(/ /g, ' & ');

    // Replace {&} by {-} in Movies sci Genre
    let fixedGenre = (movieGenre.includes('sci')) ? movieGenre.replace(' & ', '-') : movieGenre;

    let items = [];
    items.push({
      title: el.title,
      link: el.link, 
      genre: fixedGenre
    });
  }

  // Create JSON File with the current data
  fs.writeFile('./public/api/netflix.json', 
    JSON.stringify(items), (error) => {
    console.log(error);
  });
});