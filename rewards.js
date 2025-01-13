function openRewards(){
    /* opens reward page*/
    deleatOpenPage();
    console.log("called");
    const wheelToSpin = document.createElement("div");
    wheelToSpin.classList.add("wheelToSpin");
    body.appendChild(wheelToSpin);
    const line1 = document.createElement("div");
    line1.classList.add("line1");
    wheelToSpin.appendChild(line1);

}
