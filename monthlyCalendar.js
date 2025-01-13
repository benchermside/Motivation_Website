
function getMonthDayNum(monthID, year){
    /**
     * returns the number of days in the month on the year(including leap days)
     * NOTE: monthID is indexed from 0, January is 0, december is 11
     */
    const normalYear = [31,28,31,30,31,30,31,31,30,31,30,31]
    if (monthID != 1){//if not febuary, is easy
        return normalYear[monthID];
    }
    else{//impliments leap years
        if(year%4 === 0 && (year%100 !== 0 || year%400 === 0)){
            return 29;
        }
        else{
            return 28;
        }
    }
}


function openMonthlyCalander(){
    openPage = "calendar monthly";
    const entireCalendarHolder = document.createElement("div");
    entireCalendarHolder.classList.add("monthlyCalanderHolder");

    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const monthWeekDayLableHolder = document.createElement("div");
    monthWeekDayLableHolder.classList.add("monthWeekDayLableHolder");
    for(let i=0; i<7; i++){
        const ThisWeekDayLable = document.createElement("div");
        ThisWeekDayLable.classList.add("monthWeekDayLable");
        ThisWeekDayLable.innerText = weekdays[i];
        monthWeekDayLableHolder.appendChild(ThisWeekDayLable);
    }
    entireCalendarHolder.appendChild(monthWeekDayLableHolder);

    const currTime = new Date();
    monthSize = getMonthDayNum(currTime.getMonth(), currTime.getFullYear());
    let numDays = 0;
    const currWeekDay = currTime.getDay();
    const currMonthDay = currTime.getDate();
    const dayFirstOfMonthOn = trueMod(currWeekDay - (trueMod(currMonthDay, 7)),7);//This is soppose to be the index(0-6->sunday-saturday) that the first of the current month is on
    console.log(dayFirstOfMonthOn);
    console.log(`numDays is ${numDays}`);
    numDays = numDays - dayFirstOfMonthOn;
    console.log(`numDay is ${numDays}`);
    console.log(numDays);
    const thisMonthTasks = [];
    const dailyTasks = [];
    const weeklyTasks = [];
    for (let taskIndex=0; taskIndex<tasks.length; taskIndex++){
        if(tasks[taskIndex].frequency === "daily"){
            dailyTasks.push(tasks[taskIndex]);
        }
        else if(tasks[taskIndex].frequency === "weekly"){
            weeklyTasks.push(tasks[taskIndex]);
        }
        else if(parseInt(tasks[taskIndex].date.substring(5,7))-1 === currTime.getMonth()){
            thisMonthTasks.push(tasks[taskIndex]);
        }
        
    }
    thisMonthTasks.sort(((a, b) => parseInt(a.date.substring(8,10)) - parseInt(b.date.substring(8,10))));
    let thisMonthTasksFurthersIndex = 0;
    let monthRow;
    while (numDays <= monthSize){
        monthRow = document.createElement("div");
        monthRow.classList.add("monthlyRowHolder");
        entireCalendarHolder.appendChild(monthRow);
        
        for(let weekDayIndex=0; weekDayIndex<7; weekDayIndex++){
            let dayHolder = document.createElement("div");
            dayHolder.classList.add("monthDay");
            if (0<numDays && numDays<=monthSize){
                dayHolder.id = `day${numDays}Holder`;
                dayHolder.innerText = `${numDays}`;
                let currFurthestIndex = thisMonthTasksFurthersIndex;
                while (currFurthestIndex < thisMonthTasks.length && parseInt(thisMonthTasks[currFurthestIndex].date.substring(8,10)) <= numDays){
                    if(parseInt(thisMonthTasks[currFurthestIndex].date.substring(8,10)) === numDays){
                        const toDisplay = displayOneTask(thisMonthTasks[currFurthestIndex]);
                        toDisplay.classList.add("cutoffTask");
                        toDisplay.firstChild.remove();
                        dayHolder.appendChild(toDisplay);
                    }
        
                    currFurthestIndex++;
                }
            
                for (let taskIndex=0; taskIndex<tasks.length; taskIndex++){
                    const currTask = tasks[taskIndex];
                    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                    if (currTask.frequency === "daily"){
                        const toDisplay = displayOneTask(currTask);
                        toDisplay.classList.add("cutoffTask");
                        toDisplay.firstChild.remove();
                        dayHolder.appendChild(toDisplay);
                    }
                    else if (currTask.frequency === "weekly" && weekdays[weekDayIndex]===currTask.day){
                        const toDisplay = displayOneTask(currTask);
                        toDisplay.classList.add("cutoffTask");
                        toDisplay.firstChild.remove();
                        dayHolder.appendChild(toDisplay);
                    }
                }
            
                const vewAllButton = document.createElement("button");
                vewAllButton.classList.add("vewAllTasksButton");
                const thisNumDays = numDays;
                vewAllButton.onclick = (() => viewAll(thisNumDays));
                dayHolder.appendChild(vewAllButton);
                vewAllButton.innerText = "view all";
            }
            if (numDays === currMonthDay){
                dayHolder.style.backgroundColor = "#67918b";//sets the color of the current day
            }
            
            monthRow.appendChild(dayHolder)
            numDays = numDays + 1;
        }
               
    
    }
    const body = document.getElementById("body");
    body.appendChild(entireCalendarHolder);
  
}

function viewAll(day){
    const clickedDayHolder = document.getElementById(`day${day}Holder`);
    clickedDayHolder.classList.add("clickedTaskDisplay");
    clickedDayHolder.lastChild.onclick = (() => normalView(day));
    clickedDayHolder.lastChild.innerText = "compressed view";
}

function normalView(day){
    const clickedDayHolder = document.getElementById(`day${day}Holder`);   
    clickedDayHolder.classList.remove("clickedTaskDisplay");
    clickedDayHolder.lastChild.onclick = (() => viewAll(day));
    clickedDayHolder.lastChild.innerText = "view all";
}


