function openRewards(){
    /* opens reward page*/
    deleatOpenPage();
    console.log("called");
    opnePage = "rewards";
    const wheelToSpin = document.createElement("div");
    wheelToSpin.classList.add("wheelToSpin");
    body.appendChild(wheelToSpin);
    // const line1 = document.createElement("div");
    // line1.classList.add("line");
    // const line2 = document.createElement("div");
    // line2.classList.add("line");
    const numLines = 12
    for (i=0; i<numLines; i++){
        const thisLine = document.createElement("div");
        thisLine.classList.add("line");
        wheelToSpin.appendChild(thisLine);
        thisLine.style.rotate = `${(360/numLines)*i}deg`;
    }
    // wheelToSpin.appendChild(line1);
    // wheelToSpin.appendChild(line2);
    wheelToSpin.id = "wheelToSpin"
    let element = document.getElementById("wheelToSpin");

    element.addEventListener("click", function(){
        element.classList.remove("runAnimation");
        void element.offsetWidth;
        element.classList.add("runAnimation");   
    })  
}


