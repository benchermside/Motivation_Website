function main(){
    console.log("started program");
}

function deleatOpenPage(){
    /**
     * gets the most recently opened page and deleats it
     */
    const tabsElem = document.getElementById("tabs");
    const pageElem = tabsElem.nextElementSibling;
    if (!(pageElem === null)){
        pageElem.remove();
    }
    else{
        console.log("noNextPageFound");
    }
}



