!function (e) {
  "use strict";
  function n() {
    var e = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    t = e
  }

  e(document).ready(function () {
    function n() {
      e(".accordion .accordion-section-title").removeClass("active"), e(".accordion .accordion-section-content").slideUp(300).removeClass("open")
    }

    e(".menu-title").on("keypress click", function () {
      "none" == e(this).next(".menu").css("display") ? (e(this).next(".menu").slideDown("fast"), e(this).find(".menu-icon").removeClass("fa-chevron-down"), e(this).find(".menu-icon").addClass("fa-chevron-up")) : (e(this).next(".menu").slideUp("fast"), e(this).find(".menu-icon").addClass("fa-chevron-down"), e(this).find(".menu-icon").removeClass("fa-chevron-up"))
    }), e(window).on("click", function () {
      e(".menu").hide()
    }), e(".menu-title").on("click", function (e) {
      e.stopPropagation()
    }), e("#primary-nav__mobile-anchor").length > 0 && e("#primary-nav__mobile-anchor").on("keypress click", function () {
      "none" == e(".primary-nav").css("display") ? (e(".primary-nav").slideDown("fast"), e(this).text("Close")) : (e(".primary-nav").slideUp("fast"), e(this).text("Menu"))
    }), e("#account-selector__mobile-anchor").length > 0 && e("#account-selector__mobile-anchor").on("keypress click", function () {
      "none" == e(".account-list ul li:not(:first-child)").css("display") ? (e(".account-list ul li:not(:first-child)").slideDown("fast"), e("#account-selector__mobile-anchor").find(".fa").removeClass("fa-chevron-down"), e("#account-selector__mobile-anchor").find(".fa").addClass("fa-chevron-up")) : (e(".account-list ul li:not(:first-child)").slideUp("fast"), e("#account-selector__mobile-anchor").find(".fa").removeClass("fa-chevron-up"), e("#account-selector__mobile-anchor").find(".fa").addClass("fa-chevron-down"))
    }), e(".tool-tip__content-wrapper").length > 0 && (e(".tool-tip__icon").hover(function () {
      e(this).prev(".tool-tip__content-wrapper").show()
    }, function () {
      e(this).prev(".tool-tip__content-wrapper").hide()
    }), e(".tool-tip__icon").on("keypress click touch", function () {
      "none" == e(this).prev(".tool-tip__content-wrapper").css("display") ? e(this).prev(".tool-tip__content-wrapper").show() : e(this).prev(".tool-tip__content-wrapper").hide()
    }), e(window).on("touchstart", function () {
      "block" == e(".tool-tip__content-wrapper").css("display") && e(".tool-tip__content-wrapper").hide()
    })), e(".m2-tabs").length > 0 && e(".m2-tabs h3").on("keypress click", function () {
      var n = e(this).attr("data-tab");
      e(".m2-tabs h3").removeClass("selected"), e(this).addClass("selected"), e(".tab").each(function () {
        e(this).attr("data-tab") == n ? e(this).show() : e(this).hide()
      })
    }), e(".table").length > 0 && e(".table").each(function () {
      var n = [];
      e(this).find("thead > tr > th").each(function () {
        n.push(e(this).text())
      }), e(this).find("tbody tr").each(function () {
        e(this).find("td").each(function (t) {
          e(this).attr("data-label", n[t])
        })
      })
    }), e(".alert-box .icon-close").length > 0 && e(".alert-box .icon-close").on("click", function () {
      e(this).parent(".alert-box").hide()
    }), e(".popup-link").length > 0 && (e(".popup-link").on("click", function () {
      var n = e(this).attr("data-popup");
      e(".popup").attr("data-popup", n).fadeIn("fast")
    }), e(".js-close").on("click", function () {
      e(".popup").hide()
    })), e(".js-closed-accounts-handle").length > 0 && e(".js-closed-accounts-handle").on("click", function () {
      event.preventDefault ? event.preventDefault() : event.returnValue = !1, "none" == e(".js-closed-accounts").css("display") ? (e(this).text("Hide my closed accounts -"), e(".js-closed-accounts").show()) : (e(this).text("My closed accounts >"), e(".js-closed-accounts").hide())
    }), e(".accordion-handle").on("click keypress", function () {
      "none" == e(this).next(".accordion-content").css("display") ? (e(this).next(".accordion-content").slideDown("fast"), e(this).find(".accordion-icon").removeClass("fa-angle-down"), e(this).find(".accordion-icon").addClass("fa-angle-up")) : (e(this).next(".accordion-content").slideUp("fast"), e(this).find(".accordion-icon").addClass("fa-angle-down"), e(this).find(".accordion-icon").removeClass("fa-angle-up"))
    }), e(".close-accordion").click(function (t) {
      e(t["this"]).trigger(n()), t.preventDefault()
    }), e(".accordion-section-title").click(function (t) {
      var o = e(this).attr("href");
      e(t.target).is(".active") ? n() : (n(), e(this).addClass("active"), e(".accordion " + o).slideDown(300).addClass("open")), t.preventDefault()
    });
    var t = e(window).width();
    if (t > 768) {
      var o = 0;
      e("div.match-height").each(function () {
        e(this).height() > o && (o = e(this).height())
      }), e("div.match-height").height(o)
    }
    if (e("#login-image").length > 0) {
      var a = e("#login-image").attr("src");
      e("#login-image-container").css("background-image", "url(" + a + ")")
    }
    e(".alert-box").length > 0 && e(".alert-box").each(function () {
      e(this).text().length > 0 ? e(this).show() : e(this).hide()
    }), e(".m1-account-details__header").each(function () {
      var n = e(this).find("a").attr("href");
      e(this).on("click", function () {
        window.location.replace(n)
      })
    })
  });
  var t = 0;
  n(), e(window).resize(function () {
    n()
  })
}(jQuery);
