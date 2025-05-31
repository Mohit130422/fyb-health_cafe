/**
* Template Name: Yummy
* Updated: Mar 12 2024 with Bootstrap v5.3.3
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
  const glightboxs = GLightbox({
    selector: '.glightboxs'
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Gallery Slider
   */
  new Swiper('.gallery-slider', {
    speed: 400,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});
var show_error_div = function (className, message, fontColor) {
  $('.' + className).css('display', 'block').css('color', fontColor);
  $('.' + className).html(message);
  $('.' + className).delay(3000).fadeOut();
};

var leadSubmit = (leadType, request) => {
  let response;
  const url = leadSubmitUrl.replace('{leadType}', leadType.replace('_', '-').toLowerCase());
  console.log(url);
  ajaxCallForJsonBody(url, 'POST', JSON.stringify(request), null, (result) => {
      response = {status: result.status, message: result.message};
  }, false);
  return response;
}

var letterValidation = /^[a-zA-Z ]+$/;
$('#fyb-lead-submit').on('click', function () {
  let fullname = $('#name').val().trim();
  let emailId = $('#email').val().trim();
  let mobile = $('#mobile').val().trim();

  if (fullname.trim() == '') {
      $('#name').trigger('focus');
      show_error_div('error-message', 'Enter your full name!', '#f60a0a');
      return false;
  } else if (!fullname.match(letterValidation)) {
      show_error_div('error-message', 'Name field supports only alphbets and space!', '#f60a0a');
      $('.name-text-input').trigger('focus');
      return false;
  } else if (mobile == '') {
      $('#mobile').trigger('focus');
      show_error_div('error-message', 'Please enter Mobile number!', '#f60a0a');
      return false;
  } else if (IsMobileNumber(mobile) == false) {
      $('#mobile').trigger('focus');
      show_error_div('error-message', 'Mobile number is not valid!', '#f60a0a');
      return false;
  } else if (emailId == '') {
      $('#email').trigger('focus');
      show_error_div('error-message', 'Please enter Email Id!', '#f60a0a');
      return false;
  } else if (validateEmail(emailId) == false) {
      $('#email').trigger('focus');
      show_error_div('error-message', 'Email Id is not valid!', '#f60a0a');
      return false;
  }
  
  const response = leadSubmit('PRODUCTS', {
    firstName: fullname.split(' ').slice(0, -1).join(' '),
    lastName: fullname.split(' ').slice(-1).join(' '),
    mobile: mobile,     emailId: emailId,
    productId: 36
  });
  if(response.status !== 200){
      show_error_div('error-message', response.message, '#f60a0a');
      return;
  }
  show_error_div('error-message', 'Your request has been received. We will contact you soon!', '#8ec15f');
  $('#kidfit-form').trigger('reset');
});

