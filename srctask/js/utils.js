/**
 * workout routine
 */
// get workout routine list
export function getWorkoutRoutineList() {
	return JSON.parse(localStorage.getItem('workoutRoutineListDummyData'));
}

//clear highlight
export function clearHighlight() {
	const targetWorkoutRoutineListContainerDom = document.getElementById('targetWorkoutRoutineListContainer');
	let i = 0;
	const HIGHLIGHT = 'highlight';
	for (i; i < targetWorkoutRoutineListContainerDom.childElementCount; i++) {
		let childDom = targetWorkoutRoutineListContainerDom.children[i];
		const childDomClass = childDom.getAttribute('class');
		const startPointHighlight = childDomClass.indexOf(HIGHLIGHT);
		if (startPointHighlight >= 0) {
			childDom.className = childDomClass.replace(' ' + HIGHLIGHT, '');
		}
	}
}

// 운동 추가 input box(운동이름, 초, 세트수)
const workoutTitleInputDom = document.getElementById('workoutTitle');
const workoutSecondInputDom = document.getElementById('workoutSecond');
const workoutTimesInputDom = document.getElementById('workoutTimes');

export function clearWorkoutInput() {
	workoutTitleInputDom.value = '';
	workoutSecondInputDom.value = '';
	workoutTimesInputDom.value = '';
}

/**
 * workout
 */
//validation workout
export function validation(HTMLCollection) {
	let result = true;
	let resultObject = {};

	const workoutInputList = [ ...HTMLCollection ];

	let workoutInputDom;
	while ((workoutInputDom = workoutInputList.pop())) {
		//required
		if (workoutInputDom.value.trim().length === 0) {
			result = false;
			workoutInputDom.className += ' validation';
			resultObject = {
				type: 'required',
				message: '입력하세요.',
				id: workoutInputDom.id
			};
		}

		//시간 10초 이상 60초 사이
		if (
			workoutInputDom.id === 'workoutSecond' &&
			(parseInt(workoutInputDom.value) < 10 || parseInt(workoutInputDom.value) > 60)
		) {
			result = false;
			workoutInputDom.className += ' validation';
			resultObject = {
				type: 'time',
				message: '시간은 10초 이상 60이하 이여야 합니다.',
				id: workoutInputDom.id
			};
		}

		//세트 1이상 10이하
		if (
			workoutInputDom.id === 'workoutTimes' &&
			(parseInt(workoutInputDom.value) < 1 || parseInt(workoutInputDom.value) > 10)
		) {
			result = false;
			workoutInputDom.className += ' validation';
			resultObject = {
				type: 'times',
				message: '세트수는 1이상 10이하 이여야 합니다.',
				id: workoutInputDom.id
			};
		}
	}

	return { result, resultObject };
}

/**
 * render
 */
export function renderDomList(targetDom = document.body, domList = []) {
	const copy = [ ...domList ];
	copy.forEach((node) => {
		targetDom.appendChild(node);
	});
}
