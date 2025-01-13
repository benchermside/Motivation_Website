function openRewards(){
    /* opens reward page*/
    deleatOpenPage();
    console.log("called");
    opnePage = "rewards";
    const wheelToSpin = document.createElement("div");
    wheelToSpin.classList.add("wheelToSpin");
    body.appendChild(wheelToSpin);
    const line1 = document.createElement("div");
    line1.classList.add("line1");
    wheelToSpin.appendChild(line1);
    wheelToSpin.id = "wheelToSpin"
    let element = document.getElementById("wheelToSpin");

    element.addEventListener("click", function(){
        element.classList.remove("runAnimation");
        void element.offsetWidth;
        element.classList.add("runAnimation");   
    })  
}


