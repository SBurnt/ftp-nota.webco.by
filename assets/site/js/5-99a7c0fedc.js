webpackJsonp([5],{23:function(e,t,r){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}[].concat(a(document.querySelectorAll("[data-hover-slideshow]"))).forEach(function(e){var t=[].concat(a(e.querySelectorAll("[data-hover-slideshow-image]"))),r=void 0;e.addEventListener("mouseover",function(){r=setInterval(function(){var e,r,a,o;r=(e=t).find(function(e){return"true"===e.dataset.hoverSlideshowItemActive}),a=+r.dataset.hoverSlideshowImage,o=a+1>=e.length?0:a+1,r.removeAttribute("data-hover-slideshow-item-active"),e[o].setAttribute("data-hover-slideshow-item-active","true")},500)}),e.addEventListener("mouseout",function(){var e,a;clearInterval(r),0!=+(a=(e=t).find(function(e){return e.dataset.hoverSlideshowItemActive})).dataset.hoverSlideshowImages&&(a.removeAttribute("data-hover-slideshow-item-active"),e[0].setAttribute("data-hover-slideshow-item-active","true"))})})}});