import { clearWorkoutInput, validation } from './utils';
import { workoutList, setWorkoutList } from './dummyData';
import { workoutTemplate } from './template';

/**
 *  workout
 */
// get workout list
export function getWorkoutList(workoutRoutineIndex = '') {
	let result = JSON.parse(localStorage.getItem('workoutListDummyData'));
	if (!!workoutRoutineIndex) {
		result = result.filter((v) => v.workoutRoutineIndex === workoutRoutineIndex);
	}
	return result;
}

// get workout list dom
export function getWorkoutListDom(workoutRoutineIndex = '') {
	const workoutList = getWorkoutList();

	const template = workoutList
		.filter((v) => v.workoutRoutineIndex === workoutRoutineIndex)
		.map((v) =>
			workoutTemplate
				.replace(/\{\{index\}\}/g, v.index)
				.replace(/\{\{workoutIndex\}\}/g, v.workoutIndex)
				.replace(/\{\{workoutRoutineIndex\}\}/g, v.workoutRoutineIndex)
				.replace('{{second}}', v.second)
				.replace('{{times}}', v.times)
				.replace('{{workoutTitle}}', v.title)
		)
		.join('');

	return new DOMParser().parseFromString(template, 'text/html').body.childNodes;
}

export function appendWorkout(workoutDomList = []) {
	// 운동 리스트 컨테이너
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');
	const copy = [ ...workoutDomList ];

	copy.forEach((node) => {
		targetWorkoutListContainerDom.appendChild(node);
	});
}

// show workout total time
const showWorkoutTotalTime = () => {};

const formatSecondToMin = (second = 0) => {
	const minute = Math.floor(second / 60);
	const leftSecond = second % 60;
	return { minute, leftSecond };
};

// calc workout total time
export function getWorkoutTotalTime(workoutRoutineIndex) {
	const workoutlist = getWorkoutList(workoutRoutineIndex);
	const sumSecond = workoutlist
		.map((v, index, arr) => {
			const gapTimeBetweenWorkoutTimes = parseInt(v.times) != 1 ? parseInt(v.times) - 1 : 0;
			const gapTimeBetweenWorkout = index != arr.length ? 1 : 0;
			return parseInt(v.second) * parseInt(v.times) + gapTimeBetweenWorkoutTimes + gapTimeBetweenWorkout;
		})
		.reduce((acc, cur) => {
			return acc + cur;
		}, 0);
	return formatSecondToMin(sumSecond);
}

// clear workout list
export function clearHighLight() {}
export function clearWorkoutList() {
	// 운동 리스트 컨테이너
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');

	targetWorkoutListContainerDom.innerHTML = '';
}
export function clearWorkoutContainer() {
	const workoutTitleInputDom = document.getElementById('workoutTitle');
	const workoutSecondInputDom = document.getElementById('workoutSecond');
	const workoutTimesInputDom = document.getElementById('workoutTimes');
	// dom of 운동 입력부 컨테이너
	const registWorkutContainerDom = document.getElementById('registWorkOutContainer');
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');

	workoutTitleInputDom.value = '';
	workoutSecondInputDom.value = '';
	workoutTimesInputDom.value = '';
	registWorkutContainerDom.style.display = 'none';
	delete targetWorkoutListContainerDom.dataset.routineIndex;
}
export function clearWorkoutTotalTime() {
	const targetTotalTimeDom = document.getElementById('targetTotalTime');
	targetTotalTimeDom.innerHTML = '';
}
export function clearWorkoutDom() {
	clearHighLight();
	clearWorkoutList();
	clearWorkoutContainer();
	clearWorkoutTotalTime();
}

// render workout
export function renderWorkoutList(workoutRoutineIndex = '') {
	const targetTotalTimeDom = document.getElementById('targetTotalTime');
	const getWorkoutTotalTimeResult = getWorkoutTotalTime(workoutRoutineIndex);

	// clear workout list
	clearWorkoutList();
	appendWorkout(getWorkoutListDom(workoutRoutineIndex));
	// 운동 등록화면 [툴바]에 전체 시간 표시
	targetTotalTimeDom.innerHTML = `전체 시간: ${getWorkoutTotalTimeResult.minute} 분 ${getWorkoutTotalTimeResult.leftSecond}초`;
}

export function toggleRegisterWorkoutContainer(mode = '', index = '') {
	let display = '';

	// 운동 입력부 컨테이너
	const registWorkoutContainerDom = document.getElementById('registWorkOutContainer');
	const workoutTitleInputDom = document.getElementById('workoutTitle');
	const workoutSecondInputDom = document.getElementById('workoutSecond');
	const workoutTimesInputDom = document.getElementById('workoutTimes');
	// 운동 컨테이너
	const targetWorkoutListNestedContentsContainerDom = document.getElementById(
		'targetWorkoutListNestedContentsContainer'
	);

	//edit 에서 new로 변경되는 경우
	if (registWorkoutContainerDom.dataset.mode === 'edit' && mode === 'new') {
		workoutTitleInputDom.value = '';
		workoutSecondInputDom.value = '';
		workoutTimesInputDom.value = '';

		registWorkoutContainerDom.dataset.mode = mode;
		return;
	}

	if (registWorkoutContainerDom.style.display === 'block' && mode !== 'edit') {
		display = 'none';
		workoutTitleInputDom.value = '';
		workoutSecondInputDom.value = '';
		workoutTimesInputDom.value = '';

		registWorkoutContainerDom.dataset.mode = mode;
		registWorkoutContainerDom.style.display = display;
	} else {
		display = 'block';
		mode = mode;
		if (mode === 'edit') {
			registWorkoutContainerDom.dataset.editIndex = index;
		}

		registWorkoutContainerDom.dataset.mode = mode;
		registWorkoutContainerDom.style.display = display;

		// init input 운동시간 30초, 세트 1회
		if (mode === 'new') {
			workoutTitleInputDom.focus();
			workoutSecondInputDom.value = 30;
			workoutTimesInputDom.value = 1;
		}

		// move to scroll bottom
		targetWorkoutListNestedContentsContainerDom.scrollTop =
			targetWorkoutListNestedContentsContainerDom.scrollHeight;
	}
}

export function saveWorkoutProcess() {
	// validation
	// 운동 입력부 컨테이너
	const registWorkoutContainerDom = document.getElementById('registWorkOutContainer');
	// 운동 리스트 컨테이너
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');
	const workoutInputHTMLCollection = document.getElementsByClassName('workoutInput');
	const workoutTitleInputDom = document.getElementById('workoutTitle');
	const workoutSecondInputDom = document.getElementById('workoutSecond');
	const workoutTimesInputDom = document.getElementById('workoutTimes');
	const targetWorkoutListNestedContentsContainerDom = document.getElementById(
		'targetWorkoutListNestedContentsContainer'
	);

	let { result, resultObject } = validation(workoutInputHTMLCollection);
	if (!result) {
		alert(resultObject.message);
		return;
	}

	// move to scroll top
	targetWorkoutListNestedContentsContainerDom.scrollTop = 0;

	const workoutRoutineIndex = targetWorkoutListContainerDom.dataset.routineIndex;
	switch (registWorkoutContainerDom.dataset.mode) {
		case 'new':
			// 운동 신규 추가
			//1. figure out routineIndex;
			const filterWorkoutList = workoutList.filter((v) => v.workoutRoutineIndex === workoutRoutineIndex);

			//2. get maxIndex, maxWorkoutIndex
			let maxIndex = workoutList.reduce((acc, cur) => {
				return parseInt(acc.index) > parseInt(cur.index) ? acc : cur;
			}).index;

			let maxWorkoutIndex =
				filterWorkoutList.length > 0
					? filterWorkoutList.reduce((acc, cur) => {
							return parseInt(acc.workoutIndex) > parseInt(cur.workoutIndex) ? acc : cur;
						}).workoutIndex
					: 0;

			//3. update workout dummy Data
			let date = new Date();
			workoutList.push({
				index: parseInt(maxIndex) + 1 + '',
				workoutIndex: parseInt(maxWorkoutIndex) + 1 + '',
				workoutRoutineIndex: workoutRoutineIndex,
				title: workoutTitleInputDom.value,
				second: workoutSecondInputDom.value,
				times: workoutTimesInputDom.value,
				regDate: date++,
				updateDate: date++
			});
			setWorkoutList(workoutList);

			//4. reRender workout list
			renderWorkoutList(workoutRoutineIndex); //routineIndex

			//5. remove registWorkoutContainerDom & clear inputbox
			toggleRegisterWorkoutContainer();
			clearWorkoutInput();
			workoutTitleInputDom.focus();
			break;
		case 'edit':
			//운동 수정
			//1. get workout index
			const indexOfworkout = registWorkoutContainerDom.dataset.index;

			//2. update workout info
			const newWorkoutList = workoutList.map((v) => {
				if (v.index == indexOfworkout) {
					v.title = workoutTitleInputDom.value;
					v.second = workoutSecondInputDom.value;
					v.times = workoutTimesInputDom.value;
				}
				return v;
			});
			setWorkoutList(newWorkoutList);

			//3. render workout list by new workout info
			renderWorkoutList(workoutRoutineIndex); //routineIndex

			//4. remove registWorkoutContainerDom & clear inputbox
			toggleRegisterWorkoutContainer();
			clearWorkoutInput();
			break;

		default:
			break;
	}
}
