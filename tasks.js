const tasks = [];


function openTasks(){
    /**
     * runs when tasks bar opened
    */
    console.log("opened");//delete em
    const taskDisplays = document.createElement("div");
    taskDisplays.classList.add("taskSection");
    if (tasks.length === 0){//message for when
        const noTaskMessage = document.createElement("div");
        noTaskMessage.innerText = "You have no tasks, go add some.";
        taskDisplays.appendChild(noTaskMessage);
    }

    const body = document.getElementById("body");
    body.appendChild(taskDisplays);

}



