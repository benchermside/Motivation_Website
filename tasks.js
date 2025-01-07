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


const tasks = [teethTask];


function openTasks(){
    /**
     * runs when tasks bar opened
    */
    console.log("opened");//delete em
    const taskDisplays = document.createElement("div");
    taskDisplays.classList.add("taskSection");
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
        const currTaskButton = document.createElement("button");
        currTaskButton.innerText = "finish task";
        currTaskButton.onclick = null;//FIX ME, wright code that updates your current task
        thisTask.appendChild(currTaskButton);
        const currNameElem = document.createElement("div");
        currNameElem.innerText = taskToDisplay.name;
        thisTask.appendChild(currNameElem);
        taskDisplays.appendChild(thisTask);
    }

}



