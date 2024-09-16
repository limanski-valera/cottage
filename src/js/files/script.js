// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';

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

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('.general-plan')) {
		initPlan();
	}
});
