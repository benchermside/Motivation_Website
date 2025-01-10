function main(){
    console.log("started program");
}

function deleatOpenPage(finalbottomDivID="tabs"){
    /**
     * gets the most recently opened page and deleats it
     * optional finalBottomDivID will ensure that the div with that ID is left
     * everything below is deleated
     */
    const tabsElem = document.getElementById(finalbottomDivID);
    let pageElem = tabsElem.nextElementSibling;
    while (!(pageElem === null)){
        pageElem.remove();
        pageElem = tabsElem.nextElementSibling;
    }
}



