function openRewards(){
    /* opens reward page*/
    deleatOpenPage();
    console.log("called");
    opnePage = "rewards";
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
    
    for (i=0; i<numLines; i++){
        thisImage = randomImage();
        thisImage.classList.add("image")
        wheelToSpin.appendChild(thisImage);
        thisImage.style.objectPosition = "10px 10px"; /* FIX THIS!!! */

        
    }
    wheelToSpin.id = "wheelToSpin"
    let element = document.getElementById("wheelToSpin");

    element.addEventListener("click", function(){
        element.classList.remove("runAnimation");
        void element.offsetWidth;
        element.classList.add("runAnimation");   
            /*citation: 
            Title: answer to StackOverflow question: CSS Animation on Click
            Author: sad comrade
            Date: October 12, 2019
            Code Version: 1.0
            Link: https://stackoverflow.com/a/58353279 */
    
    })  

}

function randomImage(){
    const imageList = ["/moodcharacters/anger.png", "/moodcharacters/boredom.png", "/moodcharacters/confidence.png", "/moodcharacters/coolness confidence.png", "/moodcharacters/curiosity shyness.png", "/moodcharacters/envy jealousy.png", "/moodcharacters/excitement.png", "/moodcharacters/fear.png", "/moodcharacters/frustration.png", "/moodcharacters/guilt.png", "/moodcharacters/joy.png", "/moodcharacters/love inspiration tender.png", "/moodcharacters/passion flirt.png", "/moodcharacters/pride.png", "/moodcharacters/rage.png", "/moodcharacters/resentment.png","/moodcharacters/rip.png","/moodcharacters/sadness.png","/moodcharacters/serenity.png", "/moodcharacters/woe grief.png"]
    const imageIndex = Math.floor(Math.random()*(imageList.length));
    let thisImage = document.createElement("img");
    thisImage.src = imageList[imageIndex];
    return thisImage
}




