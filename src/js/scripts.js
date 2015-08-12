$(window).load(function(){
	heightsToMax();	
}).resize(function(){
	heightsToMax();
});

$(function(){
	if($('#adressMap').length){
		$('#adressMap').adressMap();
	}
	if($('#adressInnerMap').length){
		$('#adressInnerMap').adressInnerMap();
	}
	if($('#servicesMap').length){
		$('#servicesMap').servicesMap();
	}

	$('.js-promoslider').promoSlider();
	$('.js-stock__slider').stockSlider();
	$('.js-hits__slider').hitsSlider();
	$('.js-card__info').cardInfo();	
	$('.js-product__slider-for').productSlider();
	$('.js-product__news-slider').productNewsSlider();
	$('.js-product__amount').amountCart();
	$('.js-select').selectCustom();
	$('.js-header_fix').headerFixed();
	$('.js-info-tabs').lightTabs();
	$('.js-faq__list').faqList();
	$('#searchInp').searchInp();
	$('#accordionAside').accordionAside();
	$('#videoSlider').videoSlider();
	$('#videoSliderPromo, #infoSliderPromo').promoSliderList();
	$('#faqmainSlider').faqmainSlider();
	$('.js-lnk_popup').contactPopup();
});



function initLikes() {
	$('.sl').socialLikes();
}

$(window).load(function(){initLikes();});

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
			   iconImageHref: 'dist/img/ico_08.png',
			   iconImageSize: [32, 44],
			   iconImageOffset: [0, 0]
			});

			var myCollectionYellow = new ymaps.GeoObjectCollection({}, {
				iconLayout: 'default#image',
				iconImageHref: 'dist/img/ico_07.png',
				iconImageSize: [32, 44],
				iconImageOffset: [0, 0]
			});

			for(var i = 0; i < coordsBlue.length; i++){
				myCollectionBlue.add(new ymaps.Placemark(coordsBlue[i]));
			}

			myMap.geoObjects.add(myCollectionBlue);

			for(var j = 0; j < coordsYellow.length; j++){
				myCollectionYellow.add(new ymaps.Placemark(coordsYellow[j]));
			}

			myMap.geoObjects.add(myCollectionYellow);

		}
	};
})(jQuery);

(function($){
	$.fn.adressInnerMap = function(){
		var that = this,
			lat = that.attr('data-point-lat'),
			lon = that.attr('data-point-lon');

		ymaps.ready(init);

		var myMap;

		function init () {
			myMap = new ymaps.Map("adressInnerMap", {
				center: [55.76, 37.64],
				zoom: 10,
				controls: []
			});

			var myCollectionBlue = new ymaps.GeoObjectCollection({}, {
			   iconLayout: 'default#image',
			   iconImageHref: 'dist/img/ico_11.png',
			   iconImageSize: [32, 44],
			   iconImageOffset: [0, 0]
			});

			myCollectionBlue.add(new ymaps.Placemark([+lat, +lon]));

			myMap.geoObjects.add(myCollectionBlue);
		}
	};
})(jQuery);

(function($){
	$.fn.servicesMap = function(){
		var that = this,
			lat = that.attr('data-point-lat'),
			lon = that.attr('data-point-lon');

		ymaps.ready(init);

		var myMap;

		function init () {
			myMap = new ymaps.Map("servicesMap", {
				center: [55.76, 37.64],
				zoom: 10,
				controls: []
			});

			var myCollectionBlue = new ymaps.GeoObjectCollection({}, {
			   iconLayout: 'default#image',
			   iconImageHref: 'dist/img/ico_11.png',
			   iconImageSize: [32, 44],
			   iconImageOffset: [0, 0]
			});

			myCollectionBlue.add(new ymaps.Placemark([+lat, +lon]));

			myMap.geoObjects.add(myCollectionBlue);
		}
	};
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
			infinite: false,
			swipe: false
		});
	};
})(jQuery);

(function($){
	$.fn.productNewsSlider = function(){
		var $slider = this;

		$slider.slick({
			slidesToShow: 5,
			slideToScroll: 1,
			swipe: false,
			responsive: [
				{
					breakpoint: 960,
					settings: {
						slidesToShow: 3,
						swipe: true
					}
				},
				{
					breakpoint: 765,
					settings: {
						slidesToShow: 1,
						swipe: true
					}
				}
			]
		});
	};
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
			};
								
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
	
}


(function($){
	$.fn.amountCart = function(){
		var $block = this,
			$minus = $('.minus', $block),
			$plus = $('.plus', $block);
			// $price = $('#productPrice .price'),
			// $priceVal = parseFloat($price.text());

		$minus.on('click', function(e){
			var that = $(this),
				$sum = that.parent().find('.sum'),
				num = parseFloat($sum.text());
			if(num > 1) {
				$sum.text(num - 1);
				that.removeClass('disabled');
			}
			if(num <= 2){ that.addClass('disabled'); }
		});

		$plus.on('click', function(e){
			var that = $(this),
				$sum = that.parent().find('.sum'),
				num = parseFloat($sum.text());
			if(num >= 1) {
				$sum.text(num + 1);
				that.parent().find('.minus').removeClass('disabled');
			}
		});
	};
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
	};
})(jQuery);


(function($){
	$.fn.promoSlider = function(){
		var slider = this;

		slider.slick({
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000
		});
	};
})(jQuery);


(function($){
	$.fn.stockSlider = function(){
		var slider = this;

		slider.slick({
			fade: true,
			dots: true,
			responsive: [
				{
					breakpoint: 960,
					settings: {
						slidesToShow: 1,
						arrows: false,
						fade: false
					}
				},
				{
					breakpoint: 765,
					settings: {
						slidesToShow: 1,
						arrows: false,
						fade: false
					}
				}
			]
		});
	};
})(jQuery);


(function($){
	$.fn.hitsSlider = function(){
		var slider = this;

		slider.slick({
			arrows: false,
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000
		});
	};
})(jQuery);


(function($){
	$.fn.cardInfo = function(){		
		var $btn = this, 
				timer = 300;
			
		$btn.on('click', function(e){
			e.preventDefault();
			var $parent = $(this).parents('.card');
			
			if (!$(this).hasClass('active')) {
				$parent.find('.card__info').fadeIn(timer);
				$(this).addClass('active');
			}
			else {
				$parent.find('.card__info').fadeOut(timer);
				$(this).removeClass('active');
			}
		});			
	};
})(jQuery);

(function($){
	$.fn.headerFixed = function(){
		var that = this;

		$(window).on('scroll resize', function() {
			var w = $(this),
				wW = w.width(),
				hH = that.height();

			if(wW >= 965){
				if (w.scrollTop() > 220) {
					that.addClass('header_fix');
					$('#all').css({'padding-top': 77});
					$('#footer').css('top', -399 + that.height());
				} else {
					that.removeClass('header_fix');
					$('#all').css({'padding-top': 208});
					$('#footer').css('top', '-399px');
				}
			} else if(wW >= 768){
				$('#all').css({'padding-top': 80});
				$('#footer').css('top', '-154px');
			} else {
				that.removeClass('header_fix');
				$('#all').css({'padding-top': 128});
				$('#footer').css('top', '-324px');
			}
		});
	};
})(jQuery);


(function($){
	$.fn.faqList = function(){
		var $btn = this;

		$btn.on('click', function(event){
			var $par = $(this).parent('.faq-quest__cont'),
				$answer = $('.answer', $par);

			if($par.hasClass('opened')){
				$par.removeClass('opened');
				$answer.slideUp();
			} else {
				$par.addClass('opened');
				$answer.slideDown();
			}
		});
	};
})(jQuery);

(function($){
	$.fn.searchInp = function(){
		var $cont = this,
			$inp = $('input', $cont),
			$examp = $('.js-example', $cont);

		$examp.click(function(event){
			$inp.val($examp.text()).focus();
		});
	};
})(jQuery);

(function($) {
	$.fn.accordionAside = function(){
		var that = this;

		function close_accordion_section() {
			var $title = $('.js-title', that),
				$cont = $title.next('.js-content');

			$title.removeClass('active');
			$cont.slideUp(300).removeClass('open');
		}
	 
		$('.js-title', that).click(function(e) {
			// Grab current anchor value
			var currentAttrValue = $(this).attr('href');
	 
			if($(e.target).is('.active')) {
				close_accordion_section();
			}else {
				close_accordion_section();
	 
				// Add active class to section title
				$(this).addClass('active');
				// Open up the hidden content panel
				$(currentAttrValue + '.js-content').slideDown(300).addClass('open');
			}
	 
			e.preventDefault();
		});
	};
})(jQuery);


(function($){
	$.fn.videoSlider = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true
		});
	};
})(jQuery);

(function($){
	$.fn.promoSliderList = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,
			responsive: [
				{
					breakpoint: 965,
					settings: {
						slidesToShow: 3,
						arrows: false,
						dots: false,
						infinite: true
					}
				},
				{
					breakpoint: 765,
					settings: {
						slidesToShow: 1,
						arrows: false,
						dots: true,
						infinite: true
					}
				}
			]
		});
	};
})(jQuery);


(function($){
	$.fn.contactPopup = function(){
		var $lnk = this;

		$lnk.on('click', function(e){
			e.preventDefault();
			var type = $(this).data('popup-type');

			if(type == 'contacts'){
				$('#contactPopup').bPopup({
					opacity: 0.2,
					content:'image',
					contentContainer:'.content',
					loadUrl:'dist/pic/pic_51.jpg'
				});
			}

			if(type == 'callback'){
				$('#callbackPopup').bPopup({
					opacity: 0.2
				});
			}

			if(type == 'login'){
				$('#loginPopup').bPopup({
					opacity: 0.2
				});
			}
		});
	};
})(jQuery);


(function($){
	$.fn.faqmainSlider = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 2,
			slideToScroll: 1,
			infinite: false,
			swipe: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 960,
					settings: {
						slidesToShow: 1,
						swipe: true,
						arrows: true
					}
				},
				{
					breakpoint: 765,
					settings: {
						slidesToShow: 1,
						swipe: true
					}
				}
			]
		});
	};
})(jQuery);