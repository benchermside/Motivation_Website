function main(){
    console.log("started program");
}

function deleatOpenPage(){
    /**
     * gets the most recently opened page and deleats it
     */
    const tabsElem = document.getElementById("tabs");
    let pageElem = tabsElem.nextElementSibling;
    while (!(pageElem === null)){
        pageElem.remove();
        pageElem = tabsElem.nextElementSibling;
    }
}



