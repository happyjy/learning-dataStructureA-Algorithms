// 운동 루틴 목록 List dummy data setting start
const workoutRoutineListDummyData = JSON.parse(localStorage.getItem('workoutRoutineListDummyData')) || [];
const workoutListDummyData = JSON.parse(localStorage.getItem('workoutListDummyData')) || [];

// init setting LocalStorage
if (!localStorage.getItem('workoutRoutineListDummyData')) {
	for (let i = 0; i < 30; i++) {
		let date = new Date();
		const regDate = date.setSeconds(i);
		workoutRoutineListDummyData.push({
			index: `${i}`,
			title: `운동루틴 ${i}`,
			regDate: regDate,
			updateDate: regDate
		});
	}

	setLocalStorage('workoutRoutineListDummyData', workoutRoutineListDummyData);
}

if (!localStorage.getItem('workoutListDummyData')) {
	let workoutListDummyDataIndex = 0;
	for (let i = 0; i < 30; i++) {
		for (let j = 0; j < 20; j++) {
			let date = new Date();
			const regDate = date.setSeconds(i);
			workoutListDummyData.push({
				index: `${workoutListDummyDataIndex++}`,
				workoutIndex: `${j}`,
				workoutRoutineIndex: `${i}`,
				title: `운동 종류 ${i} - ${j}`,
				second: Math.round(Math.random() * 100),
				times: Math.round(Math.random() * 10),
				regDate: regDate,
				updateDate: regDate
			});
		}
	}

	setLocalStorage('workoutListDummyData', workoutListDummyData);
}

let workoutRoutineList = workoutRoutineListDummyData;
let workoutList = workoutListDummyData;

// data workout routine, workout
export { workoutRoutineList, workoutList };

const setWorkoutRoutineList = (data) => {
	workoutRoutineList = data;
	setLocalStorage('workoutRoutineListDummyData', data);
};
const setWorkoutList = (data) => {
	workoutList = data;
	setLocalStorage('workoutListDummyData', data);
};

// update data workout routine, workout
export { setWorkoutRoutineList, setWorkoutList };

/**
 * 운동 실행 데이터 설정
 */
let workoutPlayData = {};
export function setWorkoutPlayData({ workoutPlayRoutine, workoutPlayList }) {
	workoutPlayData = { workoutPlayRoutine, workoutPlayList };
}

export function getWorkoutPlayData() {
	return workoutPlayData;
}

export function setLocalStorage(key, workoutRoutineListDummyData) {
	localStorage.setItem(key, JSON.stringify(workoutRoutineListDummyData));
}
