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
});



function initLikes() {
	$('.sl').socialLikes();
};

/*! Social Likes v3.0.13 by Artem Sapegin - http://sapegin.github.com/social-likes - Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a,b){this.container=a,this.options=b,this.init()}function c(b,c){this.widget=b,this.options=a.extend({},c),this.detectService(),this.service&&this.init()}function d(a){function b(a,b){return b.toUpper()}var c={},d=a.data();for(var e in d){var f=d[e];"yes"===f?f=!0:"no"===f&&(f=!1),c[e.replace(/-(\w)/g,b)]=f}return c}function e(a,b){return f(a,b,encodeURIComponent)}function f(a,b,c){return a.replace(/\{([^\}]+)\}/g,function(a,d){return d in b?c?c(b[d]):b[d]:a})}function g(a,b){var c=k+a;return c+" "+c+"_"+b}function h(b,c){function d(g){"keydown"===g.type&&27!==g.which||a(g.target).closest(b).length||(b.removeClass(l),e.off(f,d),a.isFunction(c)&&c())}var e=a(document),f="click touchstart keydown";e.on(f,d)}function i(a){var b=10;if(document.documentElement.getBoundingClientRect){var c=parseInt(a.css("left"),10),d=parseInt(a.css("top"),10),e=a[0].getBoundingClientRect();e.left<b?a.css("left",b-e.left+c):e.right>window.innerWidth-b&&a.css("left",window.innerWidth-e.right-b+c),e.top<b?a.css("top",b-e.top+d):e.bottom>window.innerHeight-b&&a.css("top",window.innerHeight-e.bottom-b+d)}a.addClass(l)}var j="social-likes",k=j+"__",l=j+"_opened",m="https:"===location.protocol?"https:":"http:",n={facebook:{counterUrl:"https://graph.facebook.com/fql?q=SELECT+total_count+FROM+link_stat+WHERE+url%3D%22{url}%22&callback=?",convertNumber:function(a){return a.data[0].total_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500},twitter:{counterUrl:"https://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:"https://twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}},mailru:{counterUrl:m+"//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",convertNumber:function(a){for(var b in a)if(a.hasOwnProperty(b))return a[b].shares},popupUrl:m+"//connect.mail.ru/share?share_url={url}&title={title}",popupWidth:550,popupHeight:360},vkontakte:{counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(b,c){var d=n.vkontakte;d._||(d._=[],window.VK||(window.VK={}),window.VK.Share={count:function(a,b){d._[a].resolve(b)}});var f=d._.length;d._.push(c),a.getScript(e(b,{index:f})).fail(c.reject)},popupUrl:m+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330},odnoklassniki:{counterUrl:"https://share.yandex.net/counter/odnoklassniki/?url={url}",counter:function(b,c){var d=n.odnoklassniki;return d._?void c.reject():(window.ODKL||(window.ODKL={}),window.ODKL.updateCount=function(a,b){c.resolve(b)},d._=c,void a.getScript(e(b)).fail(c.reject))},popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:550,popupHeight:360},plusone:{counterUrl:"https://share.yandex.net/counter/gpp/?url={url}&callback=?",convertNumber:function(a){return"string"==typeof a&&(a=a.replace(/\D/g,"")),parseInt(a,10)},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500},pinterest:{counterUrl:m+"//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",convertNumber:function(a){return a.count},popupUrl:m+"//pinterest.com/pin/create/button/?url={url}&description={title}",popupWidth:630,popupHeight:270}},o={promises:{},fetch:function(b,c,d){o.promises[b]||(o.promises[b]={});var f=o.promises[b];if(!d.forceUpdate&&f[c])return f[c];var g=a.extend({},n[b],d),h=a.Deferred(),i=g.counterUrl&&e(g.counterUrl,{url:c});return i&&a.isFunction(g.counter)?g.counter(i,h):g.counterUrl?a.getJSON(i).done(function(b){try{var c=b;a.isFunction(g.convertNumber)&&(c=g.convertNumber(b)),h.resolve(c)}catch(d){h.reject()}}).fail(h.reject):h.reject(),f[c]=h.promise(),f[c]}};a.fn.socialLikes=function(c){return this.each(function(){var e=a(this),f=e.data(j);f?a.isPlainObject(c)&&f.update(c):(f=new b(e,a.extend({},a.fn.socialLikes.defaults,c,d(e))),e.data(j,f))})},a.fn.socialLikes.defaults={url:window.location.href.replace(window.location.hash,""),title:document.title,counters:!0,zeroes:!1,wait:500,popupCheckInterval:500,singleTitle:"Share"},b.prototype={init:function(){this.container.addClass(j),this.single=this.container.hasClass(j+"_single"),this.initUserButtons(),this.countersLeft=0,this.number=0,this.container.on("counter."+j,a.proxy(this.updateCounter,this));var b=this.container.children();this.makeSingleButton(),this.buttons=[],b.each(a.proxy(function(b,d){var e=new c(a(d),this.options);this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},this)),this.options.counters?this.timer=setTimeout(a.proxy(this.appear,this),this.options.wait):this.appear()},initUserButtons:function(){!this.userButtonInited&&window.socialLikesButtons&&a.extend(!0,n,socialLikesButtons),this.userButtonInited=!0},makeSingleButton:function(){if(this.single){var b=this.container;b.addClass(j+"_vertical"),b.wrap(a("<div>",{"class":j+"_single-w"})),b.wrapInner(a("<div>",{"class":j+"__single-container"}));var c=b.parent(),d=a("<div>",{"class":g("widget","single")}),e=a(f('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>',{buttonCls:g("button","single"),iconCls:g("icon","single"),title:this.options.singleTitle}));d.append(e),c.append(d),d.on("click",function(){var a=j+"__widget_active";return d.toggleClass(a),d.hasClass(a)?(b.css({left:-(b.width()-d.width())/2,top:-b.height()}),i(b),h(b,function(){d.removeClass(a)})):b.removeClass(l),!1}),this.widget=d}},update:function(b){if(b.forceUpdate||b.url!==this.options.url){this.number=0,this.countersLeft=this.buttons.length,this.widget&&this.widget.find("."+j+"__counter").remove(),a.extend(this.options,b);for(var c=0;c<this.buttons.length;c++)this.buttons[c].update(b)}},updateCounter:function(a,b,c){c&&(this.number+=c,this.single&&this.getCounterElem().text(this.number)),this.countersLeft--,0===this.countersLeft&&(this.appear(),this.container.addClass(j+"_ready"),this.container.trigger("ready."+j,this.number))},appear:function(){this.container.addClass(j+"_visible")},getCounterElem:function(){var b=this.widget.find("."+k+"counter_single");return b.length||(b=a("<span>",{"class":g("counter","single")}),this.widget.append(b)),b}},c.prototype={init:function(){this.detectParams(),this.initHtml(),setTimeout(a.proxy(this.initCounter,this),0)},update:function(b){a.extend(this.options,{forceUpdate:!1},b),this.widget.find("."+j+"__counter").remove(),this.initCounter()},detectService:function(){var b=this.widget.data("service");if(!b){for(var c=this.widget[0],d=c.classList||c.className.split(" "),e=0;e<d.length;e++){var f=d[e];if(n[f]){b=f;break}}if(!b)return}this.service=b,a.extend(this.options,n[b])},detectParams:function(){var a=this.widget.data();if(a.counter){var b=parseInt(a.counter,10);isNaN(b)?this.options.counterUrl=a.counter:this.options.counterNumber=b}a.title&&(this.options.title=a.title),a.url&&(this.options.url=a.url)},initHtml:function(){var b=this.options,c=this.widget,d=c.find("a");d.length&&this.cloneDataAttrs(d,c);var f=a("<span>",{"class":this.getElementClassNames("button"),text:c.text()});if(b.clickUrl){var g=e(b.clickUrl,{url:b.url,title:b.title}),h=a("<a>",{href:g});this.cloneDataAttrs(c,h),c.replaceWith(h),this.widget=c=h}else c.on("click",a.proxy(this.click,this));c.removeClass(this.service),c.addClass(this.getElementClassNames("widget")),f.prepend(a("<span>",{"class":this.getElementClassNames("icon")})),c.empty().append(f),this.button=f},initCounter:function(){if(this.options.counters)if(this.options.counterNumber)this.updateCounter(this.options.counterNumber);else{var b={counterUrl:this.options.counterUrl,forceUpdate:this.options.forceUpdate};o.fetch(this.service,this.options.url,b).always(a.proxy(this.updateCounter,this))}},cloneDataAttrs:function(a,b){var c=a.data();for(var d in c)c.hasOwnProperty(d)&&b.data(d,c[d])},getElementClassNames:function(a){return g(a,this.service)},updateCounter:function(b){b=parseInt(b,10)||0;var c={"class":this.getElementClassNames("counter"),text:b};b||this.options.zeroes||(c["class"]+=" "+j+"__counter_empty",c.text="");var d=a("<span>",c);this.widget.append(d),this.widget.trigger("counter."+j,[this.service,b])},click:function(b){var c=this.options,d=!0;if(a.isFunction(c.click)&&(d=c.click.call(this,b)),d){var f=e(c.popupUrl,{url:c.url,title:c.title});f=this.addAdditionalParamsToUrl(f),this.openPopup(f,{width:c.popupWidth,height:c.popupHeight})}return!1},addAdditionalParamsToUrl:function(b){var c=a.param(a.extend(this.widget.data(),this.options.data));if(a.isEmptyObject(c))return b;var d=-1===b.indexOf("?")?"?":"&";return b+d+c},openPopup:function(b,c){var d=Math.round(screen.width/2-c.width/2),e=0;screen.height>c.height&&(e=Math.round(screen.height/3-c.height/2));var f=window.open(b,"sl_"+this.service,"left="+d+",top="+e+",width="+c.width+",height="+c.height+",personalbar=0,toolbar=0,scrollbars=1,resizable=1");if(f){f.focus(),this.widget.trigger("popup_opened."+j,[this.service,f]);var g=setInterval(a.proxy(function(){f.closed&&(clearInterval(g),this.widget.trigger("popup_closed."+j,this.service))},this),this.options.popupCheckInterval)}else location.href=b}},a(function(){a("."+j).socialLikes()})});

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
		       iconImageHref: 'img/ico_11.png',
		       iconImageSize: [32, 44],
		       iconImageOffset: [0, 0]
		    });

			myCollectionBlue.add(new ymaps.Placemark([+lat, +lon]));

			myMap.geoObjects.add(myCollectionBlue);
		}
	}
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
		       iconImageHref: 'img/ico_11.png',
		       iconImageSize: [32, 44],
		       iconImageOffset: [0, 0]
		    });

			myCollectionBlue.add(new ymaps.Placemark([+lat, +lon]));

			myMap.geoObjects.add(myCollectionBlue);
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


(function($){
	$.fn.promoSlider = function(){
		var slider = this;

		slider.slick({
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000
		});
	}
})(jQuery);


(function($){
	$.fn.stockSlider = function(){
		var slider = this;

		slider.slick({
			fade: true
		});
	}
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
	}
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
	}
})(jQuery);

(function($){
	$.fn.headerFixed = function(){
		var that = this;

		$(window).on('scroll', function() {
			var w = $(this);
		    if (w.scrollTop() > 100) {
		    	that.addClass('header_fix');
		    	$('#all').css({'top': that.height()});
		    	$('#footer').css('margin-top', -400 + that.height())
		    } else {
		    	that.removeClass('header_fix');
		    	$('#all').css({'top': 0});
		    	$('#footer').css('margin-top', '-400px')
		    }
		});
	}
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
		})
	}
})(jQuery);

(function($){
	$.fn.searchInp = function(){
		var $cont = this,
			$inp = $('input', $cont),
			$examp = $('.js-example', $cont);

		$examp.click(function(event){
			$inp.val($examp.text()).focus();
		});
	}
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
    }
})(jQuery);