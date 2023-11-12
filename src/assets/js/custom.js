export const jqueryHandlerCustom = {
  function() {
    (function ($) {
      "use strict";
      // jQuery('.mean-menu').meanmenu({ 
      //   meanScreenWidth: "991"
      // });
      // Header Sticky, Go To Top JS
      $(window).on("scroll", function () {
        // Header Sticky JS
        if ($(this).scrollTop() > 150) {
          $(".navbar-area").addClass("is-sticky");
        } else {
          $(".navbar-area").removeClass("is-sticky");
        }

        // Go To Top JS
        var scrolled = $(window).scrollTop();
        if (scrolled > 300) $(".go-top").addClass("active");
        if (scrolled < 300) $(".go-top").removeClass("active");
      });

      $(".go-top").on("click", function () {
        $("html, body").animate({ scrollTop: "0" }, 1000);
      });
      
      $(".others-option-for-responsive .dot-menu").on("click", function(){
        $(".others-option-for-responsive .container .container").toggleClass("active");
      });

      // FAQ Accordion JS
      $(".accordion")
        .find(".accordion-title")
        .on("click", function () {
          // Adds Active Class
          $(this).toggleClass("active");
          // Expand or Collapse This Panel
          $(this).next().slideToggle("fast");
          // Hide The Other Panels
          $(".accordion-content").not($(this).next()).slideUp("fast");
          // Removes Active Class From Other Titles
          $(".accordion-title").not($(this)).removeClass("active");
        });
    })();
  },
};
