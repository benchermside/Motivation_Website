const tasks = [];


function openTasks(){
    /**
     * runs when tasks bar opened
    */
    console.log("opened");//delete em
    const taskDisplays = document.createElement("div");
    taskDisplays.classList.add("taskSection")
    const body = document.getElementById("body");
    body.appendChild(taskDisplays);

}



