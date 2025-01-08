//definition for a task object
//
//example
//newtaks = {
// name:"brushTeath",
// description:"brush my teath in the morning",
// compleated: false,
// repeats: "daily",
// start: 
// deadline: TBD,
// 
//}
const teethTask = {
    name:"brush Teeth",
}
const roomClean = {
    name:"clean room",
}
const drinkWater = {
    name:"drink 8oz water, repeat 8 times a day, which is 64oz",
}

const tasks = [teethTask, roomClean, drinkWater];


function openTasks(){
    /**
     * runs when tasks bar opened
    */
    console.log("opened");//delete em
    const taskDisplays = document.createElement("div");
    taskDisplays.classList.add("taskSection");
    const newTaskButton = document.createElement("button");
    newTaskButton.innerText = "add new task";
    newTaskButton.classList.add("newTaskButton");
    newTaskButton.onclick = addNewTask;
    taskDisplays.appendChild(newTaskButton);
    const allTasks = document.createElement("div");
    allTasks.classList.add("allTasks");
    taskDisplays.appendChild(allTasks);
    const dailyTask = document.createElement("div");
    dailyTask.classList.add("dailyTask");
    dailyTask.innerText = "Daily";
    allTasks.appendChild(dailyTask);
    const todayTask = document.createElement("div");
    todayTask.classList.add("todayTask");
    todayTask.innerText = "Today";
    allTasks.appendChild(todayTask);
    const futureTask = document.createElement("div");
    futureTask.classList.add("futureTask");
    futureTask.innerText = "Future";
    allTasks.appendChild(futureTask);
    if (tasks.length === 0){//message for when you have no tasks
        const noTaskMessage = document.createElement("div");
        noTaskMessage.classList.add("noTaskMessage");
        noTaskMessage.innerText = "You have no tasks, go add some.";
        taskDisplays.appendChild(noTaskMessage);
    }
    const body = document.getElementById("body");
    body.appendChild(taskDisplays);
    for(let i=0; i<tasks.length; i++){//loop thorugh all tasks and add to task list
        const taskToDisplay = tasks[i];
        const thisTask = document.createElement("div");
        thisTask.classList.add("aTaskDisplay");
        const currTaskButton = document.createElement("input");
        currTaskButton.type = "checkbox";
        currTaskButton.onchange = boxChecked;
        thisTask.appendChild(currTaskButton);
        const currNameElem = document.createElement("div");
        currNameElem.innerText = taskToDisplay.name;
        thisTask.appendChild(currNameElem);
        taskDisplays.appendChild(thisTask);
    }
    

}


function addNewTask(){
    console.log("started add new tasks");
    const createTaskElem = document.createElement("div");
    createTaskElem.classList.add("addNewTaskScreen");
    const enterName = document.createElement("input");
    const enterNameText = document.createElement("div");
    const buttonHolder = document.createElement("div");
    const taskFrequencyText = document.createElement("div");
    const dalyButton = document.createElement("button");
    const weeklyButton = document.createElement("button");
    const oneTimeButton = document.createElement("button");


}

function boxChecked(){
    /**
     * this function activates whenever the checkbox is checked,
     * it must be updated to do something in the future
     * it must work diffrently depending on if it was checked or unchecked.
     */
    console.log("boxChecked");
    
}

