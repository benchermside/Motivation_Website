function openRewards(){
    /* opens reward page*/
    deleatOpenPage();
    const body = document.getElementById("body");
    opnePage = "rewards";
    console.log("called");
    const wheelToSpin = document.createElement("div");
    wheelToSpin.classList.add("wheelToSpin");
    body.appendChild(wheelToSpin);
    const numLines = 12
    let degList = []
    for (i=0; i<numLines; i++){
        const thisLine = document.createElement("div");
        thisLine.classList.add("line");
        wheelToSpin.appendChild(thisLine);
        thisLine.style.rotate = `${(360/numLines)*i}deg`;
    }
    const wheelClient = wheelToSpin.getBoundingClientRect();
    const imageFromCenterLength = ((wheelClient.right - wheelClient.left)/2)*0.8;
    const halfWeelLength = (wheelClient.right - wheelClient.left)/2;
    const bodyRect = body.getBoundingClientRect();
    const docHeight = bodyRect.bottom - bodyRect.top;
    const halfImageHeight = Math.floor((docHeight*.08)/2);
    console.log(`${halfImageHeight} is height`);
    for (i=0; i<numLines; i++){
        const thisImage = randomImage();
        thisImage.classList.add("image");
        wheelToSpin.appendChild(thisImage);
        thisImage.style.left = `${halfWeelLength - halfImageHeight + (imageFromCenterLength*Math.cos(((Math.PI*2)/(numLines*2)) +(((i*360)/numLines)*(Math.PI/180))))}px`;
        thisImage.style.top = `${halfWeelLength - halfImageHeight + (imageFromCenterLength*Math.sin((((Math.PI*2)/(numLines*2)))+(((i*360)/numLines)*(Math.PI/180))))}px`;        
        degList.push({degrees: ((360/numLines)*i), image: thisImage.src})
    }
    console.log(degList);
    const arrow = document.createElement("div");
    arrow.classList.add("arrow")
    body.appendChild(arrow);
    const cont = document.createElement("div");
    cont.classList.add("cont");
    body.appendChild(cont);
    cont.appendChild(arrow);
    cont.appendChild(wheelToSpin);

    wheelToSpin.id = "wheelToSpin";
    window.onresize = function(){ 
        openRewards();
        console.log("called onresize");
    }
    const containSpin = document.createElement("div");
    containSpin.classList.add("containSpin");
    containSpin.appendChild(cont);
    body.appendChild(containSpin);
    containSpin.id = "containSpin"
    displayCaseFunction();
    // wheelToSpin.appendChild(arrow);
    // containSpin.appendChild(cont);
    wheelToSpin.addEventListener("click", function(){
        wheelToSpin.classList.remove("runAnimation");
        void wheelToSpin.offsetWidth;
        wheelToSpin.classList.add("runAnimation");
        /*citation for lines 45-48: 
            Title: answer to StackOverflow question: CSS Animation onClick
            Author: sad comrade
            Date: October 12, 2019
            Code Version: 1.0
            Link: https://stackoverflow.com/a/58353279 */
        const randomDegree = (Math.floor(Math.random()*180))*2 + 361 
        console.log(randomDegree)
        wheelToSpin.style.setProperty("--rotation-deg", randomDegree + "deg");
        setTimeout(() => {
            const thisDegree = randomDegree - 360 
            for (let i=0; i<(numLines); i++){
                if(thisDegree<degList[(i+1)%12].degrees&&thisDegree>=degList[i].degrees){
                    const wonImage = document.createElement("img");
                    if (i<=8){
                        const displayCase = document.getElementById("displayCase");
                        const I = Math.abs((8-i));
                        wonImage.src = degList[I].image;
                        console.log(degList[i])
                        console.log(degList[I]);
                        wonImage.id = "wonImage"
                        body.appendChild(wonImage);
                        wonImage.classList.add("winner");
                        // containSpin.appendChild(wonImage);
                        if(wonImage.src.includes("again")){
                            wonImage.remove();
                        }
                        else{
                            wonImage.classList.add("displayWinner");
                            displayCase.appendChild(wonImage);
                        }
                        break
                    }
                    else if(i>8){
                        const displayCase = document.getElementById("displayCase");
                        const I = Math.abs(20-i);
                        wonImage.src = degList[I].image;
                        console.log(degList[i])
                        console.log(degList[I]);
                        wonImage.id = "wonImage"
                        body.appendChild(wonImage);
                        wonImage.classList.add("winner");
                        // containSpin.appendChild(wonImage);
                        if(wonImage.src.includes("again")){
                            wonImage.remove();
                        }
                        else{
                            wonImage.classList.add("displayWinner");
                            displayCase.appendChild(wonImage);
                        }
                        break
                    } 
                }
                else if (i===numLines-1) {
                    const displayCase = document.getElementById("displayCase");
                    const wonImage = document.createElement("img");
                    let I = Math.abs((20-i));
                    wonImage.src = degList[I].image;
                    console.log(degList[i])
                    console.log(degList[I]);
                    wonImage.id = "wonImage"
                    body.appendChild(wonImage);
                    wonImage.classList.add("winner");
                    // containSpin.appendChild(wonImage);
                    if(wonImage.src.includes("again")){
                        wonImage.remove();
                    }
                    else{
                        wonImage.classList.add("displayWinner");
                        displayCase.appendChild(wonImage);
                    }
                }
            }
            // setTimeout(()=>{
            //     if(wonImage.src.includes("try again")){
            //         wonImage.remove();
            //     }
            //     else{
            //         wonImage.classList.add("displayWinner");
            //     }
            // }, 3500)
           
        }, 5000)
      
    })
    
}



function randomImage(){
    const imageIndex = Math.floor(Math.random()*(filePaths.length));
    let thisImage = document.createElement("img");
    thisImage.src = filePaths[imageIndex];
    return thisImage
}

function displayCaseFunction(){
    const displayCase = document.createElement("div");
    displayCase.id = "displayCase"
    displayCase.classList.add("displayCase");
    body.appendChild(displayCase);
    const containSpin = document.getElementById("containSpin")
    containSpin.appendChild(displayCase);
    // displayCase.appendChild(document.getElementById("wonImage"));
}

