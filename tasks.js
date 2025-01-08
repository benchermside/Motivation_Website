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
    name:"brush teeth",
    frequency: "daily"
}
const roomClean = {
    name:"clean room",
    frequency: "daily"
}
const drinkWater = {
    name:"drink 8oz water",
    frequency: "8x per day"
}

const tasks = [teethTask, roomClean, drinkWater];
const mostRecentNewTaskTimeSelection = null;

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
        const currDateElem = document.createElement("div");
        currDateElem.classList.add("aDate");
        currDateElem.innerText = taskToDisplay.frequency;
        thisTask.appendChild(currDateElem);
        taskDisplays.appendChild(thisTask);
        
    }
    

}


function addNewTask(){
    //console.log("started add new tasks");
    const createTaskElem = document.createElement("div");
    createTaskElem.classList.add("addNewTaskScreen");
    const enterName = document.createElement("input");
    enterName.id = "newTaskName";
    const enterNameText = document.createElement("div");
    enterNameText.innerText = "enter taks name:";
    const firstRow = document.createElement("div");
    firstRow.classList.add("addNewTaskScreenRow");
    firstRow.appendChild(enterNameText);
    firstRow.appendChild(enterName);
    createTaskElem.appendChild(firstRow);
    const buttonHolder = document.createElement("div");//This could also be called secondRow
    buttonHolder.classList.add("addNewTaskScreenRow");
    const taskFrequencyText = document.createElement("div");
    taskFrequencyText.innerText = "taks frequency";
    buttonHolder.appendChild(taskFrequencyText);
    const dalyButton = document.createElement("button");
    dalyButton.innerText = "daily";
    dalyButton.id = "makeDailyTaskButton";
    dalyButton.onclick = () => {
        mostRecentNewTaskTimeSelection = "daily";
        const daly = document.getElementById("makeDailyTaskButton");
        daly.setAttribute("style", "background-color:green;");
        const weekly = document.getElementById("makeWeeklyTaskButton");
        weekly.setAttribute("style", "background-color:#8A8B8C;");
        const onetime = document.getElementById("makeOnetimeTaksButton");
        onetime.setAttribute("style", "background-color:#8A8B8C;");
    }
    buttonHolder.appendChild(dalyButton);
    const weeklyButton = document.createElement("button");
    weeklyButton.id = "makeWeeklyTaskButton";
    weeklyButton.onclick = () => {
        mostRecentNewTaskTimeSelection = "weekly";
        const daly = document.getElementById("makeDailyTaskButton");
        daly.setAttribute("style", "background-color:#8A8B8C;");
        const weekly = document.getElementById("makeWeeklyTaskButton");
        weekly.setAttribute("style", "background-color:green;");
        const onetime = document.getElementById("makeOnetimeTaksButton");
        onetime.setAttribute("style", "background-color:#8A8B8C;");
    }
    buttonHolder.appendChild(weeklyButton);
    weeklyButton.innerText = "weekly";
    const oneTimeButton = document.createElement("button");
    oneTimeButton.id = "makeOnetimeTaksButton";
    oneTimeButton.onclick = () => {
        mostRecentNewTaskTimeSelection = "oneTime";
        const daly = document.getElementById("makeDailyTaskButton");
        daly.setAttribute("style", "background-color:#8A8B8C;");
        const weekly = document.getElementById("makeWeeklyTaskButton");
        weekly.setAttribute("style", "background-color:green;");
        const onetime = document.getElementById("makeOnetimeTaksButton");
        onetime.setAttribute("style", "background-color:#8A8B8C;");
    }
    buttonHolder.appendChild(oneTimeButton);
    oneTimeButton.innerText = "one Time";
    createTaskElem.appendChild(buttonHolder);
    const lastRow = document.createElement("div");
    const createTaskButton = document.createElement("button");
    createTaskButton.innerText = "create Task";
    lastRow.appendChild(createTaskButton);
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "cancel";
    lastRow.appendChild(cancelButton);

    createTaskElem.appendChild(lastRow);

    const body = document.getElementById("body");
    body.appendChild(createTaskElem);

}

function newTaskCreated(){
    /**
     * runs the diologe for creating a new task
     */
    const newTask = {}
    const nameFeld = document.getElementById("newTaskName");
    const newTaskName = nameFeld.value;
    newTask.name = newTaskName;

}



function boxChecked(){
    /**
     * this function activates whenever the checkbox is checked,
     * it must be updated to do something in the future
     * it must work diffrently depending on if it was checked or unchecked.
     */
    console.log("boxChecked");
    
}

