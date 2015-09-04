$(window).load(function(){
	heightsToMax();	
}).resize(function(){
	heightsToMax();
});

$(function(){
	onElementHeightChange(document.body, function(){
		$(window).trigger('resize');
	});
	// if($('#adressMap').length){
	// 	adressMapGlobal();
	// }
	if($('#adressInnerMap').length){
		$('#adressInnerMap').adressInnerMap();
	}
	if($('#servicesMap').length){
		$('#servicesMap').servicesMap();
	}
	
	$('.js-select').selectCustom();

	$('.sl').socialLikes();

	/* SLIDERS */
	$('.js-promoslider').promoSlider();
	$('.js-stock__slider').stockSlider();
	$('.js-hits__slider').hitsSlider();
	$('.js-product__slider-for').productSlider();
	$('.js-product__news-slider').productNewsSlider();
	$('#videoSliderPromo, #infoSliderPromo').promoSliderList();
	$('#faqmainSlider').faqmainSlider();
	$('#cardSlider').cardSlider();
	$('#adressPesronGall').adressPesronGall();
	$('#servicesGalleryResp').servicesGalleryResp();
	$('#servicesGallery').servicesGallery();
	
	$('.js-card__info').cardInfo();	
	$('.js-product__amount').amountCart();
	$('.js-header_fix').headerFixed();
	$('.js-info-tabs').lightTabs();
	$('.js-faq__list').faqList();
	$('.js-lnk_popup').contactPopup();
	$('.js-product__filter_mob').productFilterMob();
	$('.js-anchor__animate').anchorAnimate();

	$('#searchInp').searchInp();
	$('#accordionAside').accordionAside();
	$('#videoSlider').videoSlider();
	$('#faqAccordMob').faqAccordMob();
});

(function($){
	var myMap,
		myPlacemark,
		nav = $('#adressNavBtns'),
		$cont = $('#adressNavCont'),
		$block = $('> div', $cont),
		$list = $cont.find('.adress__tbl'),
		$map = $cont.find('.adress__map'),
		$sheme = $cont.find('.adress__sheme'),
		$item = $(' > div', $list),
		resizeId;

	if($("#adressMap").length) adressMapGlobal();

	function adressMapGlobal(){
		ymaps.ready(init);

		function init () {
			var $select = $('.js-select'),
				$selectItem = $select.siblings('ul').find('li'),
				pointsCollection;

			myMap = new ymaps.Map('adressMap', {
			center: [55.76, 37.64],
			zoom: 10,
			controls: []				
			}, {
				autoFitToViewport: 'always',
				suppressMapOpenBlock: true
			});

			//загружаем adress_global.json с помощью jQuery
			jQuery.getJSON('data/adress_global.json', function(json) {
				
				window.storageMapObj = ymaps.geoQuery(json);

				//в json файле есть массив features с геообъектами, обходим его
				jQuery.each(json.features,function(i, feature) {

					var officeColor = feature.properties.color;

					//добавляем на карту объект с координатами
					pointsCollection = myMap.geoObjects.add(new ymaps.Placemark(feature.geometry.coordinates, {
						balloonContent: 'метро: ' + feature.properties.metro + '<br/>' + feature.properties.office
					}, {
						iconLayout: 'default#image',
						iconImageHref: officeColor,
						iconImageSize: [32, 44],
						iconImageOffset: [0, 0]
			        }));
				});

		        function selectGetCoord(){
		        	var shownObjects,
		        		byMetro = new ymaps.GeoQueryResult(),
		        		icon,
		        		$selectCurrentMetro = $(this).text();
		        		$selectCurrentColor = $(this).data('select-color');

		        		if($selectCurrentColor == 'blue'){
		        			icon = 'dist/img/ico_08.png';
		        		} else {
		        			icon = 'dist/img/ico_07.png';
		        		}
		        		
		        		if($selectCurrentMetro !== 'Все станции метро'){
		        			byMetro = storageMapObj.search('properties.metro = "' + $selectCurrentMetro.toLowerCase() + '"');

		        			
			        		byMetro.setOptions({
		        				iconLayout: 'default#image',
		        				iconImageHref: icon,
		        				iconImageSize: [32, 44],
		        				iconImageOffset: [0, 0]
		        			}).setProperties({
		        				balloonContent: 'метро: '
		        			});

			        		pointsCollection.removeAll();
			        		byMetro.addToMap(myMap);
		        		} else {
		        			pointsCollection.removeAll();

		        			jQuery.each(json.features,function(i, feature) {
		        				var officeColor = feature.properties.color;

			        			pointsCollection = myMap.geoObjects.add(new ymaps.Placemark(feature.geometry.coordinates, {
									balloonContent: 'метро: ' + feature.properties.metro + '<br/>' + feature.properties.office
								}, {
									iconLayout: 'default#image',
									iconImageHref: officeColor,
									iconImageSize: [32, 44],
									iconImageOffset: [0, 0]
						        }));
						    });
		        		}


		        		// $list
		        		// 	.find('> div')
		        		// 	.removeClass('active')
		        		// .end()
		        		// 	.find('[data-marker-metro="' + $selectCurrentMetro + '"]')
		        		// 	.addClass('active');

		        }

		        $selectItem.click(selectGetCoord);

		        $list.find('> div').on('mouseenter', function(event){
		        	$(this).addClass('active');		        	
		        }).on('mouseleave', function(){
		        	$(this).removeClass('active');
		        });
			});

			function adressResize(){			
				var wW = $(window).width(),
					$btn = $('li.current', nav),
					$type = $btn.data('btn-adress');

					if(wW > 1000){
						$cont.addClass('desktop');
						if($type == 'list'){
							$map.css('display', 'inline-block');
							myMap.container.getElement().style.width = '100%';
							myMap.container.getElement().style.height = '780px';
							myMap.container.fitToViewport();
						}
						if($type == 'map'){
							$('.adress__nav-btn_lists').addClass('current');
							$('.adress__nav-btn_map').removeClass('current');
							$list.css('display', 'inline-block');
						}
					} else {
						$cont.removeClass('desktop');
						$map.css('display', 'none');
						$sheme.css('display', 'none');

						if($type == 'map'){
							$map.css('display', 'inline-block');
						}

						if($type == 'sheme'){
							$sheme.css('display', 'none');
							$('.adress__nav-btn_lists').addClass('current');
							$list.css('display', 'inline-block');
						}

						myMap.behaviors.disable('ruler');
					}
			}

			function adressBtnSetCurrent(){
				var $btn = $(this),
					$type = $btn.data('btn-adress');


					$('li', nav).removeClass('current');
					$btn.addClass('current');

					$block.css('display', 'none');

					if($type == 'map'){ 
						$map.css('display', 'inline-block');

						myMap.container.getElement().style.width = '100%';
						myMap.container.getElement().style.height = '780px';
						myMap.container.fitToViewport();
					}

					if($type == 'list'){ 
						$list.css('display', 'inline-block');
						if($cont.hasClass('desktop')){
							$map.css('display', 'inline-block');

							myMap.container.getElement().style.width = '100%';
							myMap.container.getElement().style.height = '780px';
							myMap.container.fitToViewport();
						}
					}

					if($type == 'sheme'){
						$map.css('display', 'none');
						$list.css('display', 'none');
						$sheme.css('display', 'block');
					}
			}

			$(window).resize(function() {
				clearTimeout(resizeId);
				resizeId = setTimeout(adressResize, 200);
			});

			nav.on('click', 'li:not(.current)', adressBtnSetCurrent);
		}
	}
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
					'class': $this.children('option').eq(i).val(),
					'data-select-metro': $this.children('option').eq(i).attr('data-select-metro'),
					'data-select-color': $this.children('option').eq(i).attr('data-select-color')
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
				$styledSelect.attr('data-select-metro', that.attr('data-select-metro'));
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
			infinite: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						swipe: true,
						infinite: true
					}
				}
			]
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
			swipe: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						arrows: false,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						vertical: false,
						verticalSwiping: false,
						initialSlide: 1,
						arrows: false,
						infinite: true
					}
				}
			]
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
					breakpoint: 1141,
					settings: {
						slidesToShow: 3,
						swipe: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						swipe: true
					}
				},
				{
					breakpoint: 450,
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
	$.fn.promoSlider = function(){
		var slider = this;

		slider.slick({
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
			]
		});
	};
})(jQuery);


(function($){
	$.fn.stockSlider = function(){
		var slider = this;

		slider.slick({
			fade: true,
			dots: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						slidesToShow: 1,
						arrows: false,
						fade: false,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						arrows: false,
						fade: false,
						dots: true
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
		var header = this,
			resizeId,
			win = $(window),
			$promoPhone = $('.js-promophone_mob'),
			$footer = $('#footer');

		document.addEventListener("DOMContentLoaded", winPosCalc);

		setTimeout(function(){
			win.trigger('resize');
		}, 100);

		win.scroll(winPosCalc);

		win.resize(winPosCalc);
		 
		function winPosCalc(){
			var	wW = win.width(),
				wH = win.height(),
				wScroll = win.scrollTop(),
				$footerPos = $footer.offset().top - wH;

			if(768 <= wW){
				if (wScroll > 220) {
					header.addClass('header_fix');
				} else {
					header.removeClass('header_fix');
				}
			} else {
				header.removeClass('header_fix');

				if(wScroll >= $footerPos){
					$promoPhone.css('bottom','' + (wScroll - $footerPos) + 'px');
				} else {
					$promoPhone.css('bottom','0');
				}
			}
		}


		(function mainMenu(){
			var $btn = $('.js-mainmenu__btn-all'),
				$menu = $btn.parents('.mainmenu'),
				$header = $('.js-header_fix');

				$btn.click(function(event){
					$menu.toggleClass('active');
					$header.toggleClass('sub-menu__active');
				});
		}());
	};
})(jQuery);


// listening height document
function onElementHeightChange(elm, callback){
	var lastHeight = elm.clientHeight, newHeight;
	(function run(){
		newHeight = elm.clientHeight;
		if( lastHeight != newHeight )
			callback();
		lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
          clearTimeout(elm.onElementHeightChangeTimer);

		elm.onElementHeightChangeTimer = setTimeout(run, 0);
	})();
}


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

(function catalogeFilter(){
	var $categoryBtn = $('.js-catalogue__menu'),
		$categoryBlock = $('.js-product__category');

		$categoryBtn.click(function(event){
			event.preventDefault();
			var that = $(this),
				posT = that.offset().top,
				posL = that.offset().left,
				height = that.innerHeight();

				$categoryBlock.slideToggle();

				if(that.parents('.header_fix').length){
					$categoryBlock.css({
						'position': 'fixed',
						'top': $(this).parents('.header_fix').innerHeight() ,
						'left': posL,
						'z-index': 1000,
						'margin-left': 0
					})
					.find('.product__category-triangle')
					.css({
						'left': '20px'
					});
				} else {
					$categoryBlock.css({
						'position': 'absolute',
						'top': +posT + height + 10,
						'left': posL,
						'zIndex': 1000,
						'margin-left': 0
					})
					.find('.product__category-triangle')
					.css({
						'left': '20px'
					});

					if($categoryBlock.position().left + $categoryBlock.width() > $(window).width()){
						$categoryBlock.css({
							'left': '100%',
							'margin-left': -($(window).width() - $categoryBlock.width() + 100)
						})
						.find('.product__category-triangle')
						.css({
							'left': '50%'
						});
					}
				} 
		});

		$(window).resize(function(){
			$categoryBlock.hide();
		});
}());

(function($) {
	$.fn.accordionAside = function(){
		var that = this;

		function close_accordion_section() {
			var $title = $('.js-title', that),
				$cont = $title.next('.js-content');

			$title.removeClass('active');
			$cont.finish().slideUp(300).removeClass('open');
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
				$(currentAttrValue + '.js-content').finish().slideDown(300).addClass('open');
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
					breakpoint: 1141,
					settings: {
						slidesToShow: 3,
						arrows: false,
						dots: false,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						arrows: false,
						dots: true,
						infinite: true
					}
				},
				{
					breakpoint: 450,
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

			if(type == 'popup'){
                $('#'+$(this).data("popup-id")).bPopup({
                    opacity: 0.2
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
					breakpoint: 1141,
					settings: {
						slidesToShow: 1,
						swipe: true,
						arrows: true
					}
				},
				{
					breakpoint: 768,
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
	$.fn.cardSlider = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 4,
			slideToScroll: 1,
			infinite: false,
			swipe: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						slidesToShow: 3,
						swipe: true,
						arrows: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						swipe: true,
						dots: true
					}
				}
			]
		});
	};
})(jQuery);

(function($){
	$.fn.adressPesronGall = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 4,
			slideToScroll: 1,
			infinite: false,
			dots: true,
			swipe: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						slidesToShow: 3,
						swipe: true,
						dots: true,
						arrows: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						swipe: true,
						dots: true,
						infinite: true
					}
				}
			]
		});

	};
})(jQuery);

(function($){
	$.fn.servicesGalleryResp = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 7,
			slideToScroll: 1,
			infinite: false,
			swipe: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						slidesToShow: 5,
						swipe: true,
						dots: true,
						arrows: false
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						swipe: true,
						dots: true,
						infinite: true,
						adaptiveHeight: true
					}
				}
			]
		});

	};
})(jQuery);

(function($){
	$.fn.servicesGallery = function(){
		var slider = this;

		slider.slick({
			slidesToShow: 4,
			slideToScroll: 1,
			infinite: false,
			swipe: false,
			arrows: false,
			responsive: [
				{
					breakpoint: 1141,
					settings: {
						slidesToShow: 3,
						swipe: true,
						dots: true,
						arrows: false,
						adaptiveHeight: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slideToScroll: 1,
						swipe: true,
						dots: true,
						infinite: true,
						adaptiveHeight: true
					}
				}
			]
		});

	};
})(jQuery);


(function($){
	$.fn.faqAccordMob = function(){
		var wrap = this,
			$btn = $('.js-faq__btn-accord', wrap);

			$btn.click(function(){
				var $cont = $('.js-faq_block-mob', wrap);
				$cont.toggleClass('active');
			});
	};
})(jQuery);

(function($){
	$.fn.productFilterMob = function(){
		var btn = this,
			filterBl = btn.parents('.product__filter_mob').next();

			btn.click(function(){
				filterBl.toggleClass('active');
			});

	};
})(jQuery);

(function($){
	$.fn.anchorAnimate = function(){
		var $btn = this,
			resizeId,
			headH;

		$(window).load(doneResizing);

		$(window).resize(function() {
		    clearTimeout(resizeId);
		    resizeId = setTimeout(doneResizing, 500);
		});
		 
		function doneResizing(){
			var wW = $(window).width();

			if(wW > 768){
				headH = $('.js-header_fix').height();
			} else {
				headH = 0;
			}
		}

		$btn.click(function(event){
			var $href = $(this).attr('href');

			$('body').animate({
				scrollTop: $($href).offset().top - headH
			}, 400);
		});
	};
})(jQuery);