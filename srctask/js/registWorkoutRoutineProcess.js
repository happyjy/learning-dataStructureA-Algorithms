import { getWorkoutRoutineList, clearHighlight } from './utils';
import { clearWorkoutDom, toggleRegisterWorkoutContainer } from './registWorkoutProcess';
import { workoutRoutineTemplate } from './template';

export function showRegisterWorkoutRoutineInput(show = true) {
	// 새 운동 루틴 버튼
	const targetRegisterWorkoutRoutineDom = document.getElementById('targetRegisterWorkoutRoutine');
	// 새 운동 루틴 inputbox
	const targetRegisterWorkoutRoutineInputDom = document.getElementById('targetRegisterWorkoutRoutineInput');
	let display;
	if (show) {
		display = 'block';
	} else {
		display = 'none';
	}

	targetRegisterWorkoutRoutineInputDom.value = '';
	delete targetRegisterWorkoutRoutineDom.dataset.mode;
	targetRegisterWorkoutRoutineDom.style.display = display;
}
// toogle rigister workout routin input
export function toggleRegisterWorkoutRoutineInput(mode = '', index = '') {
	let display = '';
	// 새 운동 루틴 버튼
	const targetRegisterWorkoutRoutineDom = document.getElementById('targetRegisterWorkoutRoutine');
	// 새 운동 루틴 inputbox
	const targetRegisterWorkoutRoutineInputDom = document.getElementById('targetRegisterWorkoutRoutineInput');

	if (targetRegisterWorkoutRoutineDom.style.display === 'block') {
		display = 'none';
		mode = '';
		targetRegisterWorkoutRoutineInputDom.value = '';
	} else {
		display = 'block';
		mode = mode;

		if (mode === 'edit') {
			targetRegisterWorkoutRoutineDom.dataset.editIndex = index;
		}
	}
	targetRegisterWorkoutRoutineDom.dataset.mode = mode;
	targetRegisterWorkoutRoutineDom.style.display = display;
}

// get workout routine list dom
export function getWorkoutRountineListDom(workoutRoutineListDummyData = []) {
	const template = workoutRoutineListDummyData
		.map((v) => workoutRoutineTemplate.replace(/\{\{index\}\}/g, v.index).replace('{{title}}', v.title))
		.join('');

	return new DOMParser().parseFromString(template, 'text/html').body.childNodes;
}

// append routine Dom
export function appendWorkoutRountine(templateDomList = []) {
	// 새 운동 루틴 추가 컨테이너(edit, delete 컨테이너)
	const targetWorkoutRoutineListContainerDom = document.getElementById('targetWorkoutRoutineListContainer');

	const copy = [ ...templateDomList ];
	copy.forEach((node) => {
		targetWorkoutRoutineListContainerDom.appendChild(node);
	});
}

// #init 운동 루틴 리스트(dom 생성 / append)
// seesion workoutRoutineList 이용
export function initWorkoutRoutine() {
	const seessionDataWorkoutRoutineList = getWorkoutRoutineList();
	// 최근것부터 보여주도록
	seessionDataWorkoutRoutineList.sort((a, b) => b.regDate++ - a.regDate++);
	const templateDomList = getWorkoutRountineListDom(seessionDataWorkoutRoutineList);
	appendWorkoutRountine(templateDomList);

	document.addEventListener('click', (e) => {
		if (e.target === document.getElementsByTagName('body')[0]) {
			clearWorkoutDom();
			clearHighlight();
		}
	});
}

document.onkeydown = (e) => {
	e = e || window.event;
	var isEscape = false;

	// 새 운동 루틴 추가 input box
	const targetRegisterWorkoutRoutineInputDom = document.getElementById('targetRegisterWorkoutRoutineInput');

	// 운동 추가 input box(운동이름, 초, 세트수)
	const workoutTitleInputDom = document.getElementById('workoutTitle');
	const workoutSecondInputDom = document.getElementById('workoutSecond');
	const workoutTimesInputDom = document.getElementById('workoutTimes');

	if ('key' in e) {
		isEscape = e.key === 'Escape' || e.key === 'Esc';
	} else {
		isEscape = e.keyCode === 27;
	}
	if (isEscape) {
		if (document.activeElement === targetRegisterWorkoutRoutineInputDom) {
			console.log('새운동루틴 input에 active있어서 input 제거');
			toggleRegisterWorkoutRoutineInput();
		}

		if (
			document.activeElement === workoutTitleInputDom ||
			document.activeElement === workoutSecondInputDom ||
			document.activeElement === workoutTimesInputDom
		) {
			console.log('운동 input에 active있어서 제거');
			toggleRegisterWorkoutContainer();
		}
	}
};
