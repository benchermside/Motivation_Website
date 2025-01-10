
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
    const dayFirstOfMonthOn = ((currWeekDay - (currMonthDay%7)))%7;//This is soppose to be the index(0-6->sunday-saturday) that the first of the current month is on
    numDays = numDays - dayFirstOfMonthOn;
    const thisMonthTasks = [];
    const dailyTasks = [];
    const weeklyTasks = [];
    console.log(`tasks are ${tasks}`);
    console.log(`tasks are ${tasks[0]}`);
    for (let taskIndex=0; taskIndex<tasks.length; taskIndex++){
        console.log(taskIndex);
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
                const vewAllButton = document.createElement("button");
                vewAllButton.classList.add("vewAllTasksButton");
                dayHolder.appendChild(vewAllButton);
                vewAllButton.innerText = "view all";
        }
            if (numDays === currMonthDay){
                dayHolder.style.backgroundColor = "#499C4C";//sets the color of the current day
            }
            
            monthRow.appendChild(dayHolder)
            numDays = numDays + 1;
        }
    }

    const body = document.getElementById("body");
    body.appendChild(entireCalendarHolder);

}

function pressViewAll(day){

}
