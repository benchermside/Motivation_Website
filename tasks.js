//definition for a task object
//
//example
//newtaks = {
// name:"brushTeath",
// repeats: "daily",
// deadline: TBD,
// time: 15:00 note, this is in military time
// date: 2025-02-01
// day: "monday"
// id: unique ID for each task(can be the same across diffrent users)
// serverID: ID used for task on server(currently optional) (currently never used)
//}

// const teethTask = {
//     name:"brush teeth",
//     frequency: "daily",
//     id: 0
// }
// const roomClean = {
//     name:"clean room",
//     frequency: "weekly",
//     day: "sunday",
//     id: 1,
// }
// const drinkWater = {
//     name:"drink 8oz water",
//     frequency: "daily",
//     id: 2,
// }

// const playpingpong = {
//     name: "play ping pong",
//     frequency: "one time",
//     date: "2025-01-09",
//     id: 3,
// }
// const morepingpong = {
//     name: "more ping pong",
//     frequency: "one time",
//     date: "2025-01-16",
//     id: 4,
// }

const tasks = [];
let mostRecentNewTaskTimeSelection = null;

let numSpins = 0;

function openTasks(){
    /**
     * runs when tasks bar opened
    */
    deleatOpenPage();
    openPage = "tasks";
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
        noTaskMessage.innerText = "You have no tasks. Go add some!";
        taskDisplays.appendChild(noTaskMessage);
    }
    const body = document.getElementById("body");
    body.appendChild(taskDisplays);
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currDate = new Date();
    const index = (currDate.getDay());
    const currDay = weekdays[index];
    const dateCal = currDate;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const numberOfSpins = document.createElement("div");
    let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
    numberOfSpins.innerText = spinsText;
    numberOfSpins.classList.add("nSpins");
    numberOfSpins.id = "spinNum"
    body.appendChild(numberOfSpins);
    for(let i=0; i<tasks.length; i++){//loop thorugh all tasks and add to task list
        const taskToDisplay = tasks[i];
        const thisTask = displayOneTask(taskToDisplay);
        // thisTask.classList.add("aTaskDisplay");
        // const currTaskButton = document.createElement("input");
        // currTaskButton.type = "checkbox";
        // currTaskButton.onchange = (() => boxChecked(thisTask));
        // thisTask.appendChild(currTaskButton);
        // const currNameElem = document.createElement("div");
        // currNameElem.innerText = taskToDisplay.name;
        // thisTask.appendChild(currNameElem);
        // const currDateElem = document.createElement("div");
        // currDateElem.classList.add("aDate");
        // currDateElem.innerText = taskToDisplay.frequency;
        // thisTask.appendChild(currDateElem);
        let thisTaskDate = new Date(taskToDisplay.date);
        if (taskToDisplay.time != null){
            // const currTimeElem = document.createElement("div");
            // currTimeElem.innerText = taskToDisplay.time;
            // thisTask.appendChild(currTimeElem);
            // thisTaskDate = new Date(taskToDisplay.date);
        }
        if(taskToDisplay.frequency==="daily"){
            dailyTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency==="one time" && thisTaskDate <= dateCal && thisTaskDate >= weekAgo){
            todayTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency==="one time" && thisTaskDate > dateCal){
            futureTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency==="weekly" && taskToDisplay.day===currDay){
            todayTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency==="weekly" && taskToDisplay.day!=currDay){
            futureTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency.includes("day" || "daily")){
            dailyTask.appendChild(thisTask)
        }
        
    }
    
    

}

function displayOneTask(task){
    const taskToDisplay = task;
    const thisTask = document.createElement("div");
    thisTask.classList.add("aTaskDisplay");
    const currTaskButton = document.createElement("input");
    currTaskButton.type = "checkbox";
    currTaskButton.onchange = (() => boxChecked(thisTask));
    thisTask.appendChild(currTaskButton);
    const currNameElem = document.createElement("div");
    currNameElem.innerText = taskToDisplay.name;
    thisTask.appendChild(currNameElem);
    const currDateElem = document.createElement("div");
    currDateElem.classList.add("aDate");
    currDateElem.innerText = taskToDisplay.frequency;
    thisTask.appendChild(currDateElem);
    const deleatTaskElem = document.createElement("button");
    deleatTaskElem.onclick = (() => deleateTask(task.id));
    const trashDisplayElem = document.createElement("img");
    trashDisplayElem.src = "trash.png";
    trashDisplayElem.classList.add("trashDisplayImage");
    deleatTaskElem.appendChild(trashDisplayElem);
    thisTask.appendChild(deleatTaskElem);
    if (taskToDisplay.time != null){
        const currTimeElem = document.createElement("div");
        currTimeElem.innerText = taskToDisplay.time;
        thisTask.appendChild(currTimeElem);
    }
    return thisTask;
}

function addNewTask(){
    const createTaskElem = document.createElement("div");
    createTaskElem.classList.add("addNewTaskScreen");
    createTaskElem.id = "newTaskScreen";
    const enterName = document.createElement("input");
    enterName.id = "newTaskName";
    enterName.classList.add("newTaskBox");
    enterName.maxLength = "100";
    const enterNameText = document.createElement("div");
    enterNameText.innerText = "enter task name:";
    enterNameText.classList.add("newTaskText");
    const firstRow = document.createElement("div");
    firstRow.classList.add("addNewTaskScreenRow");
    firstRow.appendChild(enterNameText);
    firstRow.appendChild(enterName);
    createTaskElem.appendChild(firstRow);
    const buttonHolder = document.createElement("div");//This could also be called secondRow
    buttonHolder.id = "buttonHolder";
    buttonHolder.classList.add("addNewTaskScreenRow");
    const taskFrequencyText = document.createElement("div");
    taskFrequencyText.innerText = "task frequency:";
    taskFrequencyText.classList.add("newTaskText");
    buttonHolder.appendChild(taskFrequencyText);
    const dalyButton = document.createElement("button");
    dalyButton.innerText = "daily";
    dalyButton.id = "makeDailyTaskButton";
    dalyButton.onclick = () => {
        if (mostRecentNewTaskTimeSelection !== "daily"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            const createTaskElem = document.getElementById("newTaskScreen");
            mostRecentNewTaskTimeSelection = "daily";
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#55b6bd;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#d0dbda;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#d0dbda;");
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            enterTimeText.classList.add("newTaskText");
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
        }
    }
    buttonHolder.appendChild(dalyButton);
    const weeklyButton = document.createElement("button");
    weeklyButton.id = "makeWeeklyTaskButton";
    weeklyButton.onclick = () => {//trigers when the weekbutton is pressed
        if (mostRecentNewTaskTimeSelection !== "weekly"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            mostRecentNewTaskTimeSelection = "weekly";
            const createTaskElem = document.getElementById("newTaskScreen");
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#d0dbda;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#55b6bd;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#d0dbda;");
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            enterTimeText.classList.add("newTaskText");
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
            const daySelection = document.createElement("select");
            daySelection.classList.add("daySelectionMenu");
            const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
            const currDate = new Date();
            const dateIndex = (currDate.getDay());//
            const indexStart = 0;//index for starting with sunday
            let index = indexStart;
            for (let i=0; i<7;i++){
                const currDay = weekdays[index];
                const CurrOption = document.createElement("option");
                CurrOption.value = currDay;
                CurrOption.innerText = currDay;
                if (i === dateIndex){
                    CurrOption.selected = true;
                } 
                daySelection.appendChild(CurrOption);
                index = trueMod(index+1, 7);
            }
            daySelection.id = "weekOnDay";
            createTaskElem.insertBefore(daySelection, document.getElementById("lastCreateTaskRow"));
        }
    }
    buttonHolder.appendChild(weeklyButton);
    weeklyButton.innerText = "weekly";
    const oneTimeButton = document.createElement("button");
    oneTimeButton.id = "makeOnetimeTaksButton";
    oneTimeButton.onclick = () => {
        if (mostRecentNewTaskTimeSelection !== "one time"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            mostRecentNewTaskTimeSelection = "one time";
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#d0dbda;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#d0dbda;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#55b6bd;");
            const dateSelecter = document.createElement("input");
            dateSelecter.type = "date";
            dateSelecter.id = "dateSelecter";
            const dateSelecterDescription = document.createElement("label");
            dateSelecterDescription.innerText = "select task date:";
            dateSelecterDescription.classList.add("newTaskText");
            const dateRow = document.createElement("div");
            dateRow.classList.add("addNewTaskScreenRow");
            dateRow.appendChild(dateSelecterDescription);
            dateRow.appendChild(dateSelecter);
            const createTaskElem = document.getElementById("newTaskScreen");
            createTaskElem.insertBefore(dateRow, document.getElementById("lastCreateTaskRow"));
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            enterTimeElem.classList.add("timeElem")
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            enterTimeText.classList.add("newTaskText");
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
        }
        
    }
    buttonHolder.appendChild(oneTimeButton);
    oneTimeButton.innerText = "one time";
    oneTimeButton.classList.add("timeButton");
    dalyButton.classList.add("timeButton");
    weeklyButton.classList.add("timeButton");
    createTaskElem.appendChild(buttonHolder);
    const lastRow = document.createElement("div");
    lastRow.id = "lastCreateTaskRow"
    const createTaskButton = document.createElement("button");
    createTaskButton.innerText = "create task";
    createTaskButton.onclick = newTaskCreated;
    lastRow.appendChild(createTaskButton);
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "cancel";
    cancelButton.onclick = deleateAddNewTaskScreen;
    lastRow.appendChild(cancelButton);

    createTaskElem.appendChild(lastRow);

    const body = document.getElementById("body");
    body.appendChild(createTaskElem);
    cancelButton.classList.add("timeButton");
    createTaskButton.classList.add("timeButton");
    lastRow.classList.add("cancelCreate");

}



function newTaskCreated(){
    /**
     * runs the diologe for creating a new task
     */
    const newTask = {};
    const nameFeld = document.getElementById("newTaskName");
    const newTaskName = nameFeld.value;
    newTask.name = newTaskName;
    newTask.frequency = mostRecentNewTaskTimeSelection;
    let date;
    if (mostRecentNewTaskTimeSelection === "one time"){//update to include any event type with a date property
        date = document.getElementById("dateSelecter").value;
    }
    else{
        date = null;
    }
    let time;
    if(mostRecentNewTaskTimeSelection === "one time" || mostRecentNewTaskTimeSelection === "daily" || mostRecentNewTaskTimeSelection === "weekly"){
        time = document.getElementById("timeInputBox").value;
    }
    else{
        time = null;
    }
    let day;
    if(mostRecentNewTaskTimeSelection === "weekly"){
        day = document.getElementById("weekOnDay").value;
    }
    else{
        day = null;
    }
    newTask.date = date;
    newTask.time = time;
    newTask.day = day;
    newTask.id = tasks.length;//not garnted to be index in task list at the moment, may change latter
    tasks.push(newTask);
    deleateAddNewTaskScreen();
    openTasks();
    sendNewtaskToPHP(newTask);

}

function sendNewtaskToPHP(task){
    /**
     * sends the new task to the server
     * server will save new task
     */
    console.log("called add task");
    let data = new FormData();
    data.append('taskName', task.name);
    data.append('frequency', nullToString(task.frequency));
    data.append('date', nullToString(task.date));
    data.append('time', nullToString(task.time));
    data.append('day', nullToString(task.day));
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${proudBeachURL}addTask.php`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log("on ready state change called");
            console.log(xhr.response);
            console.log("that was the response");
        }
    };
    //xhr.setRequestHeader('newTask', task.name);
    xhr.send(data);
    //$.post("addTask.php", "task");
}

function nullToString(possNull){
    if(possNull === null){
        return "noData";
    }
    else{
        return possNull;
    }
}

function deleateAddNewTaskScreen(){
    /**
     * deleats the add new task screen
     */
    const newTaskScreen = document.getElementById("newTaskScreen");
    mostRecentNewTaskTimeSelection = null;
    newTaskScreen.remove();
}

function deleateTask(taskID){

    if(tasks.length > taskID && tasks[taskID].id === taskID){
        tasks.splice(taskID, 1);
        for(let toDecrease=taskID; toDecrease<tasks.length; toDecrease++){//this updates all taskID after the found one to work
            tasks[toDecrease].id = tasks[toDecrease].id - 1;
        }
    }
    else{//TO DO add code the decresses each subsequent taskID
        console.log("taskID is incorrect error");
        let lastTaskID;
        for(let taskIndex=0;taskIndex<tasks.length;taskIndex++){
            if(tasks[taskIndex].id === taskID){
                tasks.splice(taskIndex, 1);
                lastTaskID = taskIndex;
                break;
            }
        }
        for(let toDecrease=lastTaskID; toDecrease<taskIndex.length; toDecrease++){//this updates all taskID after the found one to work
            tasks[toDecrease].id = tasks[toDecrease].id - 1;
        }

    }
    if(openPage === "tasks"){
        openTasks();
    }
    else if(openPage === "calendar monthly"){
        openCalanderPage("monthly");
    }
    else if(openPage === "calendar weekly"){
        openCalanderPage("weekly");
    }
    else if(openPage === "rewards"){
        openRewards();
    }
    else{
    }
}

function deleatTaskOnServer(task){
    let data = new FormData();
    data.append('taskName', task.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${proudBeachURL}removeTask.php`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log("on ready state change called");
            console.log(xhr.response);
            console.log("that was the response");
        }
    };
    //xhr.setRequestHeader('newTask', task.name);
    xhr.send(data);
    //$.post("addTask.php", "task");

}


function boxChecked(thisTask){
    /**
     * this function activates whenever the checkbox is checked,
     * it must be updated to do something in the future
     * it must work diffrently depending on if it was checked or unchecked.
     */
    thisTask.classList.add("completedTask");
    numSpins++; 
    let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
    document.getElementById("spinNum").innerText = spinsText;
    completedTaskServer(thisTask);
    confetti();
}

function completedTaskServer(task){
    let data = new FormData();
    data.append('taskName', task.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${proudBeachURL}completeTask.php`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log("on ready state change called");
            console.log(xhr.response);
            console.log("that was the response");
        }
    };
    xhr.send(data);

}
