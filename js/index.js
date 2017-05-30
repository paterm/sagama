;(function($){
	var app = {
		init: function () {
			this.mobileMenu.init();
			this.productCalc.init();
			this.productVariants.init();
		},
		mobileMenu: {
			$btn: $('.mobile-menu__button'),
			$target: $('.mobile-menu'),
			$link: $('.mobile-menu__list a'),
			init: function () {
				this.$btn.on('click', function () {
					app.mobileMenu.toggle();
				});

				$(document).on('click', function (e) {
					var isMenuBlock = !!$(e.target).closest('.mobile-menu').length,
						isButtonBlock = !!$(e.target).parent('.mobile-menu__button').length;
					
					if (!isMenuBlock && !isButtonBlock) {
						app.mobileMenu.close();
					}
				});

				this.$link.on('click', function (e) {
					e.preventDefault();
					var selector = $(this).attr('href'),
						top = $(selector).offset().top;

					app.scrollTo(top - 96);
				});
			},
			toggle: function () {
				this.$target.toggleClass('mobile-menu--open');
			},
			close: function () {
				this.$target.removeClass('mobile-menu--open');	
			}
		},
		scrollTo: function (pos) {
			$('html, body').animate({
		        scrollTop: pos
		    }, 500);
		},
		productCalc: {
			$target: $('.block-counter'),
			$minus: $('.block-counter-minus'),
			$plus: $('.block-counter-plus'),
			$price: $('.block-price__value'),
			$variants: $('.block-image-grass'),
			currentPrice: null,
			count: 1,
			$input: null,
			init: function () {
				this.currentPrice = parseInt(this.$price.text());

				this.$input = this.$target.find('input');

				this.$plus.on('click', function () {
					app.productCalc.plus();
				});

				this.$minus.on('click', function () {
					app.productCalc.minus();
				});

				
			},
			plus: function () {
				this.count = parseInt(this.$input.val());

				this.$input.val(++this.count);
				this.$price.text(this.currentPrice * this.count);
			},
			minus: function () {
				this.count = parseInt(this.$input.val());

				if (this.count > 1) {
					this.$input.val(--this.count);
					this.$price.text(this.currentPrice * this.count);
				}
			},
			calc: function () {
				this.$input.val(this.count);
				this.$price.text(this.currentPrice);
			},
			reset: function () {
				this.$price.text(this.currentPrice);
				this.count = 1;
				this.$input.val(this.count);
			}
		},
		productVariants: {
			$mainContainer: $('.block-center'),
			$variants: $('.block-image-grass'),
			$leftBtn: $('.block-left__overlay'),
			$rightBtn: $('.block-right__overlay'),
			activeSlide: 0,
			init: function () {
				this.$variants.on('click', function () {
					app.productVariants.applyVariant($(this));
				});

				this.$leftBtn.on('click', function () {
					app.productVariants.prev();
				});

				this.$rightBtn.on('click', function () {
					app.productVariants.next();
				});
			},
			applyVariant: function ($item) {
				var $parent = $item.parent(),
					title = $parent.find('.block-text-grass') ? $parent.find('.block-text-grass').text() : null,
					price = parseInt($item.data('price'));

				this.$variants.removeClass('active');
				$item.addClass('active');
				this.activeSlide = parseInt($parent.data('slide'));

				if (price) app.productCalc.currentPrice = price;

				if (title) this.$mainContainer.find('.block-center__header').text(title);

				app.productCalc.reset();
			},
			prev: function () {
				if (this.activeSlide > 0) {
					this.activeSlide--;
					this.slide(this.activeSlide);
				} else {
					this.slide(this.$variants.length - 1);
				}
			},
			next: function () {
				if (this.activeSlide < this.$variants.length -1) {
					this.activeSlide++;
					this.slide(this.activeSlide);
				} else {
					this.slide(0);
				}
			},
			slide: function (index) {
				console.log(index);
				this.applyVariant($('[data-slide="' + index + '"]').find('.block-image-grass'));
			}
		}
	};

	app.init();
})(jQuery);