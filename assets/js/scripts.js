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

var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}

// https://stackoverflow.com/questions/45905160/javascript-on-window-resize-end
var debounce = function(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,100,event);
  };
}

var isValidEmail = function(email) {
  return email.match(/[^@]+@[^@]+\.[^@]+/);
}

//-----------------------------------------------------------------------------
// Mobile Navigation
//
document.getElementById('nav-toggle').addEventListener('click', function () {
  document.body.classList.toggle('nav-open');
}, false);

//-----------------------------------------------------------------------------
// Sticky Desktop Navigation
//
var header = document.getElementsByTagName('header')[0];

function initStickyHeader() {
  if (window.pageYOffset > 80) { /* 147 - 67 */
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

window.addEventListener('load', function(){
  initStickyHeader()
});

window.addEventListener('scroll', function(){
  debounce(initStickyHeader());
});

//-----------------------------------------------------------------------------
// Articles Category Select
//
if (document.getElementById('category-select-form')) {

  document.getElementById('category-select').addEventListener('change', function (e) {
    var el = e.target;
    var category = el.value;

    Array.prototype.forEach.call(document.getElementsByClassName('article-col'), function(el, i) {
      category === '' || matches(el, '[data-category="'+ category + '"]') ? el.style.display = 'flex' : el.style.display = 'none';
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
  item.querySelector('.accordion-collapse').style.display = 'none';
}

function openAccordionItem(item) {
  item.classList.remove('collapsed');
  item.querySelector('.accordion-button').setAttribute('aria-expanded', 'true');
  item.querySelector('.accordion-collapse').style.display = 'block';
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
    if (el.classList.contains('collapsed')) {
      collapseAccordionItems(accordionItems);
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
// Sliders
//
window.addEventListener('load', function(){

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
