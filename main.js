let openPage = "none";//the page you currently have open as a string, can be "none", "rewards", "tasks", "calendar", "calendar weekly", "calendar monthly"


function main(){
    console.log("started program");
    // sighInLoad();
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



