window.onload = bindEvents();
// create clock
window.onload =
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    m = checkTime(m);
    s = checkTime(s);
    if(h > 12){
      h = h - 12;
    }
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    const t = setTimeout(startTime, 500);

}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}
//get date
let today = new Date();
const dd = today.getDate();
let mm = today.getMonth()+1;
const yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}
today = mm + '/' + dd + '/' + yyyy;
document.getElementById('main_date').innerHTML = today;


const popout = document.getElementById('menu_popout');
const backGroundBlur = document.getElementById('background_blur');
const newTaskGui = document.getElementById('creat_new_task_interface');

// expose popout menu
function showPopout(){
  popout.style.left = "0";
  backGroundBlur.style.display = "block";
}

function hidepopout(){
    popout.style.left = "-85%";

    if(newTaskGui.style.display != 'block'){
      backGroundBlur.style.display = "none";
    }
  }
  //close new task creation screen
  function hideNewTaskGui(){
    backGroundBlur.style.display = "none";
    newTaskGui.style.display = "none";
  }

  function openNewTaskGui(){
    backGroundBlur.style.display = "block";
    newTaskGui.style.display = "block";
    popout.style.left = "-85%";
  }

  //Clear enitre list of tasks
  function removeAllTasks(){
    taskList.innerHTML = "";

  }

// toggle hidden details in task item
function showDetails(event){
  const details = event.target.nextElementSibling;
  const caret = event.target.previousElementSibling;

    if (event.target && event.target.className == 'details_toggle')
    {
      if (details.style.opacity != "10")
      {
        details.style.opacity = '10';
        caret.className = "close_details_icon";
      }
      else
      if (details.style.opacity = "10")
      {
      details.style.opacity = '0';
      caret.className = "show_details_icon";
      }
  }
}

// wrapped remove task function in a named function to  be called each time a new task is created
function bindEvents(){

const roundThings = document.querySelectorAll('.round_thing');
const deleteButtons = document.querySelectorAll('.delete_toggle');
const completeButtons = document.querySelectorAll('.complete_toggle');

//remove task if rounthing is clicked on
  for(let i=0;i<roundThings.length;i++){
    const task = this.previousElementSibling;

    roundThings[i].addEventListener('click', function(){
      this.classList.add('is_open');

  })
  roundThings[i].addEventListener('mouseleave', function(){
      this.classList.remove('is_open');

  })

  deleteButtons[i].addEventListener('click', function(){
    roundThings[i].parentNode.remove();
  })
  completeButtons[i].addEventListener('click', function(){
    roundThings[i].parentNode.classList.add('completed');
  })
  }
}



function submitNewTask(){
  const newTitle = document.getElementById('new_title');
  const newDate = document.getElementById('new_date');
  const newDescription = document.getElementById('new_description');
    hideNewTaskGui();

taskList.insertAdjacentHTML("afterBegin", `


  <div class="task_item">
    <p class="completed_check">Task Complete &checkmark;</p>

    <div class="round_thing">
    <div class="label_container">
      <span>Delete</span>
      <span>or</span>
      <span>Complete</span>
    </div>
    <button class="complete_toggle"></button>
    <button class="delete_toggle"></button>
    </div>

    <p id="task_date"><strong>Date entered: </strong><i>1/12/2018</i></p>
    <p id="task_name"><strong>Task Name: </strong><i>${newTitle.value}</i></p>
    <p class="task_details_tip">(click to open)</p>
    <div class="show_details_icon">
      <div class="detail_toggle_line"></div>
      <div class="detail_toggle_line"></div>
      <div class="detail_toggle_line"></div>
    </div>

    <p class="details_toggle">Details</p>
    <div class="task_details_p" style="opacity: 0">

    <p id="details_p">${newDescription.value}</p>

    </div>
  </div>

`);
}

const cancelCreation = document.getElementById('cancel_creation');
const hamburgerMenu =  document.getElementById('hamburger_menu');
const createNewTask = document.getElementById('create_task_button');
const createSubmit = document.getElementById('new_submit');
const removeAll = document.getElementById('remove_all');
const taskList = document.getElementById('task_list_container');

removeAll.addEventListener('click', removeAllTasks);
createNewTask.addEventListener('click', openNewTaskGui);
hamburgerMenu.addEventListener('click', showPopout);
popout.addEventListener('mouseleave', hidepopout);

//for touch devices
popout.addEventListener('touchleave', hidepopout);
cancelCreation.addEventListener('click', hideNewTaskGui);

document.addEventListener('click', showDetails)

createSubmit.addEventListener('click', function(){
  submitNewTask();
  bindEvents();

});
