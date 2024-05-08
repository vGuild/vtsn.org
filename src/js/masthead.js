//---- CAROUSEL -------------------------------
let removeClassesTimeout = 6500;
let autoAdvanceNextTimeout = 7000;

// step 1: get DOM items
const nextDom = document.getElementById('mastheadNext');
const prevDom = document.getElementById('mastheadPrev');

const carouselDom = document.querySelector('.masthead-carousel');
const SliderDom = carouselDom.querySelector('.masthead-carousel .list');
const thumbnailBorderDom = document.querySelector(
  '.masthead-carousel .masthead-thumbnail'
);
const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

// this is for the countdown slider at the top of the page
const timeDom = document.getElementById('mastheadCarouselTime');

// step 2:
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// step 3: assign onclick event handlers
nextDom.onclick = function () {
  showSliderItem('mastheadNext');
};

prevDom.onclick = function () {
  showSliderItem('mastheadPrev');
};

// step 4: declare variable for removing classes from the carousel
let tempRemoveClassesTimeout = setTimeout(() => {
  carouselDom.classList.remove('masthead-next');
  carouselDom.classList.remove('masthead-prev');
  timeDom.classList.remove('masthead-next');
  timeDom.classList.remove('masthead-prev');
}, removeClassesTimeout);

// step 5: declare variable for auto advance of slider items
let runNextAutoAdvance = setTimeout(() => {
  mastheadNext.click();
}, autoAdvanceNextTimeout);

// step 6: declare function to handle the onclick events
function showSliderItem(type) {
  let sliderItemsDom = SliderDom.querySelectorAll(
    '.masthead-carousel .list .item'
  );

  let thumbnailItemsDom = document.querySelectorAll(
    '.masthead-carousel .masthead-thumbnail .item'
  );

  if (type === 'mastheadNext') {
    // next (mastheadNext)
    SliderDom.appendChild(sliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add('masthead-next');
    timeDom.classList.add('masthead-next');
  } else {
    // previous (mastheadPrev)
    SliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add('masthead-prev');
    timeDom.classList.add('masthead-prev');
  }

  // clear the timeout
  clearTimeout(tempRemoveClassesTimeout);
  // reassign the timeout
  tempRemoveClassesTimeout = setTimeout(() => {
    console.log(
      'Setting timeout for tempRemoveClassesTimeout: ' + removeClassesTimeout
    ); // after 6 seconds
    // remove the classes from the carousel and the timer bar
    carouselDom.classList.remove('masthead-next');
    carouselDom.classList.remove('masthead-prev');
    timeDom.classList.remove('masthead-next');
    timeDom.classList.remove('masthead-prev');
  }, removeClassesTimeout);

  // clear the timeout
  clearTimeout(runNextAutoAdvance);
  // reassign the timeout
  runNextAutoAdvance = setTimeout(() => {
    console.log(
      'Setting timeout for runNextAutoAdvance: ' + autoAdvanceNextTimeout
    ); // after 7 seconds
    // on timeout, activate the mastheadNext click event
    mastheadNext.click();
  }, autoAdvanceNextTimeout);
}
