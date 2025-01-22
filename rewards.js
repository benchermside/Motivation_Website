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
    // const halfImageHeight = Math.floor((docHeight*.08)/2);
    // console.log(`${halfImageHeight} is height`);
    for (i=0; i<numLines; i++){
        const thisImage = randomImage();
        thisImage.classList.add("image");
        wheelToSpin.appendChild(thisImage);
        const imageClient = thisImage.getBoundingClientRect();
        if ((imageClient.bottom-imageClient) === 8){
            const wheelClient = wheelToSpin.getBoundingClientRect();
            const imageFromCenterLength = ((wheelClient.right - wheelClient.left)/2)*0.8;
            return imageFromCenterLength
        }
        else if((imageClient.bottom-imageClient) === 4){
            const wheelClient = wheelToSpin.getBoundingClientRect();
            const imageFromCenterLength = ((wheelClient.right - wheelClient.left)/2)*0.6;
            return imageFromCenterLength
        }
        const halfImageHeight = Math.floor((imageClient.bottom-imageClient.top)/2);
        const halfImageWidth = Math.floor((imageClient.right-imageClient.left)/2);
        thisImage.style.left = `${halfWeelLength - halfImageWidth + (imageFromCenterLength*Math.cos(((Math.PI*2)/(numLines*2)) +(((i*360)/numLines)*(Math.PI/180))))}px`;
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
    const numberOfSpins = document.createElement("div");
    let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
    numberOfSpins.innerText = spinsText;
    numberOfSpins.classList.add("nSpins");
    numberOfSpins.id = "spinNum"
    body.appendChild(numberOfSpins);
    window.onresize = function(){ 
        openRewards();
        console.log("called onresize");
    }
    const containSpin = document.createElement("div");
    containSpin.classList.add("containSpin");
    containSpin.appendChild(cont);
    body.appendChild(containSpin);
    containSpin.id = "containSpin"
    wheelToSpin.id = "wheelToSpin"
    displayCaseFunction();
    // wheelToSpin.appendChild(arrow);
    // containSpin.appendChild(cont);
    wheelToSpin.addEventListener("click", function(){
        if (numSpins===0){
            wheelToSpin.classList.remove("runAnimation");
        }
        else{
            wheelToSpin.classList.remove("runAnimation");
            void wheelToSpin.offsetWidth;
            wheelToSpin.classList.add("runAnimation");
            /*citation for lines 57-59: 
                Title: answer to StackOverflow question: CSS Animation onClick
                Author: sad comrade
                Date: October 12, 2019
                Code Version: 1.0
                Link: https://stackoverflow.com/a/58353279 */
            const randomDegree = (Math.floor(Math.random()*180))*2 + 361 
            console.log(randomDegree)
            document.getElementById("wheelToSpin").style.setProperty("--rotation-deg", randomDegree + "deg");
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
                                rewardsServer(wonImage);
                                yourImg[wonImage.src] = wonImage.src
                                confetti();
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
                                rewardsServer(wonImage);
                                yourImg[wonImage.src] = wonImage.src
                                confetti();
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
                            rewardsServer(wonImage);
                            yourImg[wonImage.src] = wonImage.src
                            confetti();
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
                numSpins--
                let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
                numberOfSpins.innerText = spinsText;
                setTimeout(() => {
                    confetti();
                }, 1000)
                openRewards()
            }, 5000)
            
        } 
    })
    
}



function randomImage(){
    const imageIndex = Math.floor(Math.random()*(filePaths.length));
    let thisImage = document.createElement("img");
    thisImage.src = filePaths[imageIndex];
    if (!(thisImage.src in yourImg)){
      return thisImage; 
    }
    else{
        randomImage();
    }
}

function displayCaseFunction(){
    const displayCase = document.createElement("div");
    displayCase.id = "displayCase"
    displayCase.classList.add("displayCase");
    body.appendChild(displayCase);
    const containSpin = document.getElementById("containSpin")
    containSpin.appendChild(displayCase);
    let prevImgs = Object.keys(yourImg);
    prevImgs.forEach((prevImg)=>{
        wonImage = document.createElement("img");
        wonImage.src = prevImg;
        body.appendChild(wonImage);
        wonImage.classList.add("winner");
        wonImage.classList.add("displayWinner");
        displayCase.appendChild(wonImage);
    })
}

function rewardsServer(wonImage){
    let data = new FormData();
    data.append('rewardImage', wonImage.src);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${proudBeachURL}rewards.php`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log("on ready state change called");
            console.log(xhr.response);
            console.log("that was the response");
        }
    };
    xhr.send(data);
}

