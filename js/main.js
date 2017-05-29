var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
var pointerClick = isTouchDevice ? 'touchstart' : 'click';

(function($) {
	$(function() {
		$('.slideshow').flexslider({
			animation: "slide",
			slideshow: false,
			controlNav: false,
			directionNav: false
		});
		initSearchBox();
		initMainNav();
		mainGalleryThumbs.init();
		initCustomForms();
	});
	
	var mainGalleryThumbs = (function() {
		var $thumbsContainer,
			$thumbs,
			$gallery,
			activeClass = 'flex-active';

		return {
			init: function() {
				$thumbsContainer = $('.pagination');
				$gallery = $('.slideshow');
				if(!$thumbsContainer.length || !$gallery.length) return;

				$thumbs = $('li', $thumbsContainer);

				$thumbsContainer.on('click', 'li', function() {
					var $this = $(this);
					
					$thumbs.removeClass(activeClass);
					$this.addClass(activeClass);
					
					$gallery.data('flexslider').flexslider($this.index());
				});
			}
		}
	})();

	function initSearchBox() {
		var $btn = $('.search-form .btn-search'),
			$infoBox = $btn.closest('.info-box'),
			$inputContainer = $('.search-form .input-container'),
			$input = $('input', $inputContainer),
			$items = $infoBox.find('.arabic-link, .contact-list'),
			inputWidth = $input.outerWidth(),
			animSpeed = 300;
			
			$inputContainer.css({
				'width': 0,
				'overflow': 'hidden'
			});
			
		$btn.click(function() {
			if($inputContainer.width() > 0) return;
	
			$items.css('display', 'none');
			$inputContainer.animate({'width': inputWidth}, animSpeed, function() {
				$inputContainer.css('overflow', 'visible');
			});
			$input.focus();
			$infoBox.addClass('active');
			
			$(document).on(pointerClick + '.searchClose', function(e) {
				var $target = $(e.target);
				if(!$target.closest('.search-form').length) {
					$infoBox.removeClass('active');
					$inputContainer.css('overflow', 'hidden');
					$inputContainer.animate({'width': 0}, animSpeed, function() {
						$items.css('display', 'block');
					});
					$(document).off('.searchClose');
				}
			});
		});
	}
	
	function initMainNav() {
		var $opener = $('.main-nav-opener, .main-nav-close'),
			$body = $('body'),
			$panel = $('.main-nav'),
			activeClass = 'main-nav-opened',
			animSpeed = 300,
			$overlay = $('<div>').addClass('page-overlay');
		
		$opener.on(pointerClick, function(e) {
			if($body.hasClass(activeClass)) {
				hidePanel();
			}
			else {
				showPanel();
			}
			e.preventDefault();
		});
		
		$panel.hammer({drag_min_distance: 3}).on('swiperight dragright', hidePanel);
		
		function hidePanel() {
			$overlay.remove();
			$body.removeClass(activeClass);
			$panel.css('transform', 'translateX(100%)');
		}
		
		function showPanel() {
			$overlay.appendTo($body);
			$body.addClass(activeClass);
			$panel.css('transform', 'translateX(0)');
		}
	}
})(jQuery);