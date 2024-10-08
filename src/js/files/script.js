// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

import { DotLottie } from '@lottiefiles/dotlottie-web';

function initPlan() {
	const messageEl = document.querySelector('.general-plan__house-status');

	function onHouseEnter(house) {
		document.removeEventListener('mousemove', mouseMoveHandler);

		let message = '';

		if (house.closest('.sold_out')) message = 'Проданий';
		if (house.closest('.active')) message = 'Продається';
		if (house.closest('.booked')) message = 'Заброньовано';

		const rect = house.getBoundingClientRect();

		const left = rect.right + 5;
		const top = rect.top - 20;

		messageEl.textContent = message;
		messageEl.style = `display:block;left:${left}px;top:${top}px`;

		house.addEventListener('mouseleave', mouseLeaveHandler);
	}

	function onHouseLeave(house) {
		house.removeEventListener('mouseleave', mouseLeaveHandler);

		messageEl.style = 'display: none';

		document.addEventListener('mousemove', mouseMoveHandler);
	}

	function mouseLeaveHandler(e) {
		onHouseLeave(e.target);
	}

	function mouseMoveHandler(e) {
		if (e.target.closest('.sold_out') || e.target.closest('.active') || e.target.closest('.booked')) {
			const house = e.target.closest('.sold_out') || e.target.closest('.active') || e.target.closest('.booked');

			onHouseEnter(house);
		}
	}

	document.addEventListener('mousemove', mouseMoveHandler);
}

function initForms() {
	function setMessage(form, text, isError) {
		let elem;
		if (form.querySelector('.message')) {
			elem = form.querySelector('.message');

			if (elem.classList.contains('error')) elem.classList.remove('error');
		} else {
			elem = document.createElement('div');
			elem.classList.add('message');
		}

		isError && elem.classList.add('error');
		elem.textContent = text;

		form.append(elem);
	}

	function removeMessage(form) {
		const message = form.querySelector('.message');

		if (message) message.remove();
	}

	function resetAllCaptchas() {
		widgetId1 && grecaptcha.reset(widgetId1);
		widgetId2 && grecaptcha.reset(widgetId2);
		widgetId3 && grecaptcha.reset(widgetId3);
		widgetId4 && grecaptcha.reset(widgetId4);
	}

	async function sendToTelegram(message) {
		const API_KEY = '7115900494:AAFwIzIx3FJnlZqH8bgcm93hZ8WhWavOotg';
		const CHAT_ID = -1002386757471;
		const URL = `https://api.telegram.org/bot${API_KEY}/sendMessage`;

		return fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text: message,
			}),
		});
	}

	function initForm(form) {
		form.addEventListener('submit', async (e) => {
			e.preventDefault();

			const dataObj = Object.fromEntries(new FormData(form).entries());

			const isFormHasCaptcha = dataObj.hasOwnProperty('g-recaptcha-response');

			if (isFormHasCaptcha && !dataObj['g-recaptcha-response']) {
				setMessage(form, 'Пройдіть капчу', true);
				return;
			}

			let message = '';

			for (const element in dataObj) {
				if (!dataObj[element]?.length) continue;

				switch (element) {
					case 'name':
						message += `Імʼя: ${dataObj[element]}\n`;
						break;
					case 'phone':
						message += `Телефон: ${dataObj[element]}\n`;
						break;
					case 'email':
						message += `Email: ${dataObj[element]}\n`;
						break;
					case 'message':
						message += `Повідомлення: ${dataObj[element]}\n`;
						break;
					case 'g-recaptcha-response':
						break;
					default:
						message += dataObj[element] + '\n';
				}
			}

			setMessage(form, 'Незабаром ми з вами звʼяжемося!');

			const response = await sendToTelegram(message);

			if (response.ok) {
				form.reset();
				resetAllCaptchas();

				setTimeout(() => {
					removeMessage(form);
				}, 2000);
			} else setMessage(form, 'Виникла помилка при відправленні.', true);
		});
	}

	const forms = document.querySelectorAll('form');

	forms.forEach((form) => {
		initForm(form);
	});
}

function initLottie() {
	new DotLottie({
		autoplay: true,
		canvas: document.querySelector('#dotlottie-canvas'),
		src: '../files/lottie.json',
		speed: 1.5,
	});

	setTimeout(() => {
		document.documentElement.classList.add('_hide-lottie');
	}, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.general-plan')) initPlan();

	if (document.querySelector('form')) initForms();

	if (document.querySelector('#dotlottie-canvas')) initLottie();
});
