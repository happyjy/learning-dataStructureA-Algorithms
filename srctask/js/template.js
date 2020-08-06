const workoutRegisteTemplate = `<div class="workoutRegistContainer">
  <!-- 상단헤더 -->
  <div class="workoutRegistHeader"> 매일 운동 루틴 </div>

  <div class="workoutContainer">
    <!-- 운동루틴목록 컨테이너 -->
    <div class="workoutRoutineContentsContainer">
      <!-- 운동루틴목록 툴바 -->
      <div class="toolbarContainer">
        <div id="registerWorkoutRoutine" class="newWorkOutRoutineBtn">새 운동 루틴 +</div>
      </div>

      <!-- 운동루틴목록 -->
      <div class="workoutRoutineListContentsContainer">
        <div id="targetRegisterWorkoutRoutine" class="registWorkOutRoutineContainer">
          <input id="targetRegisterWorkoutRoutineInput" type="text" />
        </div>
        <!-- # update 되어야 할 부분 -->
        <div id="targetWorkoutRoutineListContainer" class="workoutRoutineListContainer">
        </div>
      </div>

    </div>

    <!-- 운동목록 컨테이너 -->
    <div class="workoutContentsContainer">
      <!-- 운동목록 툴바 -->
      <div class="toolbarContainer">
        <div class="toolbar">
          <div class="toolbarLeft">
            <div id="newWorkoutBtn" class="newWorkoutBtn"> + 운동 추가</div>
            <div id="workoutdeleteBtn" class="workoutdeleteBtn"> 삭제 </div>
          </div>
          <div class="toolbarRight">
            <span id="targetTotalTime" class="totalTime"></span>
          </div>
        </div>
      </div>

      <!-- 운동목록 리스트 컨테이너 -->
      <div class="workoutListContentsContainer">
        <div id="targetWorkoutListNestedContentsContainer" class="workoutListNestedContentsContainer">
          <div class="workoutListContainer">
            <!-- # update 되어야 할 부분 -->
            <!-- workout 목록 리스트-->
            <div id="targetWorkoutListContainer" class="workoutListNestedContainer">
            </div>
            <!-- 운동추가 -->
            <div id="registWorkOutContainer" class="registWorkOutContainer">
              <div class="registWorkOutHeader">
                <div class="registWorkOutHeaderLeft">
                  <span>이름</span>
                  <input id='workoutTitle' class="workoutInput w110" type="text" required />
                </div>

                <div class="registWorkOutHeaderRight">
                  <input id="workoutSecond" class="workoutInput" type="number" />
                  <span>초</span>
                  <input id="workoutTimes" class="workoutInput" type="number" />
                  <span>세트</span>
                </div>
              </div>
              <div class="registWorkOutFooter">
                <div id='saveBtnRegistWorkOutBtn' class="saveBtnRegistWorkOutBtn">저장</div>
                <div id='cancelBtnRegistWorkOutBtn' class="cancelBtnRegistWorkOutBtn">취소</div>
              </div>
            </div>
          </div>
        </div>
        <div id="startWorkOutBtn" class="startWorkOutBtn">운동 시작</div>
      </div>

    </div>
  </div>
</div>
</div>`;

const workoutRoutineTemplate = `<div data-index="{{index}}" class="workoutRoutine">
<span id="workoutRoutineType" data-index="{{index}}" class="workoutRoutineTitle">{{title}}</span>
<div data-index="{{index}}" class="workoutRoutineButtonContainer">
  <span data-index="{{index}}" class="workoutRoutineEditBtn">
    <img data-index="{{index}}" id="workoutRoutineEdit" class="icon" src="./img/editIcon.png" />
  </span>
  <span data-index="{{index}}" class="workoutRoutineDeleteBtn">
    <img data-index="{{index}}" id="workoutRoutineDelete" class="icon" src="./img/deleteIcon.png" />
  </span>
</div>
</div>`;

const workoutTemplate = `
<div data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}" class="workout">
  <span class="workoutContainerRight">
    <span data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}"> 
      <input data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}" type="checkbox"/>
    </span>
    <span data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}" class="workoutTitle">
      {{workoutTitle}} {{second}}초 {{times}}세트
    </span>
  </span>
  <span data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}" class="workoutContainerRight workoutIcon">
    <img data-index="{{index}}" data-workout-index="{{workoutIndex}}" data-routine-index="{{workoutRoutineIndex}}" id="workoutEdit" class="icon workoutEdit" src="./img/editIcon.png" />
  </span>
</div>
`;

export { workoutRegisteTemplate, workoutRoutineTemplate, workoutTemplate };
