let openPage = "none";//the page you currently have open as a string, can be "none", "rewards", "tasks", "calendar", "calendar weekly", "calendar monthly"
const proudBeachURL = "https://motivationcentral-fne4aebpb9fgcpaf.eastus2-01.azurewebsites.net";// the URL of the page
const recivedUserInfo = {};

function main(){
    resize();
    getNumSpins();
    numOfSpins();
    const ServerInfo = document.getElementById("phpInfo");
    // if(ServerInfo !== undefined){
    //     const sent = ServerInfo.innerText;
    // }
    taskInfo();
    recivedUserInfo.userInfo = userInfo();
    rewardInfo();
    //numOfSpins();
}



function trueMod(topInt, bottomInt){
    /**
     * returns the true mathmatical mod of an int'
     * ASSUMRE THAT THE bottomInt is possitive
     * ASSUMES both are ints
     * so, 5mod2 is 1, 
     * and -10mod3 is 2, NOT 1
     */
    if(bottomInt>0){
        if (topInt>=0){
            return topInt%bottomInt;
        }
        else if(topInt < 0){
            let forResult = topInt;
            while(forResult < 0){
                forResult = forResult + bottomInt;
            }
            return forResult;
        }
    }
    else{
        console.log(`bottom int is less than 0, ${bottomInt} was passed in. This is currently an invalid argument`);
    }
}


function deleatOpenPage(finalbottomDivID="tabs"){
    /**
     * gets the most recently opened page and deleats it
     * optional finalBottomDivID will ensure that the div with that ID is left
     * defults to "tabs" if left blank
     * everything below is deleated
     */
    const tabsElem = document.getElementById(finalbottomDivID);
    let pageElem = tabsElem.nextElementSibling;
    while (!(pageElem === null)){
        pageElem.remove();
        pageElem = tabsElem.nextElementSibling;
    }
    mostRecentNewTaskTimeSelection = null;
}

function taskInfo(){
    let i = 0;
    let taskid = "task" + i;
    while (document.getElementById(taskid) != undefined || null){
        const newTask = {};
        const taskn = document.getElementById(taskid);
        newTask.id = i;
        newTask.serverID = taskn.attributes.taskID.nodeValue;
        newTask.frequency = taskn.attributes.frequency.nodeValue;
        newTask.time = taskn.attributes.time.nodeValue;
        newTask.date = taskn.attributes.date.nodeValue;
        newTask.day = taskn.attributes.day.nodeValue;
        newTask.name = taskn.attributes.taskName.nodeValue;
        newTask.lastComplete = taskn.attributes.lastComplete.nodeValue;
        tasks.push(newTask);
        i++;
        taskid = `task${i}`;
    }
}

function userInfo(){
    const userName = document.getElementById("userName").attributes.info.nodeValue;
    const token = document.getElementById("token").attributes.info.nodeValue;
    return{
        userName: userName,
        token: token,
    }
}
const yourImg = {};
function rewardInfo(){
    let i = 0;
    let imgid = `imgid${i}`;
    while (document.getElementById(imgid) != undefined && document.getElementById(imgid) != null){
        const currImageSRCObject = document.getElementById(imgid);
        const currImgSR = currImageSRCObject.attributes.info.nodeValue;//in future, we want to save these values so we know what images user has won
        yourImg[currImgSR] = currImgSR;
        i++;
        imgid = `imgid${i}`;
    }
}

function getNumSpins(){
    const numSpinsDiv = document.getElementById("numSpins");
    numSpins = Number(numSpinsDiv.attributes.info.nodeValue);
}

function resize(){
    console.log("called resize");
    window.onresize = function(){
        //should detect if user is on a phone or not
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            //pass/do nothing
        }
        else{
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
    }
}

function numOfSpins(){
    const numberOfSpins = document.createElement("div");
    let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
    numberOfSpins.innerText = spinsText;
    numberOfSpins.classList.add("nSpins");
    numberOfSpins.id = "spinNum"
    body.insertBefore(numberOfSpins, document.getElementById("tabs"));
}


