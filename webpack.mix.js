const mix = require('laravel-mix');

mix.sass('src/styles/app.scss', 'public/styles/');

mix.js('src/scripts/app.js', 'public/scripts/app.js');