let openPage = "none";//the page you currently have open as a string, can be "none", "rewards", "tasks", "calendar", "calendar weekly", "calendar monthly"
const proudBeachURL = "https://proud-beach-4db7e7a5840e41dfb3e8472d567d9353.azurewebsites.net/";
const recivedUserInfo = {};

function main(){
    const ServerInfo = document.getElementById("phpInfo");
    // if(ServerInfo !== undefined){
    //     const sent = ServerInfo.innerText;
    // }
    taskInfo();
    recivedUserInfo.userInfo = userInfo();
    rewardInfo();
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
        newTask.serverID = taskn.taskID;
        newTask.frequency = taskn.frequency;
        newTask.time = taskn.time;
        newTask.date = taskn.date;
        newTask.day = taskn.day;
        newTask.name = taskn.taskName;
        newTask.lastComplete = taskn.lastComplete;
        tasks.push(newTask);
        i++;
        taskid = `task${i}`;
    }
}

function userInfo(){
    let userName = document.getElementById("userName").info;
    let token = document.getElementById("token").info;
    return{
        userName: userName,
        token: token,
    }
}
const yourImg = {}
function rewardInfo(){
    let i = 0;
    let imgid = "imgid" + i;
    while (document.getElementById(imgid) != undefined || null){
        const displImage = document.createElement("img");//TODO
        displImage.src = document.getElementById(imgid).info;//in future, we want to save these values so we know what images user has won
        document.getElementById("displayCase").appendChild(displImage);
        yourImg[displImage.src] = displImage.src
        i++;
        imgid = "imgid" + i;
    }
}

// function createDatabase(){
//     let data = new FormData();
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", `${proudBeachURL}/createTable.php`);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4 && xhr.status === 200){
//             console.log("on ready state change called");
//             console.log(xhr.response);
//             console.log("that was the responce");
//         }
//     };
//     xhr.send(data);
// }


// function getFromDatabase(){
//     let mysql = require('mysql');

//     let con = mysql.createConnection({
//       host: "localhost",
//       user: "bchermsi",
//       password: SQLpass,//will not work 
//     });
    
//     con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//     });
    
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         con.query("SELECT ", function (err, result) {
//         if (err) throw err;
//         console.log("Result: " + result);
//         });
//     });
  
// }

