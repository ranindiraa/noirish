 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

jQuery(document).ready(function($) {

	"use strict";

	var slider = function() {
		$('.nonloop-block-3').owlCarousel({
	    center: false,
	    items: 1,
	    loop: false,
			stagePadding: 15,
	    margin: 20,
	    nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
	    responsive:{
        600:{
        	margin: 20,
          items: 2
        },
        1000:{
        	margin: 20,
          items: 3
        },
        1200:{
        	margin: 20,
          items: 3
        }
	    }
		});
	};
	slider();


	var siteMenuClone = function() {

		$('<div class="site-mobile-menu"></div>').prependTo('.site-wrap');

		$('<div class="site-mobile-menu-header"></div>').prependTo('.site-mobile-menu');
		$('<div class="site-mobile-menu-close "></div>').prependTo('.site-mobile-menu-header');
		$('<div class="site-mobile-menu-logo"></div>').prependTo('.site-mobile-menu-header');

		$('<div class="site-mobile-menu-body"></div>').appendTo('.site-mobile-menu');

		

		$('.js-logo-clone').clone().appendTo('.site-mobile-menu-logo');

		$('<span class="ion-ios-close js-menu-toggle"></div>').prependTo('.site-mobile-menu-close');
		

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var siteSliderRange = function() {
	$("#slider-range").slider({
		range: true,
		min: 0,
		max: 5000000,
		values: [0, 5000000],
		slide: function(event, ui) {
		$("#amount").val(
			formatRupiah(ui.values[0]) + " - " + formatRupiah(ui.values[1])
		);
		}
	});

	// Set initial value dengan format Rupiah
	$("#amount").val(
		formatRupiah($("#slider-range").slider("values", 0)) +
		" - " +
		formatRupiah($("#slider-range").slider("values", 1))
	);
	};
	siteSliderRange();

	function formatRupiah(angka) {
	var number_string = angka.toString().replace(/[^,\d]/g, '');
	var split = number_string.split(',');
	var sisa = split[0].length % 3;
	var rupiah = split[0].substr(0, sisa);
	var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
	
	if (ribuan) {
		var separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
	return 'Rp ' + rupiah;
	}

	var siteMagnificPopup = function() {
		$('.image-popup').magnificPopup({
	    type: 'image',
	    closeOnContentClick: true,
	    closeBtnInside: false,
	    fixedContentPos: true,
	    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
	     gallery: {
	      enabled: true,
	      navigateByImgClick: true,
	      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	    },
	    image: {
	      verticalFit: true
	    },
	    zoom: {
	      enabled: true,
	      duration: 300 // don't foget to change the duration also in CSS
	    }
	  });

	  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	    disableOn: 700,
	    type: 'iframe',
	    mainClass: 'mfp-fade',
	    removalDelay: 160,
	    preloader: false,

	    fixedContentPos: false
	  });
	};
	siteMagnificPopup();

	(function($){
    const NOIRISH = {
      cart: [],
      addToCart(item) {
        const existing = this.cart.find(x => x.id === item.id);
        if (existing) {
          existing.quantity++;
        } else {
          this.cart.push(item);
        }
        this.updateCart();
      },
      updateCart() {
        const total = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        $('#cart-count').text(total).toggle(total > 0);
      },
      showNotif(msg) {
        const $notif = $('.cart-notification');
        $notif.text(msg).stop(true, true).show().addClass('show');
        setTimeout(() => {
          $notif.removeClass('show');
          setTimeout(() => $notif.hide(), 300);
        }, 3000);
      },
      getCart() {
        return this.cart;
      },
      clearCart() {
        this.cart = [];
        this.updateCart();
      }
    };

    $(document).ready(function() {
      $('.add-to-cart').click(function(e) {
        e.preventDefault();
        const item = {
          id: $(this).data('id'),
          name: $(this).data('name'),
          price: $(this).data('price'),
          image: $(this).data('image'),
          quantity: 1
        };
        NOIRISH.addToCart(item);
        $(this).addClass('added');
        setTimeout(() => $(this).removeClass('added'), 1000);
        NOIRISH.showNotif('Item added to cart!');
        console.log('Cart:', NOIRISH.cart);
      });

      // Create persistent notification element
      if (!$('.cart-notification').length) {
        $('body').append('<div class="cart-notification" style="display:none;"></div>');
      }

      NOIRISH.updateCart();
    });

    window.NOIRISH = NOIRISH;
  })(jQuery);

	$(document).ready(function() {
	$('.icon-heart-o').on('click', function(e) {
		if ($(this).closest('.site-top-icons').length > 0) {
		return; // jangan di-block, biar bisa redirect ke wishlist.html
		}

		e.preventDefault();
		$(this).toggleClass('active');
	});
	});


});