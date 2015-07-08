$(window).load(function(){
	heightsToMax();
	initLikes();
}).resize(function(){
	heightsToMax();
});

$(function(){
	$('#adressMap').adressMap();
	$('.js-product__slider-for').productSlider();
	$('.js-product__news-slider').productNewsSlider();
	$('.js-product__amount').amountCart();
	$('.js-select').selectCustom();

	$('.js-info-tabs').lightTabs();

	initPeppermint();
	initSwiper();
	hiddenText();
});

(function($){
	$.fn.adressMap = function(){
		ymaps.ready(init);

		var myMap,
		myPlacemark,
			coordsBlue = [
    			[55.90, 37.70], [55.75, 37.71], [55.70, 37.70]
    		];
    		coordsYellow = [
    			[55.80, 37.50], [55.85, 37.71], [55.75, 37.50]
    		];

		function init () {
		    myMap = new ymaps.Map('adressMap', {
		        center: [55.76, 37.64],
		        zoom: 10,
		        controls: []
			});

			var myCollectionBlue = new ymaps.GeoObjectCollection({}, {
		       iconLayout: 'default#image',
		       iconImageHref: 'img/ico_08.png',
		       iconImageSize: [32, 44],
		       iconImageOffset: [0, 0]
		    });

		    var myCollectionYellow = new ymaps.GeoObjectCollection({}, {
				iconLayout: 'default#image',
				iconImageHref: 'img/ico_07.png',
				iconImageSize: [32, 44],
				iconImageOffset: [0, 0]
		    });

		    for(var i = 0; i < coordsBlue.length; i++){
		    	myCollectionBlue.add(new ymaps.Placemark(coordsBlue[i]));
		    }

		    myMap.geoObjects.add(myCollectionBlue);

		    for(var i = 0; i < coordsYellow.length; i++){
		    	myCollectionYellow.add(new ymaps.Placemark(coordsYellow[i]));
		    }

		    myMap.geoObjects.add(myCollectionYellow);

		}
	}
})(jQuery);



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
			// $price = $('#productPrice .price'),
			// $priceVal = parseFloat($price.text());

		$minus.on('click', function(e){
			var num = parseFloat($sum.text());
			if(num > 1) {
				$sum.text(num - 1);
				$minus.removeClass('disabled');
				// num = parseFloat($sum.text());
				// var multy = $priceVal * num;
				// console.log($priceVal);
				// console.log(num);
				// $price.text(multy);

			}
			if(num <= 2){
				$minus.addClass('disabled');
				// num = parseFloat($sum.text());
				// var multy = $priceVal * num;
				// $price.text(multy);
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


(function($){
	$.fn.selectCustom = function(){
		var select = this;
		var numberOfSelects = select.length;

		// Iterate over each select element
		select.each( function() {
		    
		    // Cache the number of options
		    var $this = $(this),
		        numberOfOptions = $(this).children('option').length;
		    
		    // Hides the select element
		    $this.addClass('hidden');
		    
		    // Wrap the select element in a div
		    $this.wrap('<div class="select" />');
		    
		    // Insert a styled div to sit over the top of the hidden select element
		    $this.after('<div class="styledSelect"></div>');
		    
		    // Cache the styled div
		    var $styledSelect = $this.next('div.styledSelect');
		    
		    // Show the first select option in the styled div
		    $styledSelect.text($this.children('option').eq(0).text());		    
		    
		    // Insert an unordered list after the styled div and also cache the list
		    var $list = $('<ul />', {
		        'class' : 'options'
		    }).insertAfter($styledSelect);
		    
		    // Insert a list item into the unordered list for each select option
		    for(var i = 0; i < numberOfOptions; i++) {
		        $('<li />', {
		            text: $this.children('option').eq(i).text(),
		            'class': $this.children('option').eq(i).val()
		        }).appendTo($list);
		    }
		    
		    // Cache the list items
		    var $listItems = $list.children('li');
		    
		    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
		    $styledSelect.click( function(e) {
		        e.stopPropagation();

		        $('styledSelect.active').each( function() {
		            $(this).removeClass('active')
		                .next('ul.options').filter(':not(:animated)').slideUp(250);   
		        });
		        /* Use this instead of the .each() method when dealing with a large number of elements:
		        for(var i = 0; i < numberOfSelects; i++) {
		            if($('div.styledSelect').eq(i).hasClass('active') === true) {
		                $('div.styledSelect').eq(i).removeClass('active')
		                    .next('ul.options').filter(':not(:animated)').slideUp(250);
		            }
		        } */
		        $(this).toggleClass('active')
		            .next('ul.options').filter(':not(:animated)').slideToggle(250);
		    });
		    
		    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
		    // Updates the select element to have the value of the equivalent option
		    $listItems.click( function(e) {
		        e.stopPropagation();
		        var that = $(this);
		        $styledSelect.parent().next(".select__ico").attr('class', 'select__ico ' + that.attr('class'));
		        $styledSelect.text($(this).text())
		            .removeClass('active');
		        $this.val($(this).text().toLowerCase());
		        $list.filter(':not(:animated)').slideUp(250);
		    });
		    
		    // Hides the unordered list when clicking outside of it
		    $(document).click( function() {
		        $styledSelect.removeClass('active');
		        $list.filter(':not(:animated)').slideUp(250);
		    });
		    
		});
	}
})(jQuery);