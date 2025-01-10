
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
    let monthRow;
    while (numDays <= monthSize){
        monthRow = document.createElement("div");
        monthRow.classList.add("monthlyRowHolder");
        entireCalendarHolder.appendChild(monthRow);
        for(let weekDayIndex=0; weekDayIndex<7; weekDayIndex++){
            let dayHolder = document.createElement("div");
            dayHolder.classList.add("monthDay");
            if (0<numDays && numDays<=monthSize){
                dayHolder.innerText = `${numDays}`
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