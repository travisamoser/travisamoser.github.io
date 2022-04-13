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

  document.getElementById('category-select').addEventListener('change', function (e) {
    var el = e.target;
    var category = el.value;

    Array.prototype.forEach.call(document.getElementsByClassName('article-col'), function(el, i) {
      category === '' || elMatches(el, '[data-category="'+ category + '"]') ? el.style.display = 'flex' : el.style.display = 'none';
    });
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
  // item.querySelector('.accordion-collapse').style.display = 'none';
}

function openAccordionItem(item) {
  item.classList.remove('collapsed');
  item.querySelector('.accordion-button').setAttribute('aria-expanded', 'true');
  slideDown(item.querySelector('.accordion-collapse'), 300);
  // item.querySelector('.accordion-collapse').style.display = 'block';
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
// Scent Selector
//
if (document.getElementById('scent')) {
  var scentSelect = document.getElementById('scent');

  document.body.setAttribute('data-scent', scentSelect.value);

  scentSelect.addEventListener('change', function (e) {
    document.body.setAttribute('data-scent', e.target.value);
  });
}
//-----------------------------------------------------------------------------
// Sliders
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
  
  // Product Gallery Slider
  if (document.querySelector('.product-gallery-slider')) {

    // Can't use responsive options to change navigation to thumbnails
    // so have to destroy/rebuild the slider when screen size changes

    var articlesSlider;
    var isDesktop = window.matchMedia('(min-width:960px)').matches;

    function initArticlesSlider() {
      if (isDesktop) {
        articlesSlider = tns({
          container: '.product-gallery-slider',
          autoplay: false,
          autoplayButtonOutput: false,
          controls: false,
          navPosition: 'bottom',
          navContainer: '#product-gallery-thumbs',
          navAsThumbnails: true,
        });
      } else {
        articlesSlider = tns({
          container: '.product-gallery-slider',
          autoplay: true,
          autoplayButtonOutput: false,
          controls: false,
          navPosition: 'bottom',
        });
      }
    }

    function rebuildArticleSlider() {
      if (isDesktop !== window.matchMedia('(min-width:960px)').matches) {
        isDesktop = window.matchMedia('(min-width:960px)').matches;
        articlesSlider.destroy();
        initArticlesSlider();
      }
    }

    // rebuild slider when screen size changes
    window.addEventListener('resize', function(){
      debounce(rebuildArticleSlider());
    });

    // initial call on load
    initArticlesSlider();
  }
});
