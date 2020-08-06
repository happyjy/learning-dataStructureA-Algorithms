// import { workoutPlayRoutine, workoutPlayList } from './registWorkout';
import { getWorkoutPlayData } from './dummyData';
import { getWorkoutTotalTime } from './registWorkoutProcess';
import { renderDomList, useState } from './utils';
import { workoutMainPage } from './workoutEvent';

let pauseFlag = false;
let headerIntervalReturn;
let toolbarIntervalReturn;

export function setWorkoutPlayHeader() {
	//운동실행화면[헤더]
	const workoutPlayHeaderDom = document.getElementById('targetWorkoutPlayHeader');

	//운동 루틴, 운동 data
	const { workoutPlayRoutine, workoutPlayList } = getWorkoutPlayData();
	const sortedWorkoutPlayList = workoutPlayList.sort((a, b) => parseInt(b) - parseInt(a));
	//# 운동실행화면[상단헤더] 요구사항
	//1. 현재 진행 중인 운동 상태 정보가 다음과 같이 표시 된다.
	//  * (운동 루틴이름) : (현재운동이름) (진행시간) / (한 세트 시간) (n세트 진행중)
	//  * 운동이 진행될 수록 '진행시간이 실시간으로 늘어난다.
	//  * 운동 한 세트가 완료되면 '세트 진행 중'의 카운트가 실시간으로 즌ㅇ가

	//2. 운동 루틴이 완료되면 완료 정보가 다음과같이 표시
	//  * (현재 운동 루틴 이름) 완료
	// 운동 루틴이름
	const routineTitle = workoutPlayRoutine.title;
	// 현재운동이름
	let currentWorkoutTitle = sortedWorkoutPlayList[0].title;
	// 진행시간
	let currentWorkoutTime = 0;
	// 한 세트 시간
	let currentWorkoutSecond = sortedWorkoutPlayList[0].second;
	// n세트 진행중
	let currentTimes = 1;

	let workoutPlayHeaderTitleTemplate = `
  ${routineTitle} : 
  <span id="currentWorkoutTitle">${currentWorkoutTitle}</span> 
  <span id="currentWorkoutTime">${currentWorkoutTime}</span> (진행시간) /
  <span id="currentWorkoutSecond">${currentWorkoutSecond}</span>초
  <span id="currentTimes">${currentTimes}</span> 세트 진행 중`;

	//init header
	const domList = new DOMParser().parseFromString(workoutPlayHeaderTitleTemplate, 'text/html').body.childNodes;
	[ ...domList ].forEach((node) => {
		workoutPlayHeaderDom.appendChild(node);
	});

	//# 변경되는 dom
	//  : 현재 운동 이름, 세트 진행 시간, 세트 시간, 현재 세트
	const currentWorkoutTitleDom = document.getElementById('currentWorkoutTitle');
	const currentWorkoutTimeDom = document.getElementById('currentWorkoutTime');
	const currentWorkoutSecondDom = document.getElementById('currentWorkoutSecond');
	const currentTimesDom = document.getElementById('currentTimes');

	/*
    # 운동 실행 화면 header 전략
    세트의시간 -> 세트 수 -> 다음 세트
    1. 세트 시간 count변수(secondCount)증가 후 설정한 세트 시간과 체크
      1.1 설정 세트 시간을 못 채운 경우 
        - 1번 반복
      1.2 설정 세트 시간 채운 경우
        - 다음 세트 
    2. 세트 count변수(timesCount)증가(1.2번에 의해) 후 설정한 세트 수와 체크
      2.1 설정 세트 수 못 채운 경우 
        - 2번 반복
      2.2 설정 세트 수 채운 경우
        - 다음 운동
    3. 운동 count변수(workoutIndexCount) 증가 후 설정한 운동 수와 체크 
      3.1 설정 운동 수 못 채운 경우
        - 1번 반복
      3.2 설정 운동 수 채운 경우 
        - 운동 완료 
  */
	const workoutPlayListLength = sortedWorkoutPlayList.length; //운동 수
	let workoutIndexCount = 0; //운동 index
	let timesCount = 1; //세트수
	let secondCount = 0; //세트의 시간

	let currentWorkout; //현재 운동 종류

	headerIntervalReturn = setInterval(() => {
		// 일시정지
		if (pauseFlag) {
			return false;
		}

		if (workoutPlayListLength === workoutIndexCount) {
			//완료 버튼 show
			document.getElementById('workoutPlayFooterDone').style.display = 'block';

			workoutPlayHeaderDom.innerText = `${routineTitle} 완료`;
			clearInterval(headerIntervalReturn);
			return false;
		}
		currentWorkout = sortedWorkoutPlayList[workoutIndexCount];
		currentTimes = currentWorkout.times;
		//step1 세트 시간 count변수(secondCount)증가 후 설정한 세트 시간과 체크
		if (currentWorkout.second == secondCount++) {
			//stel1.2 설정 세트 시간 채운 경우

			//step2 세트 수 체크
			if (currentTimes == timesCount++) {
				//step2.2 세트 수 다 채운 경우
				timesCount = 1;
				++workoutIndexCount;
				let currentWorkout1 = sortedWorkoutPlayList[workoutIndexCount];
				if (!currentWorkout1) {
					return false;
				}

				//운동 아이템이 변할 때
				workoutPlayItemUpdate();

				currentWorkoutTitleDom.innerText = currentWorkout1.title; //현재 운동 이름
				currentWorkoutTimeDom.innerText = 0;
				currentWorkoutSecondDom.innerText = currentWorkout1.second; //한 세트의 시간
				currentTimesDom.innerText = timesCount;
			} else {
				//step2.1 세트 수 다 못 채운 경우
				currentWorkoutTimeDom.innerText = 0;
				currentTimesDom.innerText = timesCount; //n 세트 진행 중
			}
			secondCount = 0;
		} else {
			//step1.1 설정 세트 시간을 못 채운 경우
			currentWorkoutTimeDom.innerText = secondCount; //한 세트의 진행시간
		}
	}, 10);
}

export function setWorkoutPlayToolbar() {
	//운동실행화면[툴바]
	const workoutPlayToolbarDom = document.getElementById('workoutPlayToolbar');
	//운동 루틴, 운동 data
	const { workoutPlayRoutine, workoutPlayList } = getWorkoutPlayData();
	/*
    # 운동실행화면[툴바] 요구사항
      1.전체운동시간 설정
      2.진행시간 설정
  */
	// 1.전체운동시간 설정
	const { minute: workoutMinute, leftSecond: workoutLeftSecond } = getWorkoutTotalTime(workoutPlayRoutine.index);

	const formatStringWorkoutMinute = workoutMinute.toString();
	const formatStringWorkoutLeftSecond = workoutLeftSecond.toString();

	const formatTimeWorkoutMinute = formatStringWorkoutMinute.padStart(2, '0');
	const formatTimeWorkoutLeftSecond = formatStringWorkoutLeftSecond.padStart(2, '0');

	const workoutPlayToolbarTemplate = `
    <span id="currentTime">
      <span id="currentMinute">00</span>
      <span>:</span>
      <span id="currentSecond">00</span>
    </span> 
    /
    <span id="totalTime">
      ${formatTimeWorkoutMinute} : ${formatTimeWorkoutLeftSecond}
    </span>
  `;

	const workoutPlayToolbarDomList = new DOMParser().parseFromString(workoutPlayToolbarTemplate, 'text/html').body
		.childNodes;

	[ ...workoutPlayToolbarDomList ].forEach((node) => {
		workoutPlayToolbarDom.appendChild(node);
	});

	/*
    # 2. 진행시간 설정
    
    1. 비교 leftSecond, leftSecondCount
      1.1 leftSecond === leftSecondCount
      1.2 leftSecond !== leftSecondCount

    2. 비교 totalMinute, totalMinCount
      2.1 totalMinute === totalMinCount
      2.2 totalMinute !== totalMinCount
  */
	const currentMinuteDom = document.getElementById('currentMinute');
	const currentSecondDom = document.getElementById('currentSecond');
	let leftSecondCount = 0;
	let totalMinuteCount = 0;
	let formatString;
	toolbarIntervalReturn = setInterval(() => {
		// 일시정지
		if (pauseFlag) {
			return false;
		}

		//끝나는 조건
		if (workoutMinute == totalMinuteCount && workoutLeftSecond == leftSecondCount) {
			clearInterval(toolbarIntervalReturn);
			return false;
		}
		if (59 == leftSecondCount++) {
			//1.1 leftSecond === leftSecondCount
			if (workoutMinute == totalMinuteCount++ && workoutMinute != 0 && workoutLeftSecond != leftSecondCount) {
				//2.1 totalMinute === totalMinCount
				formatString = totalMinuteCount.toString();
				currentMinuteDom.innerText = formatString.padStart(2, '0');
			} else {
				//2.2 totalMinute !== totalMinCount
				leftSecondCount = 0;
				// const initLeftSecondCount = 0;
				formatString = leftSecondCount.toString();
				currentSecondDom.innerText = formatString.padStart(2, '0');

				formatString = totalMinuteCount.toString();
				currentMinuteDom.innerText = formatString.padStart(2, '0');
			}
		} else {
			//1.2 leftSecond !== leftSecondCount
			formatString = leftSecondCount.toString();
			currentSecondDom.innerText = formatString.padStart(2, '0');
		}
	}, 10);
}

export function setWorkoutPlayList() {
	//운동 리스트 컨테이너
	const targetWorkoutPlayListContainerDom = document.getElementById('targetWorkoutPlayListContainer');
	//운동 루틴, 운동 data
	const { workoutPlayRoutine, workoutPlayList } = getWorkoutPlayData();
	/**
   * # 1. 운동실행화면 - 운동목록 list
   */
	//## 1.1 workoutPlayList template
	const workoutPlayListTemplate = `
    <div data-index="{{index}}" data-workout-index="{{workoutIndex}}" 
      data-routine-index="{{workoutRoutineIndex}}" class="workoutPlay">
      <span data-index="{{index}}" data-workout-index="{{workoutIndex}}" 
        data-routine-index="{{workoutRoutineIndex}}" class="workoutTitle">
        {{workoutTitle}} [ {{workoutSecond}}초 {{workoutTimes}}세트 ]
      </span>
    </div>
  `;

	//## 1.2 workoutPlayList dom 생성
	const workoutPlayListDom = workoutPlayList
		.map((v) => {
			return workoutPlayListTemplate
				.replace(/\{\{index\}\}/g, v.index)
				.replace(/\{\{workoutIndex\}\}/g, v.workoutIndex)
				.replace(/\{\{workoutRoutineIndex\}\}/g, v.workoutRoutineIndex)
				.replace('{{workoutTitle}}', v.title)
				.replace('{{workoutSecond}}', v.second)
				.replace('{{workoutTimes}}', v.times);
		})
		.join('');

	const workoutPlayListDomTempate = new DOMParser().parseFromString(workoutPlayListDom, 'text/html').body.childNodes;

	//## 1.3 render(append)
	renderDomList(targetWorkoutPlayListContainerDom, workoutPlayListDomTempate);

	// workoutPlayListUpdate 작업1
	targetWorkoutPlayListContainerDom.firstElementChild.classList += ' highlight';
	/**
   * # 2. 운동실행화면 - 운동목록 즉시 시작
   * 2.1 첫번째 운동목록
   * 2.2 운동 종류 바뀌면 hight 이동
   * 2.3 완료된 운동 텍스트 색 다르게 표시
   */
}

export function workoutPlayPause() {
	pauseFlag = true;
}
export function workoutPlayRestart() {
	pauseFlag = false;
}
export function workoutPlayStop() {
	// clear setInterval
	clearInterval(headerIntervalReturn);
	clearInterval(toolbarIntervalReturn);

	// move to main page
	workoutMainPage();
}
// workoutPlayListUpdate
function workoutPlayItemUpdate() {
	// 운동 리스트 컨테이너
	const targetWorkoutPlayListContainerDom = document.getElementById('targetWorkoutPlayListContainer');
	const workoutPlayListDom = document.getElementById('workoutPlayList');

	// highlight update
	const children = [ ...targetWorkoutPlayListContainerDom.children ];
	let i;
	for (i = 0; i < children.length - 1; i++) {
		const child = children[i];
		const childClassList = [ ...child.classList ];
		const hasHighlight = childClassList.some((v) => v == 'highlight');

		if (!!hasHighlight) {
			// highlight 이동
			// 완료 운동 아이템 글자색 변경
			let newChildClassList = childClassList.filter((v) => v != 'highlight');
			newChildClassList.push('doneItem');
			child.classList = newChildClassList.join(' ');

			children[i + 1].classList += ' highlight';

			workoutPlayListDom.scrollTop += child.offsetHeight;

			return false;
		}
	}
}
