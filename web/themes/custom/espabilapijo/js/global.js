//*
(function ($, Drupal) {

  Drupal.behaviors.cookies = {
    attach: function (context, settings) {
      var cookie = Cookies.get('cookie-notice');
      if (typeof  cookie == 'undefined') {
        jQuery('#cookies').show();
        jQuery('a').click(function () {
          remove_cookie_notice();
        });
        jQuery(window).scroll(function () {
          setTimeout(remove_cookie_notice, 3000);
        });
      }

      function remove_cookie_notice() {
        jQuery('#cookies').fadeOut();
        Cookies.set('cookie-notice', 'yes', {expires: 1000});
      }

    }
  };

  Drupal.behaviors.propuestas = {
    attach: function (context, settings) {
      var propuestas;

      if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
        $('.filtrar-propuestas').addClass('filtrar-propuestas--touch');
      }

      $('.filtrar-propuestas__select').chosen({
        max_selected_options: 5,
        no_results_text: 'Ups, no hay resultados para ',
        placeholder_text_multiple: 'Ej. Cultura, Autobús, etc.',
        search_contains: true,
        allow_single_deselect: true,
        max_selected_options:4
      });

      $('.filtrar-propuestas').css('opacity',1);


      $('.filtrar-propuestas__select').change(function(){
        getPropuestas();

      });

      $('.propuestas__loadmore').click(function(){
        var page =parseInt($(this).data('page'));
        $('.propuestas__page--'+page).fadeIn();
        page++;
        $(this).data('page',page);
        if($('.propuestas__page:hidden').length==0) $(this).fadeOut();
      });

      function getPropuestas() {
        $('.propuestas').css('opacity',0.25);
        var keywords = $('.filtrar-propuestas__select').val();
        var url = '/api/propuestas';
        if(keywords){
          var query = keywords.join(' ').replace(' y ',' ');
          url+= '?query='+query;
        }

        $.getJSON(url, function (data) {
          //console.log(data);
          var n = 0;
          var pages =  $('<div></div>');
          var page = $('<ul></ul>').addClass('propuestas__page propuestas__page--0');

          $.each(data, function () {
            if (n % 10 == 0 && n > 0) {
              pages.append(page);
              page = $('<ul></ul>').addClass('propuestas__page propuestas__page--' + n / 10);
            }
            var item = $('<li></li>').text(this.field_propuesta);
            page = page.append(item);
            n++;
          });
          pages.append(page);


          $('.propuestas__pages').empty();
          $('.propuestas__pages').append(pages);

          //$('.propuestas__spinner').fadeOut();
          $('.propuestas').css('opacity',1);
          $('.propuestas').show();

          if($('.propuestas__page:hidden').length==0) $('.propuestas__loadmore').hide();
          else $('.propuestas__loadmore').show();

        });
      }

      getPropuestas();
    }
  }

  Drupal.behaviors.slider = {
    attach: function (context, settings) {

      var template = '<li class="propuesta glide__slide"><p>{{propuesta}}</p></li>';

      $.getJSON('/api/propuestas', function (data) {
        data.forEach(function (item) {
          var propuesta = $(template.replace('{{propuesta}}', item.field_propuesta));
          $('.glide__track').append(propuesta);
        });

        var slider = $("#propuestas .glide").glide({
          type: "carousel",
          paddings: 0,
          centered: true,
          animationDuration: 500,
          touchDistance: 20
        });

      });

    }
  };
  Drupal.behaviors.overlay = {
    attach: function (context, settings) {

      $('.js-hide-popup').click(function (e) {
        e.preventDefault();
        $('.webform-initially-hidden').hide();
        $('.overlay').removeClass('overlay--visible');
        $('.webform-submission-form').removeClass('webform-submission-form--visible');
        setTimeout(function () {
          $('.webform-submission-form').hide();
          $('.overlay').hide();
        }, 300);
      });


      $('.js-show-popup').click(function (e) {
        e.preventDefault();
        var id = $(this).data('form');

        $('#' + id).show();
        $('.webform-submission-form form').show();
        $('.overlay').show();
        setTimeout(function () {
          $('.webform-submission-form').addClass('webform-submission-form--visible');
          $('.overlay').addClass('overlay--visible');
        }, 100);


      });

      $('.webform-submission-form form').submit(function (e) {
        e.preventDefault();
        $('.overlay').addClass('overlay--processing');
        $('.webform-submission-form').addClass('webform-submission-form--processing');
        $.post("/", $(this).serialize(), function (data, b) {
          $('.overlay').removeClass('overlay--processing');
          $('.webform-submission-form').removeClass('webform-submission-form--processing');
          $('.webform-submission-form form').hide();
          $('.webform-confirmation').show();
        }).fail(function () {
          $('.overlay').removeClass('overlay--processing');
          $('.webform-submission-form').removeClass('webform-submission-form--processing');
          $('.webform-submission-form form').hide();
          $('.webform-error').show();
        });


      });

      $('.webform-submission-form').bind('touchmove', function (e) {
        $(this).find('input,textarea').blur();
        // e.preventDefault();
        e.stopPropagation();
      });

      $('.overlay').bind('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  };

})(jQuery, Drupal);

