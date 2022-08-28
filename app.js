let input = document.getElementById('userinput')

let addButton = document.querySelector('.btn-primary')

let tasksDiv = document.querySelector('.tasks')

let deletebtn = document.querySelectorAll('.bi-trash-fill') 

//array to store the tasks
let arrayofTasks = [];

//check if local storage is empty

if (localStorage.getItem("tasks")){
    arrayofTasks = JSON.parse(localStorage.getItem('tasks'))
    let data = JSON.parse(localStorage.getItem('tasks'))
    getTasksFromLocalstorage()
}
// get tasks from local storage and adding them to page

//getTasksFromLocalstorage()

//add task

addButton.addEventListener('click',()=>{
    if (input.value !== ""){
        addTaskToArray(input.value)// add task to array
        input.value = ''
        addsuccefully()
    }else{
        emptyinput()
    }
    
});
//remove task 
tasksDiv.addEventListener('click',(e)=>{
    if (e.target.classList.contains('del')){
        //remove from local storage
        deletefromlocalstorage(e.target.parentElement.getAttribute("id"))
        //remove from page
        e.target.parentElement.remove();
        
    }
})


//!functions 

function addTaskToArray(task){
    // task data
    const taskData = {title : task  , id : Date.now()}

    arrayofTasks.push(taskData)
    //add tasks to the page
    addTaskstoPage(arrayofTasks);
    //add task to local storage
    addTasktoLocalstorage(arrayofTasks)
}

function addTaskstoPage(arrayofTasks){
    //empty the tasks div
     tasksDiv.innerHTML = ''
    //looping on the tasks array
    arrayofTasks.forEach((taskData)=>{
        let line = document.createElement('div')
        line.classList.add("form-check")
        line.classList.add("line")
        line.classList.add("mt-3")
        line.setAttribute("id",taskData.id)
        line.innerHTML = `<label class="form-check-label" for="flexCheckChecked" class="label">
            ${taskData.title}
            </label>
            <span class='del'>
            delete
            </span>`
        tasksDiv.append(line)
    })
}

function addTasktoLocalstorage(arrayofTasks){
    window.localStorage.setItem('tasks',JSON.stringify(arrayofTasks))
}

function getTasksFromLocalstorage(){
    let data = JSON.parse(localStorage.getItem('tasks'))
    addTaskstoPage(data)
}

//deleting task from local storage
function deletefromlocalstorage(taskId) {
  arrayofTasks = arrayofTasks.filter ((task) => task.id != taskId);
  addTasktoLocalstorage(arrayofTasks);
  }

//warning empty input

function emptyinput(){
    let invalid = document.getElementById('invalid')
    invalid.classList.add("text-danger")
    invalid.innerHTML = 'Make sure to add a task'
    setTimeout(()=>{
        invalid.innerHTML = ''
    },1300)
}

// task has been added addsuccefully()

function addsuccefully(){
    let invalid = document.getElementById('invalid')
    invalid.className = "text-success"
    invalid.classList.add("text-center")
    invalid.classList.add("my-3")


    invalid.innerHTML = 'Task has been added successfully'
    setTimeout(()=>{
        invalid.innerHTML = ''
    },1300)
}
