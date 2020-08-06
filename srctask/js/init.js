import { initWorkoutRoutine } from './registWorkoutRoutineProcess';
import {
	registerWorkoutRoutine,
	registerWorkoutRoutineInputDom,
	workoutRoutineType,
	workoutRoutineEdit,
	workoutRoutineDelete
} from './workoutRoutinEvent';

import {
	showWorkoutInputNewMode,
	workoutdeleteBtn,
	saveWorkout,
	validation,
	cancleSaveWorkout,
	showWorkoutInputEditMode,
	startWorkout,
	workoutMainPage
} from './workoutEvent';

import { workoutPlayPause, workoutPlayRestart, workoutPlayStop } from './workoutPlayEvent';

// 데이터 초기화
initWorkoutRoutine();

const app = document.querySelector('#app');
app.addEventListener('click', function(e) {
	/**
   * workoutRoutine : 운동루틴등록화면
   * workout : 운동등록화면
   * workoutPlay : 운동실행화면
  */
	switch (e.target.id) {
		/**
     * workoutRoutine : 운동루틴등록화면
     */
		case 'registerWorkoutRoutine':
			registerWorkoutRoutine(e);
			break;

		//새 운동 루틴 1.선택 버튼
		case 'workoutRoutineType':
			workoutRoutineType(e);
			break;
		//새 운동 루틴 2.edit 버튼
		case 'workoutRoutineEdit':
			workoutRoutineEdit(e);

			break;
		//새 운동 루틴 3.delete 버튼
		case 'workoutRoutineDelete':
			workoutRoutineDelete(e);
			break;

		/**
     * workout : 운동등록화면
     */
		case 'newWorkoutBtn':
			showWorkoutInputNewMode(e);
			break;
		case 'workoutdeleteBtn':
			workoutdeleteBtn(e);
			break;
		// 운동 저장
		case 'saveBtnRegistWorkOutBtn':
			saveWorkout(e);
			break;
		//운동 저장 취소
		case 'cancelBtnRegistWorkOutBtn':
			cancleSaveWorkout(e);
			break;
		// 운동 수정
		case 'workoutEdit':
			showWorkoutInputEditMode(e);
			break;
		// 운동 시작
		case 'startWorkOutBtn':
			startWorkout(e);
			break;

		/**
     * workoutRoutine : 운동실행화면
     */
		case 'workoutPlayFooterPause':
			workoutPlayPause(e);
			break;
		case 'workoutPlayFooterRestart':
			workoutPlayRestart(e);
			break;
		case 'workoutPlayFooterStop':
			workoutPlayStop(e);
			break;
		case 'workoutPlayFooterDone':
			workoutMainPage(e);
			break;
		default:
			break;
	}
});

app.addEventListener('keypress', function(e) {
	switch (e.target.id) {
		//# workout routine
		case 'targetRegisterWorkoutRoutineInput':
			registerWorkoutRoutineInputDom(e);
			break;
		case 'workoutTitle':
		case 'workoutSecond':
		case 'workoutTimes':
			if (e.key === 'Enter') {
				saveWorkout(e);
			}
			break;
	}
});

app.addEventListener('focusout', function(e) {
	switch (e.target.id) {
		//# workout routine
		case 'workoutTitle':
		case 'workoutSecond':
		case 'workoutTimes':
			validation(e);
			break;
	}
});

app.addEventListener('keydown', function(e) {
	switch (e.target.id) {
		//# workout routine
		case 'workoutTitle':
		case 'workoutSecond':
		case 'workoutTimes':
			validation(e);
			break;
	}
});
