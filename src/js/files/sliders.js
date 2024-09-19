/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Controller, EffectCards, EffectCoverflow, EffectFade, Navigation, Pagination, Thumbs } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import '../../scss/base/swiper.scss';
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.about__slider')) {
		// Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.about__slider', {
			// Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація

			// pagination: {
			// 	el: '.swiper-pagination',
			// 	type: 'fraction',
			// },

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {},
		});
	}
	if (document.querySelector('.main-product__slider')) {
		new Swiper('.main-product__slider', {
			modules: [Navigation, Pagination, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 800,
			effect: 'fade',
			pagination: {
				el: '.main-product__slider-wrapper .swiper-pagination',
				type: 'fraction',
			},

			navigation: {
				prevEl: '.main-product__slider-buttons .swiper-button-prev',
				nextEl: '.main-product__slider-buttons .swiper-button-next',
			},
		});
	}
	if (document.querySelector('.design-product__slider')) {
		new Swiper('.design-product__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			grabCursor: true,
			slidesPerView: 1,
			spaceBetween: 20,
			speed: 800,
			navigation: {
				prevEl: '.design-product__buttons .swiper-button-prev',
				nextEl: '.design-product__buttons .swiper-button-next',
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
			},
		});
	}
	if (document.querySelector('.team__slider')) {
		new Swiper('.team__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 4,
			spaceBetween: 50,
			speed: 800,
			navigation: {
				prevEl: '.team__slider .swiper-button-prev',
				nextEl: '.team__slider .swiper-button-next',
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
			},
		});
	}
	if (document.querySelector('.partners__slider')) {
		new Swiper('.partners__slider', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 5,
			spaceBetween: 20,
			speed: 800,
			loop: true,
			pagination: {
				el: '.partners__slider .swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				0: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 4,
				},
				992: {
					slidesPerView: 5,
				},
			},
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener('load', function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});
