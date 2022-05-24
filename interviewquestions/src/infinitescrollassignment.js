const API_BASE_URL = 'https://www.algoexpert.io/api/testimonials';

// Write your code here.
var testimonialContainer = document.getElementById("testimonial-container");
var limit = 5, after;
var lastSeenId = 0;
var hasNext;
var fetchInProgress = false;

fetchTestimonials(API_BASE_URL, limit);

function createTestimonial(message) {
  var pElement = document.createElement('p');
  pElement.classList.add('testimonial');
  pElement.innerText = message;
  return pElement;
}

function fetchTestimonials(baseUrl, limit, after){
  var url = new URL(baseUrl);
  url.searchParams.append('limit', limit);
  if(after && after > 0) {
    url.searchParams.append('after', after);
  }
  if(fetchInProgress) {
    return;
  }

  fetchInProgress = true;
  fetch(url).then(
    resp => resp.json()
  ).then(body => {
    console.log(body);
    fetchInProgress = false;
    hasNext = body.hasNext;
    if(body.testimonials && Array.isArray(body.testimonials)) {
      var allTestimonials = body.testimonials.map(testimonial => createTestimonial(testimonial.message));
      testimonialContainer.append(...allTestimonials);
    
      if(body.testimonials.length > 0) {
        lastSeenId = body.testimonials[body.testimonials.length - 1].id;
      }
    }
  }).catch(err => {
    fetchInProgress = false;
    console.log('error executing fetch = ',err);
  });
}

function debounce(wrapFn, delayMs) {
  var timerId;
  return function x(...args) {
    var context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      wrapFn.apply(context, args);
    }, delayMs);
  }
}

function fetchNextPage(){
  if(hasNext) {
    after = lastSeenId;
    fetchTestimonials(API_BASE_URL, limit, after);
  }
}

var debouncedHandler = function(ev) {
  var scrollTop = this.scrollTop;
  var clientHeight = this.clientHeight;
  var scrollHeight = this.scrollHeight;

  if(scrollTop + clientHeight >= scrollHeight) {
    console.log('almost reaching end of the page');
    fetchNextPage();
  }
};

testimonialContainer.addEventListener('scroll', debouncedHandler);