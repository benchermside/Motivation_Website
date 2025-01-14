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
    }
    wheelToSpin.id = "wheelToSpin";
    window.onresize = function(){ 
        openRewards();
        console.log("called onresize");
    }


    wheelToSpin.addEventListener("click", function(){
        wheelToSpin.classList.remove("runAnimation");
        void wheelToSpin.offsetWidth;
        wheelToSpin.classList.add("runAnimation");   
            /*citation: 
            Title: answer to StackOverflow question: CSS Animation onClick
            Author: sad comrade
            Date: October 12, 2019
            Code Version: 1.0
            Link: https://stackoverflow.com/a/58353279 */
    
    })  

}



function randomImage(){
    const imageList = ["moodcharacters/anger.png", "moodcharacters/boredom.png", "moodcharacters/confidence.png", "moodcharacters/coolness confidence.png", "moodcharacters/curiosity shyness.png", "moodcharacters/envy jealousy.png", "moodcharacters/excitement.png", "moodcharacters/fear.png", "moodcharacters/frustration.png", "moodcharacters/guilt.png", "moodcharacters/joy.png", "moodcharacters/love inspiration tender.png", "moodcharacters/passion flirt.png", "moodcharacters/pride.png", "moodcharacters/rage.png", "moodcharacters/resentment.png","moodcharacters/rip.png","moodcharacters/sadness.png","moodcharacters/serenity.png", "moodcharacters/woe grief.png"]
    const imageIndex = Math.floor(Math.random()*(imageList.length));
    let thisImage = document.createElement("img");
    thisImage.src = imageList[imageIndex];
    return thisImage
}

// function folderRandomImage(){
//     const fs = require("fs");
//     const images = fs.readdirSync("moodcharacters/");
//     let thisImage = document.createElement("img");
//     const imageIndex = Math.floor(Math.random()*(images.length));
//     thisImage.src = images[imageIndex];
//     console.log(thisImage)
//     return thisImage; 
// }



