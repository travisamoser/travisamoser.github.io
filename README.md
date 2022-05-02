# Berry Global Color Scents Website Redesign

The website is a static HTML site, but uses the `node-sass` package to generate the CSS file.

## Installation

`npm install`

## Usage

`npm run compile:css` converts SCSS to CSS

`npm run watch` watches all SCSS files for changes and then recompiles CSS file

## Fonts

Uses [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) webfont. Fonts were downloaded locally for performance reasons with the help of [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts)

## Content Styling

Some utility classes are provided [here](assets/scss/utilities/_typography.scss) based on [Tailwind.css](https://tailwindcss.com/) utilities

In addition [Bootstrap's Grid System](https://getbootstrap.com/docs/5.1/layout/grid/) is included for laying out content in columns

## JavaScript Plugins

### Lazyframe

Documentation: [https://github.com/vb/lazyframe](https://github.com/vb/lazyframe)

Lazyframe creates a responsive placeholder for embedded content and requests it when the user interacts with it. This decreases the page load and idle time.

Used to lazy load the homepage video code.

### Tiny Slider

Documentation: [https://github.com/ganlanyuan/tiny-slider](https://github.com/ganlanyuan/tiny-slider)

Tiny slider for all purposes, inspired by [Owl Carousel](https://owlcarousel2.github.io/OwlCarousel2/).

Used throughout the site.

### Drift

Documentation: [https://github.com/imgix/drift](https://github.com/imgix/drift)

Drift adds easy "zoom on hover" functionality to your site's images, all with lightweight, no-dependency JavaScript. 

Used on the product images on product pages.

### Tippy

Documentation: [https://atomiks.github.io/tippyjs/](https://atomiks.github.io/tippyjs/)

Tippy.js is the complete tooltip, popover, dropdown, and menu solution for the web, powered by [Popper](https://popper.js.org/).

It provides the logic and optional styling of elements that "pop out" from the flow of the document and float next to a target element.

Used on the product pages for the "scent features"