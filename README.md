# Welcome
[netflix-and-code.netlify.com](https://netflix-and-code.netlify.com/)

## Requirements

  - Node.js + NPM

## Installation
In order to setup, run and start the app locally you just have to:

  - Clone this repository
  - `npm install`
  - `npm run scrape` to perform new scrape and store it in `public/api/`
  - `npm run start` for an express server on port 3000


## Batteries Included

  - laravel-mix for asset management (let me know if you're okay with that)
  - I've also set an Express server that listens on port 3000
  - Sass for better structured CSS
  - Puppeteer for Automation and Scrapping

## TODOS

  - Refactor the Web scraper script.
  - Unit Tests.
  - Responsiveness, browser testing, support legacy browsers, performance and accessibility.
  - Add Polyfills to support the Promise & Fetch object.
  - Force HTTPS and Implement Service worker and PWA.

I consider time a very important part of a project - I spent a total of 16 hours. It has only been tested in Chrome and Firefox. With more time I would invest it dealing with the filters functionality, support for all browsers (Promise and Fetch) and UI animations, 
either way I really tried to give it my best :)

## Structure

```
Netflix and Code
|   webscraper.js
|   server.js
|   README.md
|   package.json
|   ...
|
|___src
|   |  
|   |  
|   |   
|   |   
|   |
|   |___scripts
|   |   |   app.js
|   |   |   /utils (data.js)
|   |   |   /core (Element/Modal/Search)
|   |     
|   |   
|   |   
|   |___styles
|   |    |   app.scss   
|   |    |
|   |    |____abstracts
|   |    |      _variables.scss (mainly colors and typography)
|   |    |
|   |    |____base
|   |    |      _base.scss (a small reset)
|   |    |      
|   |    |
|   |    |____components
|   |    |      _buttons.scss
|   |    |      _modal.scss
|   |    |      ...
|   |    |
|   |    |____layout
|   |    |      _layout.scss (main content/skeleton)
|   |    |      _grid.scss
|   |    |      _header.scss
|   |    |      _footer.scss       
|   |    |      
|   | 
|   |
|   
|        
|
|___node_modules
|    |   ...  
|
|___public
    |   index.html
    |   /styles
    |   /scripts
    |    
    |___api
        | netflix.json (the required data)
        |
```
