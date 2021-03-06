$(document).ready(function () {
  // Browser compatibility ie11 (forEach)
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // главный слайдер на странице brief
  const sliderAbout = document.querySelector('.js-about-slider');
  let swiper = new Swiper(sliderAbout, {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next.slider__arrows-next',
      prevEl: '.swiper-button-prev.slider__arrows-prev',
    },
    on: {
      transitionEnd: function () {
        let section_header = $('.js-about-slider div.swiper-slide-active').data('section_header');
        let section_title = $('.js-about-slider div.swiper-slide-active').data('section_title');
        $('.about__info .section__title').html(section_header);
        $('.about__info .section__subtitle').html(section_title);
      },
    },
  });

  // слайдер наша команда на странице brief
  const sliderOurTeam = document.querySelector('.js-our-team-slider');
  let swiper2 = new Swiper(sliderOurTeam, {
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.our-team .swiper-button-next',
      prevEl: '.our-team .swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: false,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });

  // слайдер отзывы на странице brief
  const sliderReviews = document.querySelector('.js-reviews-slider');
  let swiper3 = new Swiper(sliderReviews, {
    slidesPerView: 2,
    spaceBetween: 20,
    autoHeight: true,
    // centeredSlides: true,
    loop: true,
    navigation: {
      nextEl: '.reviews .swiper-button-next',
      prevEl: '.reviews .swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // 768: {
      //   slidesPerView: 1,
      //   spaceBetween: 10,
      // },
    },
  });

  // показать больше в секции преимущества на странице brief START
  const btnMoreAdvantages = $('.js-advantages__btn-more');
  if (btnMoreAdvantages.length) {
    let advantagesItem = $('.advantages__item');
    // let advantagesItemVis = $('.advantages__item--visible');

    btnMoreAdvantages.on('click', function () {
      // advantagesItemVis.slideToggle();
      if (advantagesItem.hasClass('advantages__item--visible')) {
        advantagesItem.removeClass('advantages__item--visible');
      } else {
        advantagesItem.addClass('advantages__item--visible');
      }
      $(this).html(
        advantagesItem.hasClass('advantages__item--visible') ? 'свернуть преимущества' : 'развернуть преимущества'
      );
    });
  }
  // показать больше в секции преимущества на странице brief END

  // появление инфомации при скролле и клике(мобилка) о человеке в секции наша команда на странице brief START
  const ourTeamCard = document.querySelectorAll('.our-team__card');
  const ourTeamCardActiv = document.querySelector('.our-team__card.swiper-slide-active .our-team__card-info');
  let ourTeamCardActivInfoShow = false;

  function showOurTeamCardActivInfo(el) {
    el.classList.add('scroll');
    ourTeamCardActivInfoShow = true;
    setTimeout(function () {
      el.classList.remove('scroll');
    }, 800);
  }

  // появление при скролле
  if (ourTeamCard.length) {
    window.addEventListener('scroll', function () {
      ourTeamCard.forEach(function (el, i) {
        if (
          el.getBoundingClientRect().top <= document.documentElement.clientHeight / 2 &&
          ourTeamCardActivInfoShow == false
        ) {
          showOurTeamCardActivInfo(ourTeamCardActiv);
        }
      });
    });
  }

  // появление при клике на мобилке
  ourTeamCard.forEach(function (el) {
    el.addEventListener('click', function (e) {
      showOurTeamCardActivInfo(e.target.nextElementSibling);
    });
  });
  // появление инфомации о человеке секции наша команда на странице brief END

  // прохождение квиза START
  if ($('.tabs__item').length) {
    quiz();
  }

  function discount_num() {
    var percent = 0;
    $('.tabs__list .tabs__item').each(function (index, element) {
      var is_active = $(this).hasClass('active');
      var tab_persent = $(this).data('percent');
      percent += parseInt(tab_persent, 10);

      if (is_active) return false;
    });
    $('.discount__num').html(percent);
    let project_task = $('input[name="project-task"]:checked').val();
    if (project_task === 'Для жизни' && percent > 0) {
      $('div.discount').show();
    } else {
      $('div.discount').hide();
    }
  }

  function quiz() {
    $('.tabs__item').on('click', function () {
      var attrID = $(this).find('div.tabs__text').attr('data-tab');

      $(this).closest('.quiz__wrap').find('.tabs__item, .content__item').removeClass('active');

      $(this)
        .addClass('active')
        .closest('.quiz__wrap')
        .find('.content__item[data-id="' + attrID + '"]')
        .addClass('active');

      if (attrID == 'tab4') {
        $('.quiz__btn-next').css('display', 'none');
        $('.quiz__btn-prev').addClass('last-question');
        $('.quiz__btn-send').css('display', 'inline-block');
      } else {
        $('.quiz__btn-next').css('display', 'inline-block');
        $('.quiz__btn-prev').removeClass('last-question');
        $('.quiz__btn-send').css('display', 'none');
      }

      if (attrID == 'tab1') {
        $('.quiz__btn-prev').css('display', 'none');
      } else {
        $('.quiz__btn-prev').css('display', 'inline-block');
      }

      $(this).addClass('question__answered');
      discount_num();
    });

    $('.quiz__btn-next').on('click', function () {
      var tabs = $(this).closest('.quiz__wrap').find('.tabs__item');
      var currentIndex = tabs.index($(this).closest('.quiz__wrap').find('.tabs__item.active'));

      if (currentIndex === tabs.length - 1) {
        $(tabs[0]).trigger('click');
      } else {
        $(tabs[currentIndex + 1]).trigger('click');
      }
      discount_num();
    });

    $('.quiz__btn-prev').on('click', function () {
      var tabs = $(this).closest('.quiz__wrap').find('.tabs__item');
      var currentIndex = tabs.index($(this).closest('.quiz__wrap').find('.tabs__item.active'));

      if (!currentIndex) {
        $(tabs[$tabs.length - 1]).trigger('click');
      } else {
        $(tabs[currentIndex - 1]).trigger('click');
      }
      discount_num();
    });

    $(document).on('change', '.answer__input-file', function () {
      var file = $(this);
      var filename = file.val().replace(/.*\\/, '');
      defaultValue = 'прикрепить файл';
      file.next('.answer__input-file-text').addClass('filled-name').text(filename);
      if (file.val() == '') {
        file.next('.answer__input-file-text').removeClass('filled-name').text(defaultValue);
      }
    });
  }
  // прохождение квиза END

  // переход к квизу по якорю START
  $('a[href^="#quiz"], *[data-href^="#quiz"]').on('click', function (e) {
    e.preventDefault();
    var t = 1000;
    var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
    $('html,body')
      .stop()
      .animate({ scrollTop: $(d).offset().top }, t);
  });
  // переход к квизу по якорю END

  // переход к квизу по якорю при клике "следующий шаг" START
  $('a[href^="#quiz-next"], *[data-href^="#quiz-next"]').on('click', function (e) {
    e.preventDefault();
    var t = 300;
    var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
    $('html,body')
      .stop()
      .animate({ scrollTop: $(d).offset().top }, t);
  });
  // переход к квизу по якорю при клике "следующий шаг" END
});
