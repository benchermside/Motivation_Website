let openPage = "none";//the page you currently have open as a string, can be "none", "rewards", "tasks", "calendar", "calendar weekly", "calendar monthly"
let userName;
let currSesionToken;//this varable will eventaly be set to the session token that must be sent to the PHP in order to athenticate updating task list

function main(){
    console.log("started program");
    console.log("testLog");    
    const ServerInfo = document.getElementById("phpInfo");
    if(ServerInfo !== undefined){
        const sent = ServerInfo.innerText;
    }
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

