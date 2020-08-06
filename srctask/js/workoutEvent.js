import { initWorkoutRoutine, toggleRegisterWorkoutRoutineInput } from './registWorkoutRoutineProcess';
import { renderWorkoutList, toggleRegisterWorkoutContainer, saveWorkoutProcess } from './registWorkoutProcess';
import { workoutRoutineList, workoutList, setWorkoutList, setWorkoutPlayData } from './dummyData';
import { clearWorkoutInput } from './utils';
import { workoutRegisteTemplate } from './template';

export function registerWorkoutRoutine(e) {
	console.log('### 새 운동 루틴 버튼');
	// 새 운동 루틴 inputbox
	const targetRegisterWorkoutRoutineInputDom = document.getElementById('targetRegisterWorkoutRoutineInput');
	// toggle 새 운동 루틴 추가 input box
	toggleRegisterWorkoutRoutineInput('new');

	//새 운동 루틴 버튼 추가시 자동으로 focus
	targetRegisterWorkoutRoutineInputDom.focus();
}

export function showWorkoutInputNewMode(e) {
	// 운동 리스트 컨테이너
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');

	debugger;
	if (!targetWorkoutListContainerDom.dataset.routineIndex) return;
	toggleRegisterWorkoutContainer('new');
}

export function workoutdeleteBtn(e) {
	const targetWorkoutListContainerDom = document.getElementById('targetWorkoutListContainer');

	if (targetWorkoutListContainerDom.childElementCount === 0) return;

	let workoutRoutineIndex;
	let i = 0;
	let checkedWorkoutObj = {};
	for (i; i < targetWorkoutListContainerDom.childElementCount; i++) {
		const workoutDom = targetWorkoutListContainerDom.children[i];
		const inputDom = workoutDom.getElementsByTagName('input')[0];
		if (!!inputDom.checked) {
			checkedWorkoutObj[workoutDom.dataset.index] = workoutDom;
		}
	}

	// figure out routineIndex;
	const checkedWorkoutDomList = Object.values(checkedWorkoutObj);
	const checkedWorkoutFirtstDom = checkedWorkoutDomList.length > 0 ? checkedWorkoutDomList[0] : [];
	workoutRoutineIndex = checkedWorkoutFirtstDom.dataset.routineIndex;

	// workout list except checked workout list
	const leftWorkoutList = workoutList.filter((v) => {
		return !checkedWorkoutObj[v.index];
	});

	// update workout dummy Data
	setWorkoutList(leftWorkoutList);

	// reRender workout list
	renderWorkoutList(workoutRoutineIndex);
}

export function saveWorkout(e) {
	saveWorkoutProcess();
}

export function validation(e) {
	const validation = 'validation';
	const classListStr = [ ...e.target.classList ];
	if (classListStr.find((v) => v === validation)) {
		const classList = classListStr.filter((v) => v !== validation).join(' ');
		e.target.classList = classList;
	}
}

export function cancleSaveWorkout(e) {
	console.log('### cancelBtnRegistWorkOutBtnDom');
	toggleRegisterWorkoutContainer();
	clearWorkoutInput();
}

export function showWorkoutInputEditMode(e) {
	console.log('### targetWorkoutListNestedContentsContainer > click');
	// 운동 입력부 컨테이너
	const registWorkoutContainerDom = document.getElementById('registWorkOutContainer');

	// 운동 컨테이너
	const targetWorkoutListNestedContentsContainerDom = document.getElementById(
		'targetWorkoutListNestedContentsContainer'
	);
	// workout 입력부
	const workoutTitleInputDom = document.getElementById('workoutTitle');
	const workoutSecondInputDom = document.getElementById('workoutSecond');
	const workoutTimesInputDom = document.getElementById('workoutTimes');

	switch (e.target.id) {
		case 'workoutEdit':
			//set workout index into registWorkoutContainerDom
			registWorkoutContainerDom.dataset.index = e.target.dataset.index;

			// open 운동 입력부
			const workoutRoutineIndex = targetWorkoutListNestedContentsContainerDom.dataset.workoutRoutineIndex;
			toggleRegisterWorkoutContainer('edit', workoutRoutineIndex);

			const filterWorkoutList = workoutList.filter((v) => v.index === e.target.dataset.index)[0];

			// init 입력부
			workoutTitleInputDom.focus();
			workoutTitleInputDom.value = filterWorkoutList.title;
			workoutSecondInputDom.value = filterWorkoutList.second;
			workoutTimesInputDom.value = filterWorkoutList.times;
			break;

		default:
			break;
	}
}

export function startWorkout(e) {
	console.log('### startWorkOutBtnDom');
	// 운동 컨테이너
	const targetWorkoutListNestedContentsContainerDom = document.getElementById(
		'targetWorkoutListNestedContentsContainer'
	);

	//1. filter 선택한 운동루틴, 운동 목록
	const workoutRoutineIndex = targetWorkoutListNestedContentsContainerDom.dataset.workoutRoutineIndex;
	const workoutPlayRoutine = workoutRoutineList.filter((v) => v.index == workoutRoutineIndex)[0];
	const workoutPlayList = workoutList.filter((v) => v.workoutRoutineIndex == workoutRoutineIndex);

	// 선택된 운동 루틴 없는 경우
	if (!workoutRoutineIndex) {
		return false;
	}

	//2. swap page 운동실행화면 with pass data from 1
	// var app = document.getElementById('app');
	const app = document.querySelector('#app');
	app.innerHTML = '';
	app.innerHTML = showWorkoutPlay({ workoutPlayRoutine, workoutPlayList });
	setWorkoutPlayData({ workoutPlayRoutine, workoutPlayList });

	import('./workoutPlayEvent.js').then((module) => {
		module.setWorkoutPlayHeader();
		module.setWorkoutPlayToolbar();
		module.setWorkoutPlayList();
	});
}

export function workoutMainPage(e) {
	const el = document.querySelector('#app');
	el.innerHTML = workoutRegisteTemplate;
	initWorkoutRoutine();
}

export function showWorkoutPlay({ workoutPlayRoutine = {}, workoutPlayList = [] }) {
	workoutPlayList = workoutPlayList.sort((a, b) => parseInt(b) - parseInt(a));
	//운동실행화면[상단헤더] 요구사항
	//1. 현재 진행 중인 운동 상태 정보가 다음과 같이 표시 된다.
	//  * (운동 루틴이름) : (현재운동이름) (진행시간) / (한 세트 시간) (n세트 진행중)
	//  * 운동이 진행될 수록 '진행시간이 실시간으로 늘어난다.
	//  * 운동 한 세트가 완료되면 '세트 진행 중'의 카운트가 실시간으로 즌ㅇ가

	//2. 운동 루틴이 완료되면 완료 정보가 다음과같이 표시
	//  * (현재 운동 루틴 이름) 완료
	// 운동 루틴이름
	const routineTitle = workoutPlayRoutine.title;
	// 현재운동이름
	let currentWorkoutTitle = workoutPlayList[0].title;
	// 진행시간
	let currentWorkoutTime = 0;
	// 한 세트 시간
	let currentWorkoutSecond = workoutPlayList[0].second;
	// n세트 진행중
	let currentTimes = 1;
	let second = 0;

	let headerTitle = `${routineTitle} : ${currentWorkoutTitle}  ${currentWorkoutTime} /${currentWorkoutSecond} ${currentTimes}세트 진행 중`;

	return `

  <div class="workoutRegistContainer">
    <!-- 운동실행화면 상단헤더 -->
    <div id="targetWorkoutPlayHeader" class="workoutPlayHeader"></div>
    
    <!-- 운동실행화면 툴바 -->
    <div id="workoutPlayToolbar" class="workoutPlayToolbar"></div>

    <!-- 운동실행화면 컨테이너 -->
    <div id="workoutPlayList" class="workoutPlayList">
      <!-- 운동실행화면 workout 목록 리스트-->
      <div id="targetWorkoutPlayListContainer" class="workoutPlayListContainer" data-routine-index="17">
      </div>
    </div>

    <!-- 운동실행화면 Footer -->
    <div class="workoutPlayFooter">
      <div id="workoutPlayFooterPause" class="workoutPlayFooterPause">일시정지</div>
      <div id="workoutPlayFooterRestart" class="workoutPlayFooterRestart">재시작</div>
      <div id="workoutPlayFooterStop" class="workoutPlayFooterStop">운동멈추기</div>
      <div id="workoutPlayFooterDone" class="workoutPlayFooterDone">완료</div>
    </div>
  </div>
  `;
}
