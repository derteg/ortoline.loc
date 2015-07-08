$(document).ready(function(){heightsToMax();});
$(window).load(function(){heightsToMax();});
$(window).resize(function(){heightsToMax();});

$(window).load(function(){initLikes();});

$(function(){
	$('.js-product__slider-for').productSlider();
	$('.js-product__news-slider').productNewsSlider();
	$('.js-product__amount').amountCart();

	$('.js-info-tabs').lightTabs();
	// widthClasses();
	initPeppermint();
	initSwiper();
	hiddenText();
});



(function($){
	$.fn.productSlider = function(){
		var $sliderFor = this,
			$sliderNav = $sliderFor.next();

		$sliderFor.slick({
			slidesToShow: 1,
			slideToScroll: 1,
			arrows: false,
			fade: true,
			speed: 0,
			swipe: false,
			asNavFor: '.js-product__slider-nav',
			infinite: false
		});

		$sliderNav.slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			centerPadding: '0px',
			vertical: true,
			verticalSwiping: true,
			asNavFor: '.js-product__slider-for',
			centerMode: true,
			focusOnSelect: true,
			infinite: false
		});
	}
})(jQuery);

(function($){
	$.fn.productNewsSlider = function(){
		var $slider = this;

		$slider.slick({
			slidesToShow: 5,
			slideToScroll: 1,
			swipe: false
		});
	}
})(jQuery);


(function($){				
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            tabs = this;
            i = 0;
            
            showPage = function(i){
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }
                                
            showPage(0);				
            
            $(tabs).children("ul").children("li").each(function(index, element){
                $(element).attr("data-page", i);
                i++;                        
            });
            
            $(tabs).children("ul").children("li").click(function(){
                showPage(parseInt($(this).attr("data-page")));
            });				
        };		
        return this.each(createTabs);
    };	
})(jQuery);



// ! max item

function heightsToMax() {
	
	if (!$('[data-max="parent"]').length) {return false;}
	
	$('[data-max="parent"]').each(function(){
		var $this = $(this),
				$children = $this.find('[data-max="child"]'),
				inrow = parseInt($this.attr('data-inrow')) || $children.size(),
				max = 0, i = 0, j = 0;
		
		$children.removeAttr('style').each(function(){
			var $t = $(this);
			if ($t.height() > max) {max = $t.height();}
			$t.attr('data-index', j);
			++i;
			
			if (i == inrow) {
				$this.find('[data-max="child"][data-index="'+j+'"]').height(max);
				++j;
				i = 0;
				max = 0;
			}
		});
		
	});
	
};

// ! likes

function initLikes() {
	$('.sl').socialLikes();
};


// pepper

function initPeppermint() {
	
	// first slider
	
	var slider1 = $('.actions-slider').Peppermint({
	  speed: 300,
	  touchSpeed: 300,
	  slideshow: false,
	  slideshowInterval: 4000,
	  stopSlideshowAfterInteraction: false,
	  dots: false
	});
	
	$('.actions-arrow--right').on('click', function(e){
		e.preventDefault();
		slider1.data('Peppermint').next();
	});
	
	$('.actions-arrow--left').on('click', function(e){
		e.preventDefault();
		slider1.data('Peppermint').prev()
	});
	
	
	// second slider
	
	for (var i = 0; i < $('.hits-slider .hit').length; ++i) {
		$('.hits-dots').append('<div class="dot"></div>');
	}
	$('.hits-dots .dot:first').addClass('active');
	
	var slider2 = $('.hits-slider').Peppermint({
	  speed: 300,
	  touchSpeed: 300,
	  slideshow: true,
	  slideshowInterval: 3000,
	  stopSlideshowAfterInteraction: true,
	  dots: false,
	  onSlideChange: function(i) {
		  $('.hits-dots .dot').removeClass('active');
		  $('.hits-dots .dot:eq('+i+')').addClass('active');
	  }
	});
	
	$('.hits-dots .dot').on('click', function(e){
		e.preventDefault();
		var  i = $(this).index();
		$('.hits-dots .dot').removeClass('active');
		$(this).addClass('active');
		slider2.data('Peppermint').slideTo(i);
	});
	

	// third slider
	
	var slider3 = $('.new-self').Peppermint({
	  speed: 300,
	  touchSpeed: 300,
	  slideshow: false,
	  slideshowInterval: 4000,
	  stopSlideshowAfterInteraction: false,
	  dots: false
	});
	
	$('.new-arrow--right').on('click', function(e){
		e.preventDefault();
		slider3.data('Peppermint').next();
	});
	
	$('.new-arrow--left').on('click', function(e){
		e.preventDefault();
		slider3.data('Peppermint').prev()
	});

	// fourth slider
	
	
	
	// $('.new-arrow--right').on('click', function(e){
	// 	e.preventDefault();
	// 	slider4.data('Peppermint').next();
	// });
	
	// $('.new-arrow--left').on('click', function(e){
	// 	e.preventDefault();
	// 	slider4.data('Peppermint').prev()
	// });

	
};

// swiper

function initSwiper() {
	
	if ($('html').hasClass('ie9')) {
		
		$('.swiper-wrapper').addClass('peppermint');
		
		var slider4 = $('.swiper-wrapper').Peppermint({
		  speed: 300,
		  touchSpeed: 300,
		  slideshow: false,
		  slideshowInterval: 4000,
		  stopSlideshowAfterInteraction: false,
		  dots: false
		});
		
		$('.promoslider-arrow--right').on('click', function(e){
			e.preventDefault();
			slider4.data('Peppermint').next();
		});
		
		$('.promoslider-arrow--left').on('click', function(e){
			e.preventDefault();
			slider4.data('Peppermint').prev()
		});
		
		$('.promoslider-dots').hide();
		
		return false;
	}
	
	var s = $('.promoslider-item').size();
	
	$('.swiper-container').find('.promoslider-item').each(function(){
		var $this = $(this);
		$this.append('<div class="ovrly"></div>');
	});
	
	/*for (var i = 0; i < s; ++i) {
		$('.promoslider-dots').append('<span class="promoslider-dot"></span>');
	}*/
	
	var mySwiper = $('.swiper-container').swiper({
		mode:'horizontal',
		loop: true,
		grabCursor:true,
		slidesPerView:'auto',
		loopedSlides: 3,
		speed: 500,
		loopAdditionalSlides:1,
		watchSlidesProgress: true,
		watchSlidesVisibility: true,
		nextButton:'.promoslider-arrow--right',
		prevButton:'.promoslider-arrow--left',
		pagination:'.promoslider-dots',
		// hacks for noblinking opacity
		onInit: function(){
			$('.swiper-slide-duplicate[data-swiper-slide-index="0"]').on('mousedown', function(e){
				$('.problem').addClass('noblink');
				setTimeout(function(){$('.problem').removeClass('noblink');}, 10);
			});
			$('.swiper-slide-duplicate[data-swiper-slide-index="2"]').on('mousedown', function(e){
				$('.problem2').addClass('noblink');
				setTimeout(function(){$('.problem2').removeClass('noblink');}, 10);
			});
			$('.promoslider-arrow--right').on('mousedown', function(e){
				if ($('.swiper-slide-duplicate[data-swiper-slide-index="0"]').hasClass('swiper-slide-active')) {
					$('.problem').addClass('opac').addClass('active');
					setTimeout(function(){$('.problem').removeClass('active');}, 10);
					setTimeout(function(){$('.problem').removeClass('opac');}, 600);
				}
			});
			$('.promoslider-arrow--left').on('mousedown', function(e){
				if ($('.swiper-slide-duplicate[data-swiper-slide-index="2"]').hasClass('swiper-slide-active')) {
					$('.problem2').addClass('opac').addClass('active');
					setTimeout(function(){$('.problem2').removeClass('active');}, 10);
					setTimeout(function(){$('.problem2').removeClass('opac');}, 600);
				}
			});
		}
	});
	
	
	$('.swiper-slide:eq('+s+')').addClass('problem');
	$('.swiper-slide:eq('+(s+s-1)+')').addClass('problem2');
	
	$('.promoslider-dots span').on('click', function(e){
		e.preventDefault();
		var ind = $(this).index();
		mySwiper.slideTo(ind);
	});
	
};

// ! hidden info

function hiddenText() {
	
	var $cr = $('.card-circle'), 
			timer = 300;
	
	$cr.on('click', function(e){
		e.preventDefault();
		var $par = $(this).parents('.card');
		
		if (!$(this).hasClass('active')) {
			$par.find('.card-info').fadeIn(timer);
			$(this).addClass('active');
		}
		else {
			$par.find('.card-info').fadeOut(timer);
			$(this).removeClass('active');
		}
	});
	
};



(function($){
	$.fn.amountCart = function(){
		var $block = this,
			$minus = $('.minus', $block),
			$plus = $('.plus', $block),
			$sum = $('.sum', $block);

		$minus.on('click', function(e){
			var num = parseFloat($sum.text());
			if(num > 1) {
				$sum.text(num - 1);
				$minus.removeClass('disabled');
			}			
			if(num <= 2){
				$minus.addClass('disabled');
			}
		});

		$plus.on('click', function(e){
			var num = parseFloat($sum.text());
			if(num >= 1) {
				$sum.text(num + 1);
				$minus.removeClass('disabled');
			}
		});
	}
})(jQuery);