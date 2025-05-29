/**
* Template Name: Yummy
* Updated: Mar 12 2024 with Bootstrap v5.3.3
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // New latest JS for new landing page
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });

  const carousel = document.getElementById("carousel");
  const items = document.querySelectorAll(".carousel-item");
  let index = 1; // Start from the second item (center)
  const totalItems = items.length;

  function updateCarousel() {
    const itemWidth = items[0].offsetWidth;
    const offset = itemWidth * index - (window.innerWidth / 2) + (itemWidth / 2);
    carousel.style.transform = `translateX(-${offset}px)`;

    items.forEach((item, i) => {
      item.classList.remove("active");
      if (i === index) item.classList.add("active");
    });

    index = (index + 1) % (totalItems - 2); // loop within original 3
  }

  setInterval(updateCarousel, 5000);

  window.addEventListener("resize", updateCarousel); // adjust on resize

  // const swiper = new Swiper(".swiper", {
  //   loop: false,
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
  // });

  const playPauseButtons = document.querySelectorAll(".play-pause");
  const videos = document.querySelectorAll("video");
  const thumbnails = document.querySelectorAll(".video-thumbnail");

  playPauseButtons.forEach((button, index) => {
    const video = videos[index];
    const playIcon = button.querySelector(".play-icon");
    const pauseIcon = button.querySelector(".pause-icon");
    const thumbnail = thumbnails[index];
    const container = video.parentElement;

    const pauseAll = () => {
      videos.forEach((v, i) => {
        if (i !== index) {
          v.pause();
          thumbnails[i].classList.remove("hidden");
          playPauseButtons[i].classList.remove("hidden");
          playPauseButtons[i].querySelector(".play-icon").style.display = "block";
          playPauseButtons[i].querySelector(".pause-icon").style.display = "none";
        }
      });
    };

    container.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
      if (video.paused) {
        pauseAll();
        thumbnail.classList.add("hidden");
        video.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        setTimeout(() => button.classList.add("hidden"), 1000);
      } else {
        video.pause();
        button.classList.remove("hidden");
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });

    container.addEventListener("mouseleave", () => {
      if (!video.paused) {
        video.pause();
        button.classList.remove("hidden");
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      }
    });

    video.addEventListener("ended", () => {
      button.classList.remove("hidden");
      thumbnail.classList.remove("hidden");
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    });
  });

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
    el.addEventListener('click', function (event) {
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
    el.addEventListener('click', function (event) {
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
    const togglescrollTop = function () {
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
    autoplay: false,
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false
    // },
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
  // Pause on mouse enter / Resume on mouse leave
  const swiperContainer = document.querySelector('.slides-3');
  swiperContainer.addEventListener('mouseenter', () => swiper.autoplay.stop());
  swiperContainer.addEventListener('mouseleave', () => swiper.autoplay.start());


  //  Gallery Slider
  new Swiper('.gallery-slider', {
    speed: 1200,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
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
        slidesPerView: 3,
        spaceBetween: 40
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