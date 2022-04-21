//-----------------------------------------------------------------------------
// Utility Functions
//
var ready = function(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var elMatches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

// https://stackoverflow.com/questions/45905160/javascript-on-window-resize-end
var debounce = function(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,250,event);
  };
}

var isValidEmail = function(email) {
  return email.match(/[^@]+@[^@]+\.[^@]+/);
}

/* SLIDE UP */
// https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
var slideUp = function(target, duration) {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;

  window.setTimeout(function() {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
}

/* SLIDE DOWN */
// https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
var slideDown = function(target, duration) {
  target.style.removeProperty('display');
  var display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');

  window.setTimeout(function() {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

/* TOOGLE */
// https://dev.to/bmsvieira/vanilla-js-slidedown-up-4dkn
var slideToggle = function(target, duration) {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

//-----------------------------------------------------------------------------
// Mobile Navigation
//
document.getElementById('nav-toggle').addEventListener('click', function () {
  document.body.classList.toggle('nav-open');
}, false);

//-----------------------------------------------------------------------------
// Navigation
//

// Sticky Desktop Navigation
var header = document.getElementsByTagName('header')[0];

function initStickyHeader() {
  if (window.pageYOffset > 80) { /* 147 - 67 */
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

window.addEventListener('load', function(){
  initStickyHeader();
});

window.addEventListener('scroll', function(){
  debounce(initStickyHeader());
});

// Desktop dropdown nav
var navItemDropdowns = document.querySelectorAll('li.nav-item-dropdown');

Array.prototype.forEach.call(navItemDropdowns, function(el, i){
  el.addEventListener('mouseenter', function( e ) {
    e.target.classList.add('hover')
    document.body.classList.add('dropdown-visible')
  })
  el.addEventListener('mouseleave', function( e ) {
    e.target.classList.remove('hover')
    document.body.classList.remove('dropdown-visible')
  })
});

//-----------------------------------------------------------------------------
// Articles Category Select
//
if (document.getElementById('category-select-form')) {

  function getMatchingArticles(category) {
    return category === '' ? document.getElementsByClassName('article-col') : document.querySelectorAll('.article-col[data-category="' + category + '"]');
  }

  function getNumMatchingPages(matchingArticles) {
    return Math.ceil(matchingArticles.length / 9);
  }

  function buildPagination(pagination, numMatchingPages, category, matchingArticles) {
    pagination.innerHTML = '';

    if (numMatchingPages > 1) {
      // build pagination if more than one page
      for (var i = 1; i <= numMatchingPages; i++) {
        if (currPage == i) {
          pagination.insertAdjacentHTML('beforeend', '<button data-page="' + i + '" disabled>' + i + '</button> ');
        } else {
          pagination.insertAdjacentHTML('beforeend', '<button data-page="' + i + '">' + i + '</button> ');
        }
      }
      // attach paging events to buttons
      Array.prototype.forEach.call(document.querySelectorAll('#pagination button:not(:disabled)'), function(el, i) {
        el.addEventListener('click', function (e) {
          currPage = el.getAttribute('data-page');
          showMatchingArticles(category);
          paginateArticles(matchingArticles);
          buildPagination(pagination, numMatchingPages, category, matchingArticles);
          window.scroll({top: 0, behavior: "smooth"});
        }, false);
      });
    } else {
      pagination.innerHTML = '&nbsp;';
    }
  }

  function paginateArticles(matchingArticles) {
    Array.prototype.forEach.call(matchingArticles, function(el, i) {
      (i < ((currPage - 1) * 9) || i > (currPage * 9 - 1)) && (el.style.display = 'none');
    });
  }

  function showMatchingArticles(category) {
    Array.prototype.forEach.call(document.getElementsByClassName('article-col'), function(el, i) {
      category === '' || elMatches(el, '[data-category="'+ category + '"]') ? el.style.display = 'flex' : el.style.display = 'none';
    });
  }

  var pagination = document.getElementById('pagination');
  var categorySelect = document.getElementById('category-select');
  var category = categorySelect.value || '';
  var matchingArticles = getMatchingArticles(category);
  var numMatchingPages =getNumMatchingPages(matchingArticles);
  var currPage = 1;

  showMatchingArticles(category);
  paginateArticles(matchingArticles);
  buildPagination(pagination, numMatchingPages, category, matchingArticles);

  document.getElementById('category-select').addEventListener('change', function (e) {
    category = e.target.value || '';
    matchingArticles = getMatchingArticles(category);
    numMatchingPages = getNumMatchingPages(matchingArticles);
    currPage = 1;

    showMatchingArticles(category)
    paginateArticles(matchingArticles);
    buildPagination(pagination, numMatchingPages, category, matchingArticles);
  }, false);
}

//-----------------------------------------------------------------------------
// Accordion
//
var accordionItems = document.querySelectorAll('.accordion-item');

function collapseAccordionItem(item) {
  item.classList.add('collapsed');
  item.querySelector('.accordion-button').setAttribute('aria-expanded', 'false');
  slideUp(item.querySelector('.accordion-collapse'), 300);
}

function openAccordionItem(item) {
  item.classList.remove('collapsed');
  item.querySelector('.accordion-button').setAttribute('aria-expanded', 'true');
  slideDown(item.querySelector('.accordion-collapse'), 300);
}

function collapseAccordionItems(items) {
  Array.prototype.forEach.call(items, function(el, i){
    collapseAccordionItem(el);
  });
}

Array.prototype.forEach.call(accordionItems, function(el, i){

  // hide initially
  collapseAccordionItem(el);

  el.addEventListener('click', function(){
    var accordionItemOpen = document.querySelector('.accordion-item:not(.collapsed)');

    if (el.classList.contains('collapsed')) {
      accordionItemOpen && collapseAccordionItem(accordionItemOpen);
      openAccordionItem(el);
    } else {
      collapseAccordionItems(accordionItems);
    }
  });
});

//-----------------------------------------------------------------------------
// Forms
//
var formInputs = document.querySelectorAll('.form-group input[type="text"], .form-group input[type="email"], .form-group textarea');

Array.prototype.forEach.call(formInputs, function(el, i){
  el.addEventListener('blur', function(){

    if (el.value === '') {
      el.classList.remove('dirty')
      el.required && el.parentNode.classList.add('error');
    } else {
      el.classList.add('dirty');

      if (el.type === 'email') {
        isValidEmail(el.value) ? el.parentNode.classList.remove('error') : el.parentNode.classList.add('error');
      } else {
        el.parentNode.classList.remove('error');
      }
    }
  });
});

//-----------------------------------------------------------------------------
// Product Gallery
//
window.addEventListener('load', function(){

  if (document.getElementById('scent') && document.querySelector('.product-gallery-slider')) {

    var size = document.body.getAttribute('data-size');
    var scentSelect = document.getElementById('scent');
    var gallerySlider;
    var isDesktop = window.matchMedia('(min-width:960px)').matches;
    var productImages = {
      '4-gallon-small-bathroom': {
        'citrus-sandalwood': [
          '4gal-citrus-sandalwood-front.jpg',
          '4gal-citrus-sandalwood-back.jpg'
        ],
        'lavender': [
          '4gal-lavender-front.jpg',
          '4gal-lavender-back.jpg'
        ],
        'ocean-mist': [
          '4gal-ocean-mist-front.jpg',
          '4gal-ocean-mist-back.jpg'
        ],
        'teakwood-rose': [
          '4gal-teakwood-rose-front.jpg',
          '4gal-teakwood-rose-back.jpg'
        ],
        'calming-collection': [
          '4gal-calming-collection-front.jpg',
          '4gal-calming-collection-angle.jpg'
        ],
        'fresh-collection': [
          '4gal-fresh-collection-front.jpg',
          '4gal-fresh-collection-angle.jpg'
        ]
      },
      '8-gallon-medium-laundry-office': {
        'fresh-air': [
          '8gal-fresh-air-front.jpg',
          '8gal-fresh-air-back.jpg'
        ],
        'lavender-sage': [
          '8gal-lavender-sage-front.jpg',
          '8gal-lavender-sage-back.jpg'
        ],
        'vanilla-flower': [
          '8gal-vanilla-flower-front.jpg',
          '8gal-vanilla-flower-back.jpg'
        ],
        'clean-collection': [
          '8gal-clean-collection-front.jpg',
          '8gal-clean-collection-angle.jpg'
        ]
      },
      '8-gallon-medium-kitchen': {
        'simply-clean': [
          '8gal-simply-clean-front.jpg',
          '8gal-simply-clean-back.jpg'
        ]
      },
      '13-gallon-tall-kitchen': {
        'fresh-air': [
          '13gal-fresh-air-horizontal.jpg',
          '13gal-fresh-air-vertical.jpg'
        ],
        'lavender-sage': [
          '13gal-lavender-sage-horizontal.jpg',
          '13gal-lavender-sage-vertical.jpg'
        ],
        'simply-clean': [
          '13gal-simply-clean-horizontal.jpg',
          '13gal-simply-clean-vertical.jpg'
        ],
        'sweet-orange-citrus': [
          '13gal-sweet-orange-citrus-horizontal.jpg',
          '13gal-sweet-orange-citrus-vertical.jpg'
        ]
      }
    }

    function initGallerySlider(size, scent, productImages) {
      var imgSrcs = productImages[size][scent];
      var imgLocation = '/assets/img/products/' + size + '/'
      var productGalleryImages = document.querySelectorAll('.product-gallery-slider > img');
      var productGalleryThumbs = document.querySelectorAll('.product-gallery-thumbs > img');

      Array.prototype.forEach.call(productGalleryImages, function(el, i){
        el.src = imgLocation + imgSrcs[i];
      });

      Array.prototype.forEach.call(productGalleryThumbs, function(el, i){
        el.src = imgLocation + imgSrcs[i];
      });

      if (isDesktop) {
        gallerySlider = tns({
          container: '.product-gallery-slider',
          autoplay: false,
          autoplayButtonOutput: false,
          controls: false,
          navPosition: 'bottom',
          navContainer: '#product-gallery-thumbs',
          navAsThumbnails: true,
        });
      } else {
        gallerySlider = tns({
          container: '.product-gallery-slider',
          autoplay: true,
          autoplayButtonOutput: false,
          controls: false,
          navPosition: 'bottom',
        });
      }
    }

    function rebuildGallerySlider(size, scent, productImages) {
      if (isDesktop !== window.matchMedia('(min-width:960px)').matches) {
        isDesktop = window.matchMedia('(min-width:960px)').matches;
        gallerySlider.destroy();
        initGallerySlider(size, scent, productImages);
      }
    }

    function rebuildGallerySliderScent(size, scent, productImages) {
      gallerySlider.destroy();
      initGallerySlider(size, scent, productImages);
    }

    document.body.setAttribute('data-scent', scentSelect.value);
    initGallerySlider(size, scentSelect.value, productImages);

    scentSelect.addEventListener('change', function (e) {
      document.body.setAttribute('data-scent', e.target.value);
      rebuildGallerySliderScent(size, e.target.value, productImages)
    });

    // rebuild slider when screen size changes
    window.addEventListener('resize', function(){
      debounce(rebuildGallerySlider(size, scentSelect.value, productImages));
    });
  }
});

//-----------------------------------------------------------------------------
// 
//
window.addEventListener('load', function(){

  // Honme Hero Slider
  if (document.querySelector('.hero-slider')) {
    var articlesSlider = tns({
      container: '.hero-slider',
      autoplay: true,
      autoplayButtonOutput: false,
      controls: false,
      navPosition: 'bottom'
    });  
  }

  // Featured Articles Slider
  if (document.querySelector('.articles-slider')) {
    var articlesSlider = tns({
      container: '.articles-slider',
      autoplay: true,
      autoplayButtonOutput: false,
      controls: false,
      navPosition: 'bottom',
      responsive: {
        768: {
          items: 2
        },
        960: {
          items: 3
        }
      }
    });  
  }

  // Related Products Slider
  if (document.querySelector('.products-slider')) {
    var articlesSlider = tns({
      container: '.products-slider',
      autoplay: true,
      autoplayButtonOutput: false,
      controls: false,
      navPosition: 'bottom',
      responsive: {
        768: {
          items: 2
        },
        960: {
          items: 3
        }
      }
    });
  }
  
  // Testimonials Slider
  if (document.querySelector('.testimonials-slider')) {
    var articlesSlider = tns({
      container: '.testimonials-slider',
      loop: false,
      autoplay: true,
      autoplayButtonOutput: false,
      navPosition: 'bottom',
    });
  }
});
